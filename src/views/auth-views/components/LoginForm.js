import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Divider, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { 
	signIn, 
	showLoading, 
	showAuthMessage, 
	hideAuthMessage, 
	signInWithGoogle, 
	signInWithFacebook 
} from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

export const LoginForm = props => {
	
	const navigate = useNavigate();

	const { 
		otherSignIn, 
		showForgetPassword, 
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		extra, 
		signIn, 
		token, 
		loading,
		redirect,
		showMessage,
		message,
		allowRedirect = true
	} = props

	const initialCredential = {
		email: '',
		password: ''
	}

	const onLogin = values => {
		showLoading()
		signIn(values);
	};

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
	
	const renderOtherSignIn = (
		<div>
			<Divider>
				<span className="text-muted font-size-base font-weight-normal">crie um conta</span>
			</Divider>
			<div className="d-flex justify-content-center">
				<Button 
					className="mr-2" 
					disabled={loading} 
				>
					<a href="/auth/register">Criar conta</a>
				</Button>
			</div>
		</div>
	)

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
			<Form 
				layout="vertical" 
				name="login-form" 
				initialValues={initialCredential}
				onFinish={onLogin}
			>
				<Form.Item 
					name="username" 
					label="Usuário" 
					rules={[
						{ 
							required: true,
							message: 'Usuário não pode ser vazio.',
						}
					]}>
					<Input prefix={<UserOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label={
						<div className={`${showForgetPassword? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Senha</span>
						</div>
					} 
					rules={[
						{ 
							required: true,
							message: 'Senha não pode ser vazia.',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Entrar
					</Button>
				</Form.Item>
				{
					otherSignIn ? renderOtherSignIn : null
				}
				{ extra }
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	signInWithGoogle,
	signInWithFacebook
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
