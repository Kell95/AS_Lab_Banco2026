const API_URL = "http://localhost:8080/api";

// CLIENTES

export const getClientes = async () => {
  const response = await fetch(`${API_URL}/customers`);
  if (!response.ok) throw new Error("Error al obtener clientes");
  return response.json();
};

export const crearCliente = async (cliente) => {
  const response = await fetch("http://localhost:8080/api/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  return response.json();
};

export const actualizarCliente = async (id, cliente) => {
  const response = await fetch(`http://localhost:8080/api/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  return response.json();
};

export const eliminarCliente = async (id) => {
  return await fetch(`http://localhost:8080/api/customers/${id}`, {
    method: "DELETE",
  });

};

// TRANSFERENCIAS

export const transferir = async (transfer) => {
  const response = await fetch(`${API_URL}/transactions/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...transfer,
      amount: parseFloat(transfer.amount),
    }),
  });

  if (!response.ok) throw new Error("Error en la transferencia");
  return response.json();
};

// TRANSACCIONES

export const getTransacciones = async () => {
  const response = await fetch(`${API_URL}/transactions`);
  if (!response.ok) throw new Error("Error al obtener transacciones");
  return response.json();
};