import logo from '@/assets/logo.svg'
import { useTwoFAMutation } from '@/services/authServices'
import type { ErrorMessageRes, TwoFAResponse } from '@/services/mockApi'
import { Button, Card, Form, Input, Typography } from 'antd'
import type { OTPRef } from 'antd/es/input/OTP'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Form2FA.module.css'

const { Title, Text } = Typography

export default function Form2FA() {
	const [code, setCode] = useState('33')
	const [response, setResponse] = useState<
		TwoFAResponse | ErrorMessageRes | null
	>(null)
	const twoFAMutation = useTwoFAMutation()
	const otpRef = useRef<OTPRef>(null)

	const handleTwoFAM = useCallback(
		async (code: string) => {
			try {
				const res = await twoFAMutation.mutateAsync({
					authCode: code,
				})
				setResponse(res)
				if ('status' in res) {
					return Promise.reject(res)
				}
				return res
			} catch (e) {
				console.log(e)
			}
		},
		[twoFAMutation]
	)

	useEffect(() => {
		if (code.length === 6) {
			handleTwoFAM(code)
			setCode('')
			// console.log(response)
			if (otpRef.current) {
				otpRef.current.blur()
			}
		}
	}, [code, handleTwoFAM])

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
						onChange={e => setCode(e)}
						status={response && 'status' in response ? 'error' : ''}
					/>
				</Form.Item>
				<Form.Item shouldUpdate>
					{() => (
						<Button
							style={{
								width: '100%',
							}}
							type='primary'
							htmlType='submit'
							size='large'
						>
							Get now
						</Button>
					)}
				</Form.Item>
			</Form>
		</Card>
	)
}
