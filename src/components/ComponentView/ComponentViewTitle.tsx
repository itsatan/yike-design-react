import c from './ComponentView.module.scss'

interface ComponentViewTitleProps {
	title: string
	desc: string
}

const ComponentViewTitle: React.FC<ComponentViewTitleProps> = (props: ComponentViewTitleProps) => {
	const { title, desc } = props
	return (
		<div className={c['component-view-title-wrapper']}>
			<h1>{title}</h1>
			{desc && <p>{desc}</p>}
		</div>
	)
}

export default ComponentViewTitle
