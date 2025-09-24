import logo from '@/assets/logo.svg'
import { useLoginMutation } from '@/services/authServices'
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

	const loginMutation = useLoginMutation()


	const handleLogin = async (values: ILoginAuth) => {
		try {
			const res = await loginMutation.mutateAsync(values)
			if (res.requires2FA) {
				setStep('2fa')
			}
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
					<Title level={2}>Sign in to your account to continue</Title>
				</div>
				<Form.Item
					name='Email'
					rules={[
						{ required: true, message: 'Пожалуйста введите свой Email!' },
					]}
				>
					<Input
						prefix={<UserOutlined />}
						value={formData.email}
						onChange={e =>
							setFormData(prev => ({ ...prev, email: e.target.value }))
						}
						width={376}
						placeholder='Username'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Please input your password!' }]}
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
							onClick={() => handleLogin(formData)}
							size='large'

							// disabled={
							// 	!clientReady ||
							// 	!form.isFieldsTouched(true) ||
							// 	!!form.getFieldsError().filter(({ errors }) => errors.length)
							// 		.length
							// }
						>
							Log in
						</Button>
					)}
				</Form.Item>
			</Form>
		</Card>
	)
}
