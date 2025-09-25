import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { type I2FAAuth, type ILoginAuth } from '../types/authTypes'
import { mock2FAApi, mockLoginApi } from './mockApi'

export const useLoginMutation = () =>
	useMutation({
		mutationFn: ({ email, password }: ILoginAuth) =>
			mockLoginApi(email, password),
		onError: error => {
			message.error(error.message || 'Неизвестная ошибка')
		},
	})

export const useTwoFAMutation = () =>
	useMutation({
		mutationFn: ({ authCode }: I2FAAuth) => mock2FAApi(authCode),
		onError: error => {
			message.error(error.message || 'Unknown error')
		},
	})
