import { Content, ComponentViewTitle, ComponentViewCard } from '@/components'
import { Typography } from '../../../../yike-design'
import React from 'react'
const { Title, Text } = Typography

const TextMap = (props: { children: React.ReactNode }) => {
	return React.Children.map(props.children, child => {
		return <div style={{ marginBottom: 10 }}>{child}</div>
	})
}

const TypographyModule: React.FC = () => {
	return (
		<Content>
			<ComponentViewTitle title="Typography 排版" desc="用于展示标题、段落、文本内容。" />
			<ComponentViewCard title="标题" desc="展示不同级别的标题。">
				<Title level={1}>H1. Yike Design React</Title>
				<Title level={2}>H2. Yike Design React</Title>
				<Title level={3}>H3. Yike Design React</Title>
				<Title level={4}>H4. Yike Design React</Title>
				<Title level={5}>H5. Yike Design React</Title>
				<Title level={6}>H6. Yike Design React</Title>
			</ComponentViewCard>
			<ComponentViewCard
				title="文本类型"
				desc='所有文本内容都具有该属性，这里以标题为例。不同类型分别有：default、primary、secondary、success、warning 和 danger六种类型，默认为 "default"。'
			>
				<Title level={5} type="default">
					Yike Design React - default
				</Title>
				<Title level={5} type="primary">
					Yike Design React - primary
				</Title>
				<Title level={5} type="secondary">
					Yike Design React - secondary
				</Title>
				<Title level={5} type="success">
					Yike Design React - success
				</Title>
				<Title level={5} type="warning">
					Yike Design React - warning
				</Title>
				<Title level={5} type="danger">
					Yike Design React - danger
				</Title>
			</ComponentViewCard>
			<ComponentViewCard title="文本" desc="不同样式的文本以及超链接组件。">
				<TextMap>
					<Text>Default</Text>
					<Text type="primary">Primary</Text>
					<Text type="secondary">Secondary</Text>
					<Text type="success">Success</Text>
					<Text type="warning">Warning</Text>
					<Text type="danger">Danger</Text>
					<Text strong>Strong</Text>
					<Text disabled>Disabled</Text>
					<Text mark>Mark</Text>
					<Text underline>Underline</Text>
					<Text delete>Delete</Text>
					<Text code>Hello World</Text>
				</TextMap>
			</ComponentViewCard>
		</Content>
	)
}

export default TypographyModule
