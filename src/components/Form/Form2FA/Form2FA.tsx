import logo from '@/assets/logo.svg'
import type { ErrorMessageRes, TwoFAResponse } from '@/services/mockApi'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Typography } from 'antd'
import type { OTPRef } from 'antd/es/input/OTP'
import { useEffect, useRef, useState, type SetStateAction } from 'react'
import styles from './Form2FA.module.css'

const { Title, Text } = Typography

interface Props {
	check2FA: (
		code: string,
		callback: React.Dispatch<
			SetStateAction<TwoFAResponse | ErrorMessageRes | null>
		>
	) => Promise<TwoFAResponse | ErrorMessageRes | undefined>
	setStep: React.Dispatch<React.SetStateAction<'2fa' | 'login'>>
}

export default function Form2FA({ check2FA, setStep }: Props) {
	const [code, setCode] = useState('')
	const [response, setResponse] = useState<
		TwoFAResponse | ErrorMessageRes | null
	>(null)
	const [cooldownSec, setCooldownSec] = useState<number>(0)
	const otpRef = useRef<OTPRef>(null)

	const handleTwoFAM = (code: string) => {
		check2FA(code, setResponse)
	}
	const handleGetNow = () => {
		setCooldownSec(25)
	}
	useEffect(() => {
		if (cooldownSec <= 0) return
		const id = setInterval(() => {
			setCooldownSec(prev => (prev > 0 ? prev - 1 : 0))
		}, 1000)
		return () => clearInterval(id)
	}, [cooldownSec])

	return (
		<Card
			style={{
				width: '440px',
			}}
		>
			<Form name='f2a'>
				<ArrowLeftOutlined onClick={() => setStep('login')} />
				<div className={styles.logo}>
					<img src={logo} alt='Logo Company' />
				</div>
				<div
					style={{
						textAlign: 'center',
					}}
				>
					<Title level={3}>Two-Factor Authentication</Title>
					<Text>Enter the 6-digit code from the Google Authenticator app</Text>
				</div>
				<Form.Item
					name='code'
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '24px',
					}}
				>
					<Input.OTP
						formatter={str => str.toUpperCase()}
						size='large'
						ref={otpRef}
						value={code}
						// Если вы читаете это сообщение то я понимаю логику эту сохранение value только после полного ввода но когда код стирается в value ничего не приходит а просто сохраняется предыдущее значение
						onChange={e => {
							const newCode = e || ''
							setCode(newCode)
						}}
						status={response && 'status' in response ? 'error' : ''}
					/>
				</Form.Item>
				{response && 'message' in response ? response.message : null}
				{response && 'success' in response ? 'Успешно' : null}
				<Form.Item>
					{code.length === 6 ? (
						<Button
							style={{
								width: '100%',
							}}
							type='primary'
							htmlType='submit'
							size='large'
							onClick={() => handleTwoFAM(code)}
							disabled={response && 'message' in response ? true : false}
						>
							Continue
						</Button>
					) : (
						<Button
							style={{
								width: '100%',
							}}
							type={cooldownSec > 0 ? 'text' : 'primary'}
							htmlType='button'
							size='large'
							onClick={handleGetNow}
							disabled={cooldownSec > 0}
						>
							{cooldownSec > 0 ? `Get a new code in  ${cooldownSec}s` : 'Get now'}
						</Button>
					)}
				</Form.Item>
			</Form>
		</Card>
	)
}
