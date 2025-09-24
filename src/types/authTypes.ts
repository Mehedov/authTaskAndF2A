export type IAuth = {
	email: string
	password: string
	authCode: string
}

export type ILoginAuth = Omit<IAuth, 'authCode'>
