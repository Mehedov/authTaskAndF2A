import { Route, Routes } from 'react-router'
import Auth from '../components/Auth/Auth'
import Layout from '../layout/Layout'

export default function AppRouter() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Auth />} />
			</Route>
		</Routes>
	)
}
