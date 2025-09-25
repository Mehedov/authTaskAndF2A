import { useTwoFAMutation } from '@/services/authServices'
import type { ErrorMessageRes, TwoFAResponse } from '@/services/mockApi'
import { useState, type SetStateAction } from 'react'
import Form2FA from '../Form/Form2FA/Form2FA'
import FormLogin from '../Form/FormLogin/FormLogin'

export default function Auth() {
	const [step, setStep] = useState<'login' | '2fa'>('login')
	const twoFAMutation = useTwoFAMutation()

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
			callback(res)
			return res
		} catch (e) {
			Promise.reject(e)
		}
	}

	return (
		<div>
			{step === 'login' ? (
				<FormLogin setStep={setStep} />
			) : (
				<Form2FA check2FA={check2FA} />
			)}
		</div>
	)
}
