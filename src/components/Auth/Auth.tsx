import { setToken } from '@/features/auth/authSlice'
import { useLoginMutation, useTwoFAMutation } from '@/services/authServices'
import type {
	ErrorMessageRes,
	LoginResponse,
	TwoFAResponse,
} from '@/services/mockApi'
import type { ILoginAuth } from '@/types/authTypes'
import { useState, type SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import Form2FA from '../Form/Form2FA/Form2FA'
import FormLogin from '../Form/FormLogin/FormLogin'

export default function Auth() {
	const [step, setStep] = useState<'login' | '2fa'>('login')
	const twoFAMutation = useTwoFAMutation()
	const loginMutation = useLoginMutation()
	const dispatch = useDispatch()
	// const navigate = useNavigate()

	const check2FA = async (
		code: string,
		callback: React.Dispatch<
			SetStateAction<TwoFAResponse | ErrorMessageRes | null>
		>
	) => {
		try {
			const res = await twoFAMutation.mutateAsync({
				authCode: code,
			})
			if (res && 'success' in res && res.success) {
				const mockToken = 'mock-jwt-token-123'
				dispatch(setToken(mockToken))
				// navigate('/куда то');
			}
			callback(res)
			return res
		} catch (e) {
			Promise.reject(e)
		}
	}

	const handleLogin = async (
		values: ILoginAuth,
		callback: React.Dispatch<
			SetStateAction<LoginResponse | ErrorMessageRes | null>
		>
	) => {
		try {
			const res = await loginMutation.mutateAsync(values)
			callback(res)
			if (res && 'success' in res && res.success) {
				const mockToken = 'mock-jwt-token-123'
				dispatch(setToken(mockToken))
			}
			if ('status' in res) {
				return Promise.reject(res)
			}
			if (res.requires2FA) {
				setStep('2fa')
			}
			return res
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div>
			{step === 'login' ? (
				<FormLogin handleLogin={handleLogin} />
			) : (
				<Form2FA check2FA={check2FA} setStep={setStep} />
			)}
		</div>
	)
}
