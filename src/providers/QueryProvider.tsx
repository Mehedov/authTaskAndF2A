import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren } from 'react'

const queryClient = new QueryClient()

export default function QueryProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
