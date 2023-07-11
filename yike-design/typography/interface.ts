export type TYPOGRAPHY_TYPE = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

export interface TypographyCommonProps {
	/** 文本类型 */
	type?: TYPOGRAPHY_TYPE
	/** 代码块 */
	code?: boolean
	/** 下划线 */
	underline?: boolean
	/** 删除线 */
	delete?: boolean
	/** 是否粗体 */
	strong?: boolean
	/** 是否禁用 */
	disabled?: boolean
	/** 是否斜体 */
	italic?: boolean
	/** 是否标记 */
	mark?: boolean
	/** 是否可拷贝 */
	copyable?: boolean
	/** 是否溢出省略 */
	ellipsis?: boolean
	/** 节点样式 */
	style?: React.CSSProperties
	/** className */
	className?: string
	/** Children */
	children?: React.ReactNode
}

/**
 * @title Typography.Title
 */
export const TYPOGRAPHY_TITLE_LEVEL = [1, 2, 3, 4, 5, 6] as const
export interface TypographyTitleProps extends TypographyCommonProps {
	/** 标题级别 */
	level?: (typeof TYPOGRAPHY_TITLE_LEVEL)[number]
}

/**
 * @title Typography.Text
 */
export type TypographyTextProps = TypographyCommonProps

/**
 * @title Typography.Paragraph
 */
export type TYPOGRAPHY_PARAGRAPH_SPACING = 'default' | 'close'
export interface TypographyParagraphProps extends TypographyCommonProps {
	/** 长引用 */
	blockquote?: boolean
	/** 行高 */
	spacing?: TYPOGRAPHY_PARAGRAPH_SPACING
}

/**
 * @title Typography
 */
export interface TypographyProps {
	/** 节点样式 */
	style?: React.CSSProperties
	/** className */
	className?: string
	/** Children */
	children?: React.ReactNode
}
