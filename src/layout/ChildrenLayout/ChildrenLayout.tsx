import { Sidebar } from '@/components'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './ChildrenLayout.module.scss'
import { useEffect, useState } from 'react'
import { MenuItemWithLink } from '@/components/Sidebar/Sidebar'

const menu1 = [
	{
		key: 'handbook',
		title: '开发指南',
	},
	{
		text: 'Yike Design',
		href: '/develop/desc',
	},
	{
		text: '快速上手',
		href: '/ferf',
	},
	{
		text: '暗黑模式',
		href: '/dark',
	},
]

const menu2 = [
	{
		key: 'general',
		title: '通用',
	},
	{
		text: 'Button 按钮',
		href: '/module/button',
	},
	{
		text: 'Icon 图表',
		href: '/module/icon',
	},
	{
		text: 'Typography 排版',
		href: '/module/typography',
	},
]

const ChildrenLayout: React.FC = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)
	const menu = pathname.startsWith('/module') ? menu2 : menu1
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
