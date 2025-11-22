import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('cliente'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rolRegistro, setRolRegistro] = useState('cliente'); 

  const predefinedUsers = [
    { email: 'admin@huerto.cl', password: 'admin', rol: 'administrador' },
    { email: 'colaborador@huerto.cl', password: 'colab', rol: 'colaborador' },
  ];

  const roles = ['cliente', 'colaborador', 'administrador'];

  const handleLogin = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const allUsers = [...predefinedUsers, ...users];

    const user = allUsers.find(
      u => u.email === email && u.password === password && u.rol === currentView
    );

    if (user) {
      alert(`Inicio de sesión exitoso. Rol: ${user.rol}`);
      localStorage.setItem('usuarioLogueado', JSON.stringify(user));
      navigate('/');
      window.location.reload();
    } else {
      alert(`Credenciales incorrectas o el rol seleccionado (${currentView}) no coincide con el usuario.`);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some(u => u.email === email) || predefinedUsers.some(u => u.email === email)) {
      alert('El correo ya está registrado.');
      return;
    }
    
    users.push({ email, password, rol: rolRegistro });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Usuario registrado correctamente como ' + rolRegistro);

    setEmail(''); 
    setPassword('');
    setRolRegistro('cliente'); 
    setCurrentView('cliente');
  };

  const tabStyle = (view) => ({
    padding: '10px 15px',
    cursor: 'pointer',
    backgroundColor: currentView === view ? 'var(--color-primary)' : '#8BC34A',
    color: currentView === view ? 'white' : 'var(--color-text)',
    borderRadius: '8px 8px 0 0',
    border: '1px solid var(--color-primary)',
    borderBottom: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    textTransform: 'capitalize',
    flexGrow: 1,
    textAlign: 'center'
  });

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  };

  const inputStyle = {
    width: '80%',
    maxWidth: '350px',
    marginBottom: '12px',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  };

  return (
    <div 
      id="forms-container" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto'
      }}
    >
      <h1 style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        LOGIN - HUERTO HOGAR
      </h1>
      
      <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', marginBottom: '-1px' }}>
            {roles.map(rol => (
                <div 
                    key={rol}
                    style={tabStyle(rol)}
                    onClick={() => {
                        setCurrentView(rol);
                        setEmail('');
                        setPassword('');
                    }}
                >
                    {rol}
                </div>
            ))}
        </div>
        
        <div style={{ 
            backgroundColor: 'var(--color-card)',
            padding: '30px',
            borderRadius: '0 0 12px 12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid var(--color-primary)',
            margin: '0 auto'
        }}>

          {currentView === 'registro' ? (
              <form id="register-form" onSubmit={handleRegister} style={formContainerStyle}>
                  <h2>Registro de Cuenta</h2>
                  <p style={{marginBottom: '20px', fontSize: '0.9rem', color: '#555', textAlign: 'center'}}>
                    Crea una cuenta para realizar compras o contribuir al blog.
                  </p>

                  <label>Correo:</label>
                  <input 
                    type="email"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />

                  <label>Contraseña:</label>
                  <input 
                    type="password"
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                  />

                  <label>Registrar como:</label>
                  <select 
                    value={rolRegistro}
                    onChange={(e) => setRolRegistro(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="cliente">Cliente (Comprador)</option>
                    <option value="colaborador">Colaborador (Acceso al Blog)</option>
                  </select>

                  <button type="submit">Registrar</button>

                  <p>
                    ¿Ya tienes cuenta? 
                    <a href="#" onClick={(e) => {e.preventDefault(); setCurrentView('cliente');}}>
                      Inicia sesión
                    </a>
                  </p>
              </form>
          ) : (
            <form id="login-form" onSubmit={handleLogin} style={formContainerStyle}>
              <h2>Iniciar Sesión como {currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h2>

              <label>Correo:</label>
              <input 
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />

              <label>Contraseña:</label>
              <input 
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />

              <button type="submit" style={{ marginTop: '10px' }}>Ingresar</button>

              <p>
                ¿No tienes cuenta?
                <a href="#" onClick={(e) => {e.preventDefault(); setCurrentView('registro');}}>
                  Regístrate
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
