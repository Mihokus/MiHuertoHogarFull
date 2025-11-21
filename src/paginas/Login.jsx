
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      alert('Inicio de sesión exitoso');
      localStorage.setItem('usuarioLogueado', JSON.stringify(user));
      navigate('/');
      window.location.reload();
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };


  const handleRegister = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some(u => u.email === email)) {
      alert('El correo ya está registrado');
      return;
    }
    
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuario registrado correctamente');
    

    setEmail(''); 
    setPassword('');
    setIsLogin(true); 
  };
  

  const toggleForm = (isLoginForm) => {
    setEmail('');
    setPassword('');
    setIsLogin(isLoginForm);
  };

  return (
    <div id="forms-container">
      <h1>LOGIN - HUERTO HOGAR</h1>
      
    
      {isLogin ? (
        <form id="login-form" onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
          <label htmlFor="login-email">Correo:</label>
          <input 
            type="email" 
            id="login-email" 
            required 
            autoComplete="username"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <br/>
          <label htmlFor="login-password">Contraseña:</label>
          <input 
            type="password" 
            id="login-password" 
            required 
            autoComplete="current-password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <br/>
          <button type="submit">Ingresar</button>
          <p>¿No tienes cuenta? <a href="#" onClick={(e) => {e.preventDefault(); toggleForm(false);}}>Regístrate</a></p>
        </form>
      ) : (
        
        <form id="register-form" onSubmit={handleRegister}>
          <h2>Registro</h2>
          <label htmlFor="register-email">Correo:</label>
          <input 
            type="email" 
            id="register-email" 
            required 
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br/>
          <label htmlFor="register-password">Contraseña:</label>
          <input 
            type="password" 
            id="register-password" 
            required 
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br/>
          <button type="submit">Registrar</button>
          <p>¿Ya tienes cuenta? <a href="#" onClick={(e) => {e.preventDefault(); toggleForm(true);}}>Inicia sesión</a></p>
        </form>
      )}
    </div>
  );
}

export default Login;