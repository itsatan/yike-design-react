import * as React from 'react'
import { TypographyTextProps } from './interface'
import { useGenChildren } from './hooks'
import classNames from 'classnames'

const Text: React.FC<TypographyTextProps> = props => {
	const { type, code, disabled, copyable, ellipsis, className } = props

	const children = useGenChildren(props)

	const classes = classNames(
		'yike-typography',
		{
			[`yike-typography-${type}`]: type,
			code,
			disabled,
			copyable,
			ellipsis,
		},
		className
	)

	return (
		<span className={classes} {...props}>
			{children}
		</span>
	)
}

export default Text
