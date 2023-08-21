// Components/auth/RegisterForm.tsx
import React, {useState} from 'react';
import {useAuth} from '../../context/authContext';

const RegisterForm: React.FC = () => {
	const {register} = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Call the register function from the AuthContext and provide email and password
		register(email, password);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Register</h2>
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={e => {
					setEmail(e.target.value);
				}}
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={e => {
					setPassword(e.target.value);
				}}
			/>
			<input
				type='password'
				placeholder='Confirm Password'
				value={confirmPassword}
				onChange={e => {
					setConfirmPassword(e.target.value);
				}}
			/>
			<button type='submit'>Register</button>
		</form>
	);
};

export default RegisterForm;
