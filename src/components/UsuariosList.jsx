import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const irA = useNavigate();

  useEffect(() => {
    fetch('https://54.174.68.124/usuarios/obtener', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          setMensaje(data.error);
        } else {
          setUsuarios(data);
        }
      })
      .catch(err => {
        console.error('Error al traer usuarios:', err);
        setMensaje('No se pudieron cargar los usuarios.');
      });
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('access_token');
    irA('/login');
  };

  return (
    <div className="lista-usuarios">
      <img src="/usuarios.png" alt="Lista" className="imagen-usuarios" />
      <h2>Usuarios Registrados</h2>

      <button onClick={cerrarSesion} className="btn-cerrar-sesion">
        Salir
      </button>

      {mensaje && <p className="texto-error">{mensaje}</p>}

      {usuarios.length > 0 ? (
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="sin-datos">No hay usuarios para mostrar.</p>
      )}
    </div>
  );
};

export default UsuariosList;
