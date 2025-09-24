import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './index.css'
import QueryProvider from './providers/QueryProvider'
import ReduxProvider from './providers/ReduxProvider'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ReduxProvider>
				<QueryProvider>
					<App />
				</QueryProvider>
			</ReduxProvider>
		</BrowserRouter>
	</StrictMode>
)
