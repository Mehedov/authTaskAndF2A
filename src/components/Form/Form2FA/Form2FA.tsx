import logo from '@/assets/logo.svg'
import type { ErrorMessageRes, TwoFAResponse } from '@/services/mockApi'
import { Button, Card, Form, Input, Typography } from 'antd'
import type { OTPRef } from 'antd/es/input/OTP'
import { useRef, useState, type SetStateAction } from 'react'
import styles from './Form2FA.module.css'

const { Title, Text } = Typography

interface Props {
	check2FA: (
		code: string,
		callback: React.Dispatch<
			SetStateAction<TwoFAResponse | ErrorMessageRes | null>
		>
	) => Promise<TwoFAResponse | ErrorMessageRes | undefined>
}

export default function Form2FA({ check2FA }: Props) {
	const [code, setCode] = useState('')
	const [response, setResponse] = useState<
		TwoFAResponse | ErrorMessageRes | null
	>(null)
	const otpRef = useRef<OTPRef>(null)

	const handleTwoFAM = (code: string) => {
		check2FA(code, setResponse)
	}
	console.log(code.length)

	return (
		<Card
			style={{
				width: '440px',
			}}
		>
			<Form name='f2a'>
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
						onChange={e => {
							const newCode = e || ''
							setCode(newCode)
							if (!newCode) {
								otpRef.current?.focus() // Перефокусировка для сброса
							}
						}}
						status={response && 'status' in response ? 'error' : ''}
					/>
				</Form.Item>
				{response && 'message' in response ? response.message : null}

				<Form.Item shouldUpdate>
					{code.length === 6 ? (
						<Button
							style={{
								width: '100%',
							}}
							type='primary'
							htmlType='submit'
							size='large'
							onClick={() => handleTwoFAM(code)}
						>
							Continue
						</Button>
					) : (
						<Button
							style={{
								width: '100%',
							}}
							type='primary'
							htmlType='submit'
							size='large'
							onClick={() => handleTwoFAM(code)}
						>
							Get now
						</Button>
					)}
					{/* <Button
						style={{
							width: '100%',
						}}
						type='primary'
						htmlType='submit'
						size='large'
						onClick={() => handleTwoFAM(code)}
					>
						{code.length === 6 ? 'Continue' : 'Get now'}
					</Button> */}
				</Form.Item>
			</Form>
		</Card>
	)
}
