import React, { useState, useRef } from "react";
import Titulo from "../src/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // Archivo CSS personalizado
import toast, { Toaster } from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App2() {
  const [serviceList, setServiceList] = useState([
    { nota: "", porcentaje: "" },
  ]);
  const [sumPorcentaje, setSumPorcentaje] = useState(0);
  const [promedioNotas, setPromedioNotas] = useState(0);
  const [notaAprobacion, setNotaAprobacion] = useState("4.0");
  const [porcentajeNotaExamen, setPorcentajeNotaExamen] = useState("40");
  const [notaExamen, setNotaExamen] = useState(0.0);

  const serviceListRef = useRef([{ nota: "", porcentaje: "" }]);

  const [colorPorcentaje, setColorPorcentaje] = useState("text-success");
  const [colorNotaPresentacion, setColorNotaPresentacion] =
    useState("text-success");

  const [invalidFields, setInvalidFields] = useState({});
  const [invalidNotaAprobacion, setInvalidNotaAprobacion] = useState(false);
  const [invalidPorcentajeExamen, setInvalidPorcentajeExamen] = useState(false);

  // Nuevo estado para manejar el tema
  const [darkMode, setDarkMode] = useState(false);

  // Función para alternar entre el modo oscuro y claro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;

    // Validación de la nota
    if (name === "nota") {
      const nota = parseFloat(value);
      if (nota < 1 || nota > 7) {
        setInvalidFields((prev) => ({ ...prev, [`nota-${index}`]: true }));
        toast.error("La nota debe estar entre 1 y 7.");
        return;
      } else {
        setInvalidFields((prev) => ({ ...prev, [`nota-${index}`]: false }));
      }
    }

    // Validación del porcentaje
    if (name === "porcentaje") {
      const porcentaje = parseFloat(value);
      if (porcentaje < 0 || porcentaje > 100) {
        setInvalidFields((prev) => ({
          ...prev,
          [`porcentaje-${index}`]: true,
        }));
        toast.error("El porcentaje debe estar entre 0 y 100.");
        return;
      } else {
        setInvalidFields((prev) => ({
          ...prev,
          [`porcentaje-${index}`]: false,
        }));
      }
    }

    setServiceList(list);
    serviceListRef.current = list;
    sumaTotalPorcentaje();
  };

  const sumaTotalPorcentaje = () => {
    const total = serviceListRef.current.reduce((acc, singleService) => {
      const porcentaje = parseFloat(singleService.porcentaje);
      if (!isNaN(porcentaje)) {
        return acc + porcentaje;
      }
      return acc;
    }, 0);

    if (total > 100) {
      setColorPorcentaje("text-danger");
    } else {
      setColorPorcentaje("text-success");
    }

    setSumPorcentaje(total);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);

    setInvalidFields({});

    setServiceList(list);
    serviceListRef.current = list;
    sumaTotalPorcentaje();
    setPromedioNotas(0);
    setNotaExamen(0.0);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { nota: "", porcentaje: "" }]);
  };

  const handleServiceAddNotaFinal = (notaFinal, restoP) => {
    setServiceList([...serviceList, { nota: notaFinal, porcentaje: restoP }]);
    serviceListRef.current = [
      ...serviceList,
      { nota: notaFinal, porcentaje: restoP },
    ];
    sumaTotalPorcentaje();
  };

  const handleAprobacionChange = (e, sw) => {
    let valor = e.target.value;

    if (e.target.value >= 1 && e.target.value <= 7) {
      if (sw === 1) {
        valor = parseFloat(e.target.value);
        valor = valor.toFixed(1);
      }
    }

    setNotaAprobacion(valor || "");

    if (e.target.value < 1 || e.target.value > 7) {
      toast.error("La Nota de Aprobación debe estar entre 1 y 7.");
      setInvalidNotaAprobacion(true);
      return;
    } else {
      setInvalidNotaAprobacion(false);
    }
  };

  const handlePorcentajeExamenChange = (e) => {
    setPorcentajeNotaExamen(e.target.value || "");

    if (e.target.value < 0 || e.target.value > 100) {
      toast.error(
        "El Porcentaje de la Nota de Examen debe estar entre 0 y 100."
      );
      setInvalidPorcentajeExamen(true);
      return;
    } else {
      setInvalidPorcentajeExamen(false);
    }
  };

  const calcularUltimaNota = () => {
    console.log("invalidFields", invalidFields);
    const restoPorcentaje = 100 - sumPorcentaje;

    for (let i = 0; i < serviceList.length; i++) {
      const { nota, porcentaje } = serviceList[i];
      if (nota === "" || porcentaje === "") {
        toast.error("Todos los campos deben ser completados.");

        if (nota === "") {
          setInvalidFields((prev) => ({ ...prev, [`nota-${i}`]: true }));
        }

        if (porcentaje === "") {
          setInvalidFields((prev) => ({ ...prev, [`porcentaje-${i}`]: true }));
        }
        return;
      }

      const notaNum = parseFloat(nota);
      const porcentajeNum = parseFloat(porcentaje);

      if (isNaN(notaNum) || isNaN(porcentajeNum)) {
        toast.error("Las notas y los porcentajes deben ser valores numéricos.");
        return;
      }

      // Validar que la nota esté entre 1 y 7
      if (notaNum < 1 || notaNum > 7) {
        toast.error("La nota debe estar entre 1 y 7.");
        setInvalidFields((prev) => ({ ...prev, [`nota-${i}`]: true }));
        return;
      }

      // Validar que el porcentaje esté entre 0 y 100
      if (porcentajeNum < 0 || porcentajeNum > 100) {
        toast.error("El porcentaje debe estar entre 0 y 100.");
        setInvalidFields((prev) => ({ ...prev, [`porcentaje-${i}`]: true }));
        return;
      }
    }

    let calculo1 = 0;
    for (let i = 0; i < serviceList.length; i++) {
      const { nota, porcentaje } = serviceList[i];
      calculo1 = calculo1 + (parseFloat(nota) * parseFloat(porcentaje)) / 100;
    }
    let calculo2 = (4.0 - calculo1) * 100;
    let calculo3 = parseFloat(calculo2) / restoPorcentaje;

    console.log("calculo1", calculo1);
    console.log("calculo2", calculo2);
    console.log("calculo3", calculo3);
    const mejorNotaFinal = calculo3.toFixed(2);
    handleServiceAddNotaFinal(mejorNotaFinal, restoPorcentaje);
  };

  const calcularPromedio = () => {
    // Verifi car si todos los campos están completos y son válidos
    for (let i = 0; i < serviceList.length; i++) {
      const { nota, porcentaje } = serviceList[i];
      if (nota === "" || porcentaje === "") {
        toast.error("Todos los campos deben ser completados.");

        if (nota === "") {
          setInvalidFields((prev) => ({ ...prev, [`nota-${i}`]: true }));
        }

        if (porcentaje === "") {
          setInvalidFields((prev) => ({ ...prev, [`porcentaje-${i}`]: true }));
        }
        return;
      }

      const notaNum = parseFloat(nota);
      const porcentajeNum = parseFloat(porcentaje);

      if (isNaN(notaNum) || isNaN(porcentajeNum)) {
        toast.error("Las notas y los porcentajes deben ser valores numéricos.");
        return;
      }

      // Validar que la nota esté entre 1 y 7
      if (notaNum < 1 || notaNum > 7) {
        toast.error("La nota debe estar entre 1 y 7.");
        setInvalidFields((prev) => ({ ...prev, [`nota-${i}`]: true }));
        return;
      }

      // Validar que el porcentaje esté entre 0 y 100
      if (porcentajeNum < 0 || porcentajeNum > 100) {
        toast.error("El porcentaje debe estar entre 0 y 100.");
        setInvalidFields((prev) => ({ ...prev, [`porcentaje-${i}`]: true }));
        return;
      }
    }

    // Validación para la Nota de Aprobación
    const notaAprobacionNum = parseFloat(notaAprobacion);
    if (notaAprobacionNum < 1 || notaAprobacionNum > 7) {
      toast.error("La Nota de Aprobación debe estar entre 1 y 7.");
      setInvalidNotaAprobacion(true);
      return;
    } else {
      setInvalidNotaAprobacion(false);
    }

    // Validación para el Porcentaje de la Nota de Examen
    const porcentajeNotaExamenNum = parseFloat(porcentajeNotaExamen);
    if (porcentajeNotaExamenNum < 0 || porcentajeNotaExamenNum > 100) {
      toast.error(
        "El Porcentaje de la Nota de Examen debe estar entre 0 y 100."
      );
      setInvalidPorcentajeExamen(true);
      return;
    } else {
      setInvalidPorcentajeExamen(false);
    }

    // Calcular el promedio ponderado
    const totalNotas = serviceList.reduce((acc, singleService) => {
      const nota = parseFloat(singleService.nota);
      const porcentaje = parseFloat(singleService.porcentaje);
      return acc + nota * (porcentaje / 100); // Multiplicamos por el porcentaje convertido a decimal
    }, 0);

    if (sumPorcentaje > 100) {
      toast.error("El porcentaje total no puede ser mayor a 100%.");
    }

    setPromedioNotas(totalNotas); // El promedio ponderado es la suma de los productos de notas y porcentajes

    const porcentajePresentacion = 100 - parseFloat(porcentajeNotaExamen); // El porcentaje restante para el examen

    // Cálculo de la nota requerida en el examen final
    //const notaRequerida = (parseFloat(notaAprobacion) - parseFloat(totalNotas) * (1 - porcentajePresentacion / 100)) / (porcentajePresentacion / 100);

    const valorNotaPresentacion =
      (parseFloat(porcentajePresentacion) * parseFloat(totalNotas.toFixed(2))) /
      100;
    const valorRestaNotaAprobacion =
      parseFloat(notaAprobacion) - parseFloat(valorNotaPresentacion);
    const notaRequerida =
      parseFloat(valorRestaNotaAprobacion) /
      (parseFloat(porcentajeNotaExamen) / 100);

    setNotaExamen(notaRequerida); // Guardamos la nota necesaria en el estado

    if (parseFloat(totalNotas) < 4) {
      setColorNotaPresentacion("text-danger");
    } else {
      setColorNotaPresentacion("text-success");
    }
  };

  function formatoDecimal(valor) {
    // Convertimos el número a una cadena y reemplazamos la coma por un punto
    let valorStr = valor.toString();
    return valorStr.replace(",", ".");
  }

  const getInputClass = (fieldName, index) => {
    const fieldKey = `${fieldName}-${index}`;
    return invalidFields[fieldKey] ? "is-invalid" : "";
  };

  return (
    <div className={`height-full p-4 ${darkMode ? "dark-mode" : ""}`}>
      <div className="container">
        <Titulo />
        <button
          onClick={toggleDarkMode}
          className={`btn ${
            darkMode ? "btn-light" : "btn-dark"
          } mb-3 rounded-pill`}
        >
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>

        <div className="form-field mb-4">
          <label htmlFor="service" className="h4">
            Ingrese notas
          </label>
          <table className="table table-bordered table-striped table-rounded">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-left">Nota</th>
                <th align="center" className="text-center">
                  <table border="0">
                    <tr>
                      <td width="35%">&nbsp;</td>
                      <td>Porcentaje</td>
                      <td className={colorPorcentaje}>({sumPorcentaje}%)</td>
                      <td width="35%">&nbsp;</td>
                    </tr>
                  </table>
                </th>
                <th className="text-center">Añadir</th>
                <th className="text-center">Eliminar</th>
              </tr>
            </thead>

            <tbody>
              {serviceList.map((singleService, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <input
                      name="nota"
                      type="number"
                      className={`form-control rounded-3 ${getInputClass(
                        "nota",
                        index
                      )}`}
                      value={singleService.nota}
                      onChange={(e) => handleServiceChange(e, index)}
                      required
                      placeholder={`Nota ${index + 1}`}
                    />
                    <div className="invalid-feedback">Nota no válida</div>
                  </td>
                  <td>
                    <input
                      name="porcentaje"
                      type="number"
                      className={`form-control rounded-3 ${getInputClass(
                        "porcentaje",
                        index
                      )}`}
                      value={singleService.porcentaje}
                      onChange={(e) => handleServiceChange(e, index)}
                      required
                      placeholder={`Porcentaje ${index + 1}`}
                    />
                    <div className="invalid-feedback">Porcentaje no válido</div>
                  </td>
                  <td className="text-center">
                    {serviceList.length - 1 === index && (
                      <>
                        <button
                          type="button"
                          onClick={handleServiceAdd}
                          className="btn btn-success btn-sm rounded-3"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </>
                    )}
                  </td>

                  <td className="text-center">
                    {serviceList.length !== 1 && (
                      <button
                        type="button"
                        onClick={() => handleServiceRemove(index)}
                        className="btn btn-danger btn-sm rounded-3"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="table-rounded" width="30%">
            <tr>
              <td>
                <label>Nota de Aprobación:</label>
                <input
                  type="text"
                  className={`form-control ${
                    invalidNotaAprobacion ? "is-invalid" : ""
                  }`}
                  value={formatoDecimal(notaAprobacion)}
                  onChange={(e) => handleAprobacionChange(e, 0)}
                  onBlur={(e) => handleAprobacionChange(e, 1)}
                />
                <div className="invalid-feedback">
                  La Nota de Aprobación debe estar entre 1 y 7.
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label>Porcentaje Nota Examen (%):</label>
                <input
                  type="number"
                  className={`form-control ${
                    invalidPorcentajeExamen ? "is-invalid" : ""
                  }`}
                  value={formatoDecimal(porcentajeNotaExamen)}
                  onChange={(e) => handlePorcentajeExamenChange(e)}
                />
                <div className="invalid-feedback">
                  El Porcentaje de la Nota de Examen debe estar entre 0 y 100.
                </div>
              </td>
            </tr>
          </table>
        </div>



        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-primary rounded-pill"
            onClick={calcularPromedio}
          >
            Calcular Promedio y Nota Examen
          </button>

          {sumPorcentaje > 50 && sumPorcentaje < 100 && (
            <button
              className="btn btn-primary rounded-pill"
              onClick={calcularUltimaNota}
            >
              Calcular Última Nota
            </button>
          )}
        </div>

        <div className="mt-3">
          <Toaster position="top-left" />
          <table>
            <tr>
              <td>
                <h5>Promedio de notas :&nbsp;</h5>
              </td>
              <td className={colorNotaPresentacion}>
                <h4>{promedioNotas.toFixed(2)}</h4>
              </td>
            </tr>
          </table>
        </div>
        <div className="mt-3">
          <Toaster position="top-left" />
          <table>
            <tr>
              <td>
                <h5>Necesitarás un&nbsp;</h5>
              </td>
              <td>
                <h4>{notaExamen.toFixed(2)} </h4>
              </td>
              <td>
                <h5>&nbsp;en el examen final para aprobar el curso</h5>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App2;
