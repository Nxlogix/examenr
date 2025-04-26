import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [datos, setDatos] = useState({ email: '', password: '' });
  const [alerta, setAlerta] = useState('');
  const navegar = useNavigate();

  const actualizarCampo = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();

    if (!datos.email || !datos.password) {
      setAlerta('Todos los campos son obligatorios.');
      return;
    }

    try {
      const respuesta = await fetch('https://54.174.68.124/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (resultado.error) {
        setAlerta(resultado.error);
      } else {
        localStorage.setItem('access_token', resultado.access_token);
        setAlerta('Acceso concedido');
        navegar('/usuarios');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setAlerta('Error del servidor. Intenta más tarde.');
    }
  };

  return (
    <section className="contenedor-login">
      <img src="/presentacion.jpg" alt="Imagen de bienvenida" className="imagen-login" />
      <h2>Accede a tu cuenta</h2>
      {alerta && <div className="mensaje-alerta">{alerta}</div>}

      <form onSubmit={enviarFormulario} className="formulario-login">
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={datos.email}
          onChange={actualizarCampo}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={datos.password}
          onChange={actualizarCampo}
        />
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
};

export default Login;
