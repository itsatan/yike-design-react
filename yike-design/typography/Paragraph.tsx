import * as React from 'react'
import classNames from 'classnames'
import { useGenChildren } from './hooks'
import { TypographyParagraphProps } from './interface'

const Paragraph: React.FC<TypographyParagraphProps> = props => {
	const {
		type = '',
		code = false,
		underline = false,
		delete: del = false,
		strong = false,
		italic = false,
		mark = false,
		disabled = false,
		copyable = false,
		ellipsis = false,
		blockquote = false,
		spacing = 'default',
		className,
		...rest
	} = props

	const children = useGenChildren({ ...props, underline, delete: del, strong, italic, mark })

	const classes = classNames(
		'yike-typography',
		{
			[`yike-typography-${type}`]: type,
			'yike-typography-spacing-close': spacing === 'close',
			'yike-typography-blockquote': blockquote,
			code,
			disabled,
			copyable,
			ellipsis,
		},
		className
	)

	const P = `${blockquote ? 'blockquote' : 'p'}` as keyof JSX.IntrinsicElements

	return (
		<P className={classes} {...rest}>
			{children}
		</P>
	)
}

export default Paragraph
