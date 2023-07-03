import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components'

const BaseLayout: React.FC = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default BaseLayout
