import React, { useState } from "react";
import { transferir } from "../services/api";

function Transferencia({ setRefresh }) {
  const [transfer, setTransfer] = useState({
    senderAccountNumber: "",
    receiverAccountNumber: "",
    amount: "",
  });

  // Estado para manejar mensajes de error al usuario

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setTransfer({
      ...transfer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    if (!transfer.senderAccountNumber || !transfer.receiverAccountNumber || !transfer.amount) {
      setErrorMsg("Todos los campos son obligatorios");
      return;
    }

    if (transfer.senderAccountNumber === transfer.receiverAccountNumber) {
      setErrorMsg("No puedes transferir a la misma cuenta");
      return;
    }

    try {
      await transferir({
        ...transfer,
        amount: Number(transfer.amount), //  FIX IMPORTANTE
      });

      alert("Transferencia realizada");

      //  ACTUALIZA TODA LA APP
      setRefresh(prev => !prev);

      // limpiar formulario
      setTransfer({
        senderAccountNumber: "",
        receiverAccountNumber: "",
        amount: "",
      });

    } catch (error) {
      console.error(error);

      setErrorMsg(
        error.response?.data?.message || "Fondos insuficientes"
      );
    }
  };

  return (
    <div>
      <h2>Transferencia</h2>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="senderAccountNumber"
          placeholder="Cuenta origen"
          value={transfer.senderAccountNumber}
          onChange={handleChange}
        />

        <input
          name="receiverAccountNumber"
          placeholder="Cuenta destino"
          value={transfer.receiverAccountNumber}
          onChange={handleChange}
        />

        <input
          name="amount"
          type="number"
          placeholder="Monto"
          value={transfer.amount}
          onChange={handleChange}
        />

        <button type="submit">Transferir</button>
      </form>
    </div>
  );
}

export default Transferencia;