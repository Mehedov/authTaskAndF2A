import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'

export default function Form2FA() {
	return (
		<Form
			// form={form}
			name='horizontal_login'
			// onFinish={onFinish}
		>
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
		// <Title level={3}>Two-Factor Authentication</Title>
		//       <Form layout="vertical" onFinish={handle2FA}>
		//         <Form.Item
		//           name="code"
		//           rules={[
		//             { required: true, message: "Enter 6-digit code" },
		//             { len: 6, message: "Code must be 6 digits" },
		//           ]}
		//         >
		//           <Input placeholder="Enter code" maxLength={6} />
		//         </Form.Item>
		//         <Button
		//           type="primary"
		//           htmlType="submit"
		//           block
		//           loading={twoFAMutation.isPending}
		//         >
		//           Verify
		//         </Button>
		//       </Form>
	)
}
