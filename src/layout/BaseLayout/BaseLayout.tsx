import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components'

const BaseLayout: React.FC = () => {
	return (
		<div style={{ paddingTop: 60 }}>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default BaseLayout
