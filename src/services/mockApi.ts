export type LoginResponse = { success: boolean; requires2FA?: boolean }
export type TwoFAResponse = { success: boolean }
export type ErrorMessageRes = {
	status: number
	message: string
}

export const mockLoginApi = async (
	email: string,
	password: string
): Promise<LoginResponse> => {
	if (!email.includes('@')) {
		throw { status: 400, message: 'Некорректная почта' }
	}
	if (password.length < 6) {
		throw { status: 400, message: 'Минимальная длина пароля 6 символов' }
	}
	if (email === 'blocked@company.com') {
		throw { status: 403, message: 'Аккаунт заблокирован' }
	}
	if (email === 'server@company.com') {
		throw { status: 500, message: 'Ошибка сервера' }
	}
	if (email !== 'user@company.com' || password !== 'password123') {
		throw { status: 401, message: 'Неверный логин или пароль' }
	}

	return { success: true, requires2FA: true }
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

	return { success: true }
}
