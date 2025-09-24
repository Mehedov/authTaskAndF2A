import logo from '@/assets/logo.svg'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Typography } from 'antd'
import styles from './FormLogin.module.css'

const { Title } = Typography

export default function FormLogin() {
	return (
		<Card style={{
			width: '440px'
		}}>
			<Form
				// form={form}
				name='horizontal_login'
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
					name='username'
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input prefix={<UserOutlined />} width={376} placeholder='Username' />
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
