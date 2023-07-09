export type TYPOGRAPHY_TYPE = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

export const TITLE_ELE_LEVEL = [1, 2, 3, 4, 5, 6] as const

export interface TitleProps {
	/** 文本类型 */
	type?: TYPOGRAPHY_TYPE
	/** 标题级别 */
	level?: (typeof TITLE_ELE_LEVEL)[number]
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
