import styles from './Content.module.scss'

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
}

const Content: React.FC<ContentProps> = (props: ContentProps) => {
	const { children, ...rest } = props
	return (
		<div className={styles['content-wrapper']} {...rest}>
			{children}
		</div>
	)
}

export default Content
