import logo from '@/assets/logo.svg'
import { useTwoFAMutation } from '@/services/authServices'
import type { TwoFAResponse } from '@/services/mockApi'
import { Button, Card, Form, Input, Typography } from 'antd'
import { useEffect, useState } from 'react'
import styles from './Form2FA.module.css'

const { Title, Text } = Typography

export default function Form2FA() {
	const [code, setCode] = useState('')
	const [response, setResponse] = useState<TwoFAResponse | null>(null)
	const twoFAMutation = useTwoFAMutation()

	const handleTwoFAM = async (code: string) => {
		try {
			const res = await twoFAMutation.mutateAsync({
				authCode: code,
			})
			setResponse(res)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (code.length === 6) {
			handleTwoFAM(code)
			setCode('')
		}
	}, [code, handleTwoFAM])

	return (
		<Card
			style={{
				width: '440px',
			}}
		>
			<Form
				// form={form}
				name='login'
				// onFinish={onFinish}
			>
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
					}}
				>
					<Input.OTP
						style={{
							marginTop: '24px',
						}}
						formatter={str => str.toUpperCase()}
						size='large'
						value={code}
						onChange={e => setCode(e)}
						status={response?.success === false ? 'error' : ''}
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
							// onClick={() => handleLogin(formData)}
							// disabled={
							// 	!clientReady ||
							// 	!form.isFieldsTouched(true) ||
							// 	!!form.getFieldsError().filter(({ errors }) => errors.length)
							// 		.length
							// }
						>
							Get now
						</Button>
					)}
				</Form.Item>
			</Form>
		</Card>
	)
}
