// Register.tsx
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleRegister = (event: React.FormEvent) => {
		event.preventDefault();
		// Implement your registration logic here
		// You can use the 'email' and 'password' state values for registration
	};

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleRegister}>
				<div>
					<label>Email:</label>
					<input type='email' value={email} onChange={e => {
						setEmail(e.target.value);
					}} />
				</div>
				<div>
					<label>Password:</label>
					<input type='password' value={password} onChange={e => {
						setPassword(e.target.value);
					}} />
				</div>
				<div>
					<label>Confirm Password:</label>
					<input
						type='password'
						value={confirmPassword}
						onChange={e => {
							setConfirmPassword(e.target.value);
						}}
					/>
				</div>
				<button type='submit'>Register</button>
			</form>
			<p>
        Already have an account? <Link to='/login'>Login</Link>
			</p>
		</div>
	);
};

export default Register;
