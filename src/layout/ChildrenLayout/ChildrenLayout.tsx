import { Sidebar } from '@/components'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './ChildrenLayout.module.scss'
import { useEffect, useState } from 'react'
import { MenuItemWithLink } from '@/components/Sidebar/Sidebar'
import { DEVELOP_NAVIGATOR_MENU_ITEM, MODULE_NAVIGATOR_MENU_ITEM } from '@/constant'

const ChildrenLayout: React.FC = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)
	const menu = pathname.startsWith('/module')
		? MODULE_NAVIGATOR_MENU_ITEM
		: DEVELOP_NAVIGATOR_MENU_ITEM
	useEffect(() => {
		// 设置默认选中的菜单项并导航到对应的路由
		const currentMenuItem = menu.find(item => 'href' in item) as MenuItemWithLink | undefined
		if (currentMenuItem && currentMenuItem.href !== pathname) {
			setActiveMenuItem(currentMenuItem.href)
			navigate(currentMenuItem.href)
		}
	}, [menu, pathname, navigate])
	return (
		<div className={styles['children-layout-wrapper']}>
			<Sidebar menu={menu} activeMenuItem={activeMenuItem} />
			<Outlet />
		</div>
	)
}

export default ChildrenLayout
