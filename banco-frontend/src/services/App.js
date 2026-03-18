import React, { useState } from "react";
import "./App.css";

import Clientes from "./components/Clientes";
import Transferencia from "./components/Transferencia";
import Transacciones from "./components/Transacciones";

function App() {
  const [vista, setVista] = useState("clientes");
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container">
      <h1>Banco 2026</h1>

      <div className="menu">
        <button onClick={() => setVista("clientes")}>Clientes</button>
        <button onClick={() => setVista("transferencia")}>Transferencia</button>
        <button onClick={() => setVista("transacciones")}>Historial</button>
      </div>

      <hr />

      {vista === "clientes" && <Clientes refresh={refresh} />}
      {vista === "transferencia" && <Transferencia setRefresh={setRefresh} />}
      {vista === "transacciones" && <Transacciones refresh={refresh} />}
    </div>
  );
}

export default App;
