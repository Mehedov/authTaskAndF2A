import logo from '@/assets/logo.svg'
import type { ErrorMessageRes, LoginResponse } from '@/services/mockApi'
import { type ILoginAuth } from '@/types/authTypes'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Typography } from 'antd'
import { useState, type SetStateAction } from 'react'
import styles from './FormLogin.module.css'

const { Title } = Typography

interface Props {
	handleLogin: (
		values: ILoginAuth,
		callback: React.Dispatch<
			SetStateAction<LoginResponse | ErrorMessageRes | null>
		>
	) => Promise<LoginResponse | ErrorMessageRes | undefined>
}

export default function FormLogin({ handleLogin }: Props) {
	const [formData, setFormData] = useState<ILoginAuth>({
		email: '',
		password: '',
	})
	const [response, setResponse] = useState<
		LoginResponse | ErrorMessageRes | null
	>(null)

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
				{response && 'success' in response ? 'Успешно' : null}
				<Form.Item shouldUpdate>
					<Button
						style={{
							width: '100%',
						}}
						type='primary'
						htmlType='submit'
						onClick={() => handleLogin(formData, setResponse)}
						size='large'
					>
						Log in
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
}
