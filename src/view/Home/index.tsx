import styles from './Home.module.scss'

const Home: React.FC = () => {
	return (
		<div className={styles['home-wrapper']}>
			<div className={styles.container}>
				<h1>YIKE DESIGN</h1>
				<p>包容万物，从源头出发，一切从简</p>
			</div>
		</div>
	)
}

export default Home
