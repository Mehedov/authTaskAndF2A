import { store } from '@/app/store'
import { type PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

export default function ReduxProvider({
	children,
}: PropsWithChildren<unknown>) {
	return <Provider store={store}>{children}</Provider>
}
