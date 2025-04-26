import React, { useState } from 'react';

const Registro = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  const [respuesta, setRespuesta] = useState('');

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    const { nombre, email, password } = formulario;

    if (!nombre || !email || !password) {
      setRespuesta('Rellena todos los datos.');
      return;
    }

    fetch('https://54.174.68.124/usuarios/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setRespuesta(data.error);
        } else {
          setRespuesta('Usuario registrado correctamente');
          setFormulario({ nombre: '', email: '', password: '' });
        }
      })
      .catch(err => {
        console.error('Error en el registro:', err);
        setRespuesta('Fallo en el servidor');
      });
  };

  return (
    <section className="contenedor-registro">
      <img src="/registro.jpg" alt="Registro" className="imagen-registro" />
      <h2>Crear Cuenta</h2>
      {respuesta && <div className="mensaje-respuesta">{respuesta}</div>}
      <form onSubmit={manejarEnvio} className="formulario-registro">
        <input type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={manejarCambio} />
        <input type="email" name="email" placeholder="Correo" value={formulario.email} onChange={manejarCambio} />
        <input type="password" name="password" placeholder="Contraseña" value={formulario.password} onChange={manejarCambio} />
        <button type="submit">Registrarse</button>
      </form>
    </section>
  );
};

export default Registro;
