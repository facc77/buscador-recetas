import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  const [recetas, guardarRecetas] = useState([]);
  const [busqueda, buscarRecetas] = useState({
    nombre: "",
    categoria: "",
  });
  const [consultar, guardarConsultar] = useState(false);

  const { nombre, categoria } = busqueda;

  useEffect(() => {
    if (consultar) {
      if (nombre !== "" && categoria !== "") {
        const obtenerRecetas = async () => {
          const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

          const resultado = await axios.get(url);
          guardarRecetas(resultado.data.drinks);
        };
        obtenerRecetas();
        console.log(nombre, categoria);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must enter an ingredient and a category",
        });
      }
    }
  }, [busqueda]);

  return (
    <RecetasContext.Provider
      value={{
        recetas,
        buscarRecetas,
        guardarConsultar,
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
