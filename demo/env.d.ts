/// <reference types="vite/client" />

declare module '*.md' {
  import type { ComponentType } from 'react';
  export default ComponentType;
}

declare module '*.markdown' {
  import type { ComponentType } from 'react';
  export default ComponentType;
}
