import { createBrowserRouter } from 'react-router-dom'
import { BaseLayout, ChildrenLayout } from '@/layout'
import { Home, Description, Button } from '@/view'

const routers = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'develop',
				element: <ChildrenLayout />,
				children: [
					{
						path: 'desc',
						element: <Description />,
					},
				],
			},
			{
				path: 'module',
				element: <ChildrenLayout />,
				children: [
					{
						path: 'button',
						element: <Button />,
					},
				],
			},
		],
	},
])

export default routers
