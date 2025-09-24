import { useState } from 'react'
import Form2FA from '../Form/Form2FA'
import FormLogin from '../Form/FormLogin/FormLogin'

export default function Auth() {
	const [step] = useState<'login' | '2fa'>('login')

	if (step === '2fa') {
		return <Form2FA />
	}
	return step === 'login' ? <FormLogin /> : <Form2FA />
}
