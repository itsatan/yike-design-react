/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/// <reference lib="esnext" />

import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import hljs from 'highlight.js';
import * as vite from 'vite';
import ts from 'typescript';

const ident = <T>(_: T) => _;

// SiteCopmonents iife
const SiteComponents = (() => {
  let r = [];

  // Sync code, just read exported names in components/index.ts
  ts.transpileModule(fs.readFileSync(path.resolve(__dirname, '../src/components/index.ts')).toString(), {
    compilerOptions: { noEmit: true },
    transformers: {
      before: [
        () => ({
          // @ts-ignore
          transformSourceFile: (file) => ((r = [...file.classifiableNames]), file),
          transformBundle: ident,
        }),
      ],
    },
  });

  return r;
})();

const fixSourceMapping = (data: ts.TranspileOutput, parsedPath: path.ParsedPath): ts.TranspileOutput => {
  const outputText = data.outputText.replaceAll(/(\/\/# sourceMappingURL=)(.*)/g, `$1${parsedPath.name}.js.map`);
  const sourceMapJson = data.sourceMapText && JSON.parse(data.sourceMapText);

  if (sourceMapJson) {
    sourceMapJson.file = `${parsedPath.name}.js`;
    sourceMapJson.sources = [`${parsedPath.base}`];
  }

  return Object.assign({}, data, {
    outputText,
    sourceMapText: sourceMapJson && JSON.stringify(sourceMapJson),
  });
};

const tsConfig = ts.readConfigFile(path.resolve(__dirname, '../tsconfig.json'), (p) => fs.readFileSync(p).toString());
const compilerOptions = {
  ...(tsConfig.config?.compilerOptions ?? {}),
  jsx: ts.JsxEmit.ReactJSX,
  module: ts.ModuleKind.ESNext,
  noEmit: true,
};

const MarkdownPlugin = (): vite.PluginOption => ({
  name: 'vitePluginMarkdown',
  transform: (src, id) => {
    if (/\.(md|markdown)$/i.test(id)) {
      const filePath = vite.normalizePath(id);
      const fileContent = fs.readFileSync(filePath).toString();
      const parsedPath = path.parse(filePath);
      const componentName = parsedPath.name;

      const md = MarkdownIt({
        html: true,
        xhtmlOut: false,
        highlight: (str, lang) => {
          try {
            return hljs.highlight(str, {
              language: lang,
              ignoreIllegals: true,
            }).value;
          } catch {}

          return '';
        },
      });

      // Predefined imports
      const imports: Set<string> = new Set([
        `import React from 'react';`,
        `import classNames from 'classnames';`,
        `import Yk from '@yike-design/react/src';`,
        `import { ${SiteComponents.join(', ')} } from '@/components';`,
      ]);

      let precode = '';
      const components: string[] = [];

      const tokens = md.parse(fileContent, null);

      const document = tokens
        .reduce<(Token & { __component?: boolean })[]>((tokens, token) => {
          if (token.type === 'inline' && /^<[A-Za-z][A-Za-z0-9\\-]*/.test(token.content)) {
            tokens.splice(
              -1,
              1,
              Object.assign(new Token('html_block', '', 0), {
                block: true,
                content: token.content,
                __component: true,
              })
            );

            return tokens;
          }

          const lastToken = tokens.at(-1);

          if (lastToken?.__component) {
            switch (token.type) {
              case 'paragraph_close':
              case 'blockquote_open':
                return tokens;

              case 'blockquote_close':
                lastToken.content = `${lastToken.content}>`;
                return tokens;
            }

            Reflect.deleteProperty(lastToken, '__component');
          }

          return tokens.concat(token);
        }, [])
        .flatMap((token) => {
          if (token.type === 'fence' && token.tag === 'code') {
            const tokenInfo = token.info.toLowerCase();

            // Typescript React
            // ```tsx
            if (tokenInfo.startsWith('tsx')) {
              // ```tsx [pre]
              if (tokenInfo.includes('[pre]')) {
                let importLocs: [number, number][] = [];

                ts.transpileModule(token.content, {
                  compilerOptions,
                  transformers: {
                    before: [
                      () => ({
                        transformSourceFile: (file) => {
                          importLocs = file.statements
                            .filter(ts.isImportDeclaration)
                            .map((stmt) => [stmt.getStart(), stmt.getEnd()]);

                          return file;
                        },
                        transformBundle: ident,
                      }),
                    ],
                  },
                });

                precode = importLocs
                  .reverse()
                  .reduce((p, [s, e]) => `${p.slice(0, s)}${p.slice(e)}`, token.content)
                  .trim();

                return;
              }

              let result = [
                Object.assign(new Token('html_block', '', 0), {
                  content: `<div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(
                    md.renderer.render([token], md.options, {})
                  )}}} />\n`,
                }),
              ];

              // ```tsx [demo]
              if (tokenInfo.includes('[demo]')) {
                let content = token.content;

                // ```tsx [demo][name=Name]
                const componentNameMatch = token.info.match(/\[(?:name) *(?:= *(?<name>.+))?\]/i);

                if (componentNameMatch) {
                  const C = componentNameMatch.groups!.name;
                  components.push(token.content);
                  content = `<${C} />`;
                }

                content = `<Codebox example={<>${content.trim()}</>}>${result[0].content}</Codebox>`;

                token.info = 'tsx';

                result = [
                  Object.assign(new Token('html_block', '', 0), {
                    content,
                  }),
                ];
              }

              return result;
            }

            // Refrence other docs
            // ```docref ./OtherDoc.md
            // ```
            if (tokenInfo.startsWith('docref ')) {
              const refPath = token.info.slice(7).trim();

              if (!refPath) {
                throw new SyntaxError(`Language 'docref' must followed by a file path`);
              }

              if (refPath) {
                const parsedRefPath = path.parse(refPath);
                imports.add(`import ${parsedRefPath.name} from '${refPath}'`);

                return Object.assign(new Token('html_block', '', 0), {
                  content: `<${parsedRefPath.name} />`,
                });
              }

              return;
            }
          }

          return token;
        })
        .map((token) => (token ? md.renderer.render([token], md.options, {}) : ''))
        .join('');

      const result = fixSourceMapping(
        ts.transpileModule(
          [
            precode,
            ...components,
            `const ${componentName} = () => (<>${document}</>)`,
            `export default ${componentName}`,
          ].join('\n'),
          {
            compilerOptions,
          }
        ),
        parsedPath
      );

      return {
        code: `
          ${[...imports].join('\n')}
          ${result.outputText}
        `,
        map: result.sourceMapText,
      };
    }

    return src;
  },
});

export default MarkdownPlugin;
