// ForgotPasswordForm.tsx
import React, { useState, ChangeEvent } from 'react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleForgotPassword = () => {
    // Implement the logic to send a password reset email
    // You can use your authentication service or API here
    console.log(`Send password reset email to: ${email}`);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email to reset your password:</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={handleForgotPassword}>Reset Password</button>
    </div>
  );
};

export default ForgotPasswordForm;
