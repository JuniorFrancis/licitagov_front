import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert, Divider } from "antd";
import { signUp, showAuthMessage, showLoading, hideAuthMessage } from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

const rules = {
	username: [
		{ 
			required: true,
			message: 'Usuário não pode ser vazio'
		}
	],
	password: [
		{ 
			required: true,
			message: 'Senha não pode ser vazia.'
		}
	]
}

export const RegisterForm = (props) => {

	const { signUp, showLoading, token, loading, redirect, message, showMessage, hideAuthMessage, allowRedirect = true } = props
	const [form] = Form.useForm();

	const navigate = useNavigate();

	const renderOtherSignIn = (
		<div>
			<Divider>
				<span className="text-muted font-size-base font-weight-normal">Já tem uma conta? </span>
			</Divider>
			<div className="d-flex justify-content-center">
				<Button 
					className="mr-2" 
					disabled={loading} 
				>
					<a href="/auth/login">Entrar</a>
				</Button>
			</div>
		</div>
	)

	const onSignUp = () => {
    	form.validateFields().then(values => {
			showLoading()
			signUp(values)
		}).catch(info => {
			console.log('Validate Failed:', info);
		});
	}

	useEffect(() => {
		if (token !== null && allowRedirect) {
			navigate(redirect)
		}
		if (showMessage) {
			const timer = setTimeout(() => hideAuthMessage(), 3000)
			return () => {
				clearTimeout(timer);
			};
		}
	});
	
	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form form={form} layout="vertical" name="register-form" onFinish={onSignUp}>
				<Form.Item 
					name="username" 
					label="Usuário" 
					rules={rules.username}
					hasFeedback
				>
					<Input prefix={<UserOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label="Senha" 
					rules={rules.password}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Criar conta
					</Button>
					{ renderOtherSignIn }
				</Form.Item>
			</Form>
		</>
	)
}

const mapStateToProps = ({auth}) => {
	const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	signUp,
	showAuthMessage,
	hideAuthMessage,
	showLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
