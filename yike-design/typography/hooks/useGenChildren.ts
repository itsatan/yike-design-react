import * as React from 'react'
import { TypographyTitleProps } from '../interface'

const useGenChildren = <T extends TypographyTitleProps>(props: T) => {
	function genChildren(
		{ strong, underline, delete: del, code, mark, italic }: T,
		children: React.ReactNode
	) {
		let currentChildren = children

		function genTag(tag: string, needed?: boolean) {
			if (!needed) {
				return
			}
			currentChildren = React.createElement(tag, {}, currentChildren)
		}

		genTag('strong', strong)
		genTag('u', underline)
		genTag('del', del)
		genTag('code', code)
		genTag('mark', mark)
		genTag('i', italic)

		return currentChildren
	}

	return genChildren(props, props.children)
}

export default useGenChildren
