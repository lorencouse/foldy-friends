import { useState } from 'react';
// import { signUp } from '../auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await signUp(email, password);
  //     alert('Signup successful! Please check your email for a confirmation link.');
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <div>
      {/* <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>} */}
    </div>
  );
};

export default SignUp;
