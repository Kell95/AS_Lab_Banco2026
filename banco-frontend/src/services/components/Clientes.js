import React, { useEffect, useState } from "react";
import {
  getClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} from "../services/api";



function Clientes({ refresh }) {
  const [clientes, setClientes] = useState([]);   //  donde se almacenan todos los clientes obtenidos de la API


  const [nuevoCliente, setNuevoCliente] = useState({ //  para manejar los datos del formulario de creación
    firstName: "",
    lastName: "",
    accountNumber: "",
    balance: "",
  });

  // editar clientes
  const [editando, setEditando] = useState(false);
  const [clienteEditado, setClienteEditado] = useState(null);

// Función que consulta la API y carga los clientes en el estado
  const cargarClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  useEffect(() => {
    cargarClientes();
  }, [refresh]);

  // Maneja los cambios en los inputs del formulario de creación
  const handleChange = (e) => {
    setNuevoCliente({
      ...nuevoCliente,
      [e.target.name]: e.target.value,
    });
  };

    // Maneja los cambios en los inputs del formulario de creación

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nuevoCliente.firstName ||
      !nuevoCliente.lastName ||
      !nuevoCliente.accountNumber ||
      !nuevoCliente.balance
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await crearCliente({
        ...nuevoCliente,
        balance: Number(nuevoCliente.balance),
      });

      alert("Cliente creado");

      setNuevoCliente({
        firstName: "",
        lastName: "",
        accountNumber: "",
        balance: "",
      });

      cargarClientes();

    } catch (error) {
      alert("Error al crear cliente");
    }
  };

  // Activa el modo edición y carga el cliente seleccionado

  const handleEditar = (cliente) => {
    setEditando(true);
    setClienteEditado({ ...cliente });
  };
  // Maneja los cambios en el formulario de edición

  const handleEditChange = (e) => {
    setClienteEditado({
      ...clienteEditado,
      [e.target.name]: e.target.value,
    });
  };
  // Guarda los cambios del cliente editado
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await actualizarCliente(clienteEditado.id, {
        ...clienteEditado,
        balance: Number(clienteEditado.balance),
      });

      alert("Cliente actualizado");

      setEditando(false);
      setClienteEditado(null);
      cargarClientes();

    } catch (error) {
      alert("Error al actualizar cliente");
    }
  };

  // Elimina un cliente por su ID
  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este cliente?");
    if (!confirmar) return;

    try {
      await eliminarCliente(id);
      alert("Cliente eliminado");
      cargarClientes();

    } catch (error) {
      alert("Error al eliminar cliente");
    }
  };

  return (
    <div>
      <h2>Clientes</h2>

      {/* FORMULARIO CREAR */}
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="Nombre"
          value={nuevoCliente.firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Apellido"
          value={nuevoCliente.lastName}
          onChange={handleChange}
        />
        <input
          name="accountNumber"
          placeholder="Cuenta"
          value={nuevoCliente.accountNumber}
          onChange={handleChange}
        />
        <input
          name="balance"
          type="number"
          placeholder="$Saldo"
          value={nuevoCliente.balance}
          onChange={handleChange}
        />

        <button type="submit">Crear Cliente</button>
      </form>

      <hr />

      {/* FORMULARIO EDITAR */}
      {editando && (
        <div>
          <h3>Editar Cliente</h3>

          <form onSubmit={handleUpdate}>
            <input
              name="firstName"
              value={clienteEditado.firstName}
              onChange={handleEditChange}
            />
            <input
              name="lastName"
              value={clienteEditado.lastName}
              onChange={handleEditChange}
            />
            <input
              name="accountNumber"
              value={clienteEditado.accountNumber}
              onChange={handleEditChange}
            />
            <input
              name="balance"
              type="number"
              value={clienteEditado.balance}
              onChange={handleEditChange}
            />

            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </form>

          <hr />
        </div>
      )}

      {/* TABLA */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cuenta</th>
            <th>Saldo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.firstName}</td>
              <td>{c.lastName}</td>
              <td>{c.accountNumber}</td>
              <td>{c.balance}</td>
              <td>
                <button onClick={() => handleEditar(c)}>Editar</button>
                <button onClick={() => handleEliminar(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;