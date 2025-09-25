export type IAuth = {
	email: string
	password: string
	authCode: string
}


export type ILoginAuth = Omit<IAuth, 'authCode'>
export type I2FAAuth = Omit<IAuth, 'email' | 'password'>
