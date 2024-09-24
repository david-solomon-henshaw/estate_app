// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Mock authentication logic
//     if (username === 'admin' && password === 'admin123') {
//       navigate('/admin'); // Redirect to Admin Dashboard
//     } else if (username === 'security' && password === 'security123') {
//       navigate('/security'); // Redirect to Security Dashboard
//     } else {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div>
//       <h1>Login Page</h1>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Username:</label>
//           <input 
//             type="text" 
//             value={username} 
//             onChange={(e) => setUsername(e.target.value)} 
//             required 
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication logic
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin'); // Redirect to Admin Dashboard
    } else if (username === 'security' && password === 'security123') {
      navigate('/security'); // Redirect to Security Dashboard
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Login Page</h1>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="card shadow"> {/* Card with shadow */}
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Username:</label>
                  <input 
                    type="text" 
                    className="form-control shadow" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input 
                    type="password" 
                    className="form-control shadow" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className=" shadow btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
