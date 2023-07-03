import styles from './Navbar.module.scss'
import logo from '@/assets/logo.svg'

const Navbar: React.FC = () => {
	return (
		<header className={styles['navbar-wrapper']}>
			<div className={styles.navbar}>
				<div className={styles.logo}>
					<img src={logo} alt="logo" />
					<a href="/">
						<h1>Yike Design React</h1>
					</a>
				</div>
				<ul className={styles.nav}>
					<li>
						<a href="/module">组件</a>
					</li>
					<li>
						<a href="http://www.huohuo90.com" target="_blank" rel="noreferrer">
							主站
						</a>
					</li>
					<li>
						<a href="https://github.com/itsatan/yike-design-react" target="_blank" rel="noreferrer">
							Github
						</a>
					</li>
				</ul>
			</div>
		</header>
	)
}

export default Navbar
