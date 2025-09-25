export type LoginResponse = { success: boolean; requires2FA?: boolean; token: string }
export type TwoFAResponse = { success: boolean; token: string }
export type ErrorMessageRes = {
	status: number
	message: string
}

export const mockLoginApi = async (
	email: string,
	password: string
): Promise<LoginResponse | ErrorMessageRes> => {
	if (!email.includes('@')) {
		return { status: 400, message: 'Некорректная почта' }
	}
	if (password.length < 6) {
		return { status: 400, message: 'Минимальная длина пароля 6 символов' }
	}
	if (email === 'blocked@company.com') {
		return { status: 403, message: 'Аккаунт заблокирован' }
	}
	if (email === 'server@company.com') {
		return { status: 500, message: 'Ошибка сервера' }
	}
	if (email !== 'user@user.com' || password !== 'password123') {
		return { status: 401, message: 'Неверный логин или пароль' }
	}

	return { success: true, requires2FA: true, token: 'token' }
}

export const mock2FAApi = async (
	authCode: string
): Promise<TwoFAResponse | ErrorMessageRes> => {
	if (authCode.length !== 6) {
		return { status: 400, message: 'Код должен быть 6 цифр' }
	}
	if (authCode !== '000000') {
		return { status: 401, message: 'Неправильный код' }
	}

	return { success: true, token: 'token' }
}
