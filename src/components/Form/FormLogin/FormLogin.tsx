import logo from '@/assets/logo.svg'
import { useLoginMutation } from '@/services/authServices'
import type { ErrorMessageRes, LoginResponse } from '@/services/mockApi'
import { type ILoginAuth } from '@/types/authTypes'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Typography } from 'antd'
import { useState } from 'react'
import styles from './FormLogin.module.css'

const { Title } = Typography

interface Props {
	setStep: React.Dispatch<React.SetStateAction<'2fa' | 'login'>>
}

export default function FormLogin({ setStep }: Props) {
	const [formData, setFormData] = useState<ILoginAuth>({
		email: '',
		password: '',
	})
	const [response, setResponse] = useState<
		LoginResponse | ErrorMessageRes | null
	>(null)

	const loginMutation = useLoginMutation()

	const handleLogin = async (values: ILoginAuth) => {
		try {
			const res = await loginMutation.mutateAsync(values)
			setResponse(res)
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
		<Card
			style={{
				width: '440px',
			}}
		>
			<Form name='login'>
				<div className={styles.logo}>
					<img src={logo} alt='Logo Company' />
				</div>
				<div
					style={{
						textAlign: 'center',
					}}
				>
					<Title level={2}>Sign in to your account to continue</Title>
				</div>
				<Form.Item
					name='Email'
					rules={[{ required: true, message: 'Введите свой Email' }]}
				>
					<Input
						prefix={<UserOutlined />}
						value={formData.email}
						onChange={e =>
							setFormData(prev => ({ ...prev, email: e.target.value }))
						}
						width={376}
						placeholder='Username'
						status={response && 'status' in response ? 'error' : ''}
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Введите свой пароль' }]}
				>
					<Input
						prefix={<LockOutlined />}
						type='password'
						placeholder='Password'
						width={376}
						value={formData.password}
						onChange={e =>
							setFormData(prev => ({ ...prev, password: e.target.value }))
						}
						status={response && 'status' in response ? 'error' : ''}
					/>
				</Form.Item>
				{response && 'message' in response ? response.message : null}
				<Form.Item shouldUpdate>
					<Button
						style={{
							width: '100%',
						}}
						type='primary'
						htmlType='submit'
						onClick={() => handleLogin(formData)}
						size='large'
					>
						Log in 
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
}
