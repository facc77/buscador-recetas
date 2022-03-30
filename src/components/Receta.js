import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 350,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  scroll: { maxHeight: "550px", overflowY: "scroll", overflowX: "none" },
}));

const Receta = ({ receta }) => {
  //configuracion del modal de material-ui
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //extraer los valores del context

  const { informacion, guardarIdReceta } = useContext(ModalContext);

  //Muestra y formatea los Ingredientes

  const mostrarIngredientes = (informacion) => {
    let ingredientes = [];
    for (let i = 0; i < 16; i++) {
      if (informacion[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {informacion[`strIngredient${i}`]} : {informacion[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>
        <img
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
          className="card-img-top"
        />
        <div className="card-body">
          <button
            className="btn btn-block btn-primary"
            onClick={() => {
              guardarIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            See recipe
          </button>
          <Modal
            open={open}
            onClose={() => {
              guardarIdReceta(null);
              handleClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <div className={classes.scroll}>
                <h2>{informacion.strDrink}</h2>
                <h3>{informacion ? "Informacion" : null}</h3>
                <p>{informacion.strInstructions}</p>
                <img
                  src={informacion.strDrinkThumb}
                  alt=""
                  className="img-fluid my-4"
                />
                <h3>Ingredients and portions</h3>
                <ul>{mostrarIngredientes(informacion)}</ul>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
