import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import classes from 'classnames'

export interface MenuItemWithTitle {
	key: string
	title: string
}

export interface MenuItemWithLink {
	text: string
	href: string
}

export type MenuItem = MenuItemWithTitle | MenuItemWithLink

interface SidebarProps {
	menu: Array<MenuItem>
	activeMenuItem: string | null
}

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
	const { menu, activeMenuItem } = props
	const { pathname } = useLocation()
	return (
		<div className={styles['sidebar-wrapper']}>
			<div className={styles['sidebar-content']}>
				<div className={styles.menu}>
					{menu.map(item => {
						const menuItemClassName = classes({
							[styles['menu-item']]: true,
							[styles['activated']]:
								!!(item as MenuItemWithLink).href &&
								(item as MenuItemWithLink).href === (activeMenuItem || pathname),
						})
						if ('title' in item) {
							const { key, title } = item
							return (
								<div key={key} className={styles['menu-title']}>
									<span>{title}</span>
								</div>
							)
						} else {
							const { text, href } = item
							return (
								<Link key={href} to={href} className={menuItemClassName}>
									{text}
								</Link>
							)
						}
					})}
				</div>
			</div>
		</div>
	)
}
export default Sidebar
