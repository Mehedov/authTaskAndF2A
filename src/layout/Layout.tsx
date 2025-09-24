import { Outlet } from 'react-router'
import styles from './Layout.module.scss'

export default function Layout() {
	return (
		<main className={styles.layout}>
			<Outlet />
		</main>
	)
}
