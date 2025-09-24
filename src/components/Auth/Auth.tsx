import { useState } from 'react'
import Form2FA from '../Form/Form2FA/Form2FA'
import FormLogin from '../Form/FormLogin/FormLogin'

export default function Auth() {
	const [step, setStep] = useState<'login' | '2fa'>('2fa')

	return (
		<div>
			{step === 'login' ? <FormLogin setStep={setStep} /> : <Form2FA />}
		</div>
	)
}
