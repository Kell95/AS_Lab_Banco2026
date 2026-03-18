import React, { useEffect, useState } from "react";
import { getTransacciones, getClientes } from "../services/api";

function Transacciones() {
  const [transacciones, setTransacciones] = useState([]);
  const [clientes, setClientes] = useState([]);

  // Carga tanto transacciones como clientes

  useEffect(() => {
    cargarDatos();
  }, []);

  // Función que obtiene los datos desde la API

  const cargarDatos = async () => {
    try {
      const t = await getTransacciones();
      const c = await getClientes();

      setTransacciones(t);
      setClientes(c);
    } catch {
      alert("Error cargando datos");
    }
  };


  // Busca el cliente correspondiente dentro del estado "clientes"

  const obtenerNombre = (accountNumber) => {
    const cliente = clientes.find(c => c.accountNumber === accountNumber);
    return cliente ? `${cliente.firstName} ${cliente.lastName}` : "Desconocido";
  };

  return (
    <div>
      <h2>Historial de Transacciones</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {transacciones.map(t => (
            <tr key={t.id}>
              <td>{obtenerNombre(t.senderAccountNumber)}</td>
              <td>{t.senderAccountNumber}</td>
              <td>{t.receiverAccountNumber}</td>
              <td>${t.amount}</td>
              <td>
                {t.timestamp
                  ? new Date(t.timestamp).toLocaleString()
                  : "Sin fecha"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transacciones;