import { createBrowserRouter } from 'react-router-dom'
import { BaseLayout, ChildrenLayout } from '@/layout'
import { Home } from '@/view'

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
				path: 'module',
				element: <ChildrenLayout />,
				children: [{}],
			},
		],
	},
])

export default routers
