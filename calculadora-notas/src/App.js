import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Archivo CSS personalizado



function App() {
  const [notas, setNotas] = useState({
    nota1: '',
    nota2: '',
    nota3: '',
    nota4: '',
  });

  const [ponderaciones, setPonderaciones] = useState({
    ponderacion1: 25,
    ponderacion2: 25,
    ponderacion3: 20,
    ponderacion4: 10,
    ponderacionExamen: 20,
  });

  const [notaAprobacion, setNotaAprobacion] = useState(60);
  const [modoOscuro, setModoOscuro] = useState(false);

  const toggleModoOscuro = () => {
    setModoOscuro(!modoOscuro);
    document.body.className = modoOscuro ? 'light-mode' : 'dark-mode';
  };

  const handleNotaChange = (nota, value) => {
    setNotas({ ...notas, [nota]: value });
  };

  const handlePonderacionChange = (ponderacion, value) => {
    setPonderaciones({ ...ponderaciones, [ponderacion]: value });
  };

  const calcularPromedio = () => {
    const totalPonderado =
      (notas.nota1 * ponderaciones.ponderacion1 +
        notas.nota2 * ponderaciones.ponderacion2 +
        notas.nota3 * ponderaciones.ponderacion3 +
        notas.nota4 * ponderaciones.ponderacion4) /
      (ponderaciones.ponderacion1 +
        ponderaciones.ponderacion2 +
        ponderaciones.ponderacion3 +
        ponderaciones.ponderacion4);
    return totalPonderado.toFixed(2);
  };

  const calcularNotaExamen = () => {
    const promedioActual =
      (notas.nota1 * ponderaciones.ponderacion1 +
        notas.nota2 * ponderaciones.ponderacion2 +
        notas.nota3 * ponderaciones.ponderacion3 +
        notas.nota4 * ponderaciones.ponderacion4) /
      100;

    const notaRequerida =
      (notaAprobacion - promedioActual * (1 - ponderaciones.ponderacionExamen / 100)) /
      (ponderaciones.ponderacionExamen / 100);
    return notaRequerida.toFixed(2);
  };

  return (
    <div
      className={`container-fluid p-4 ${modoOscuro ? 'dark-mode' : 'light-mode'}`}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow mb-4">
        <dv className="container-fluid">
            Calculadora de Notas
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="btn btn-secondary"
                  onClick={toggleModoOscuro}
                  aria-label="Toggle Mode"
                >
                  <i className={`bi ${modoOscuro ? 'bi-sun' : 'bi-moon'} fs-4`}></i>
                </button>
              </li>
            </ul>
          </div>
        </dv>
      </nav>

      <div className="container">
        <div className="card p-4 shadow">
          <h2 className="text-center mb-4">Ingresa tus notas</h2>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Nota</th>
                <th>Ponderación (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(notas).map((nota, index) => (
                <tr key={nota}>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={notas[nota]}
                      onChange={(e) =>
                        handleNotaChange(nota, parseFloat(e.target.value) || '')
                      }
                      placeholder={`Nota ${index + 1}`}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={ponderaciones[`ponderacion${index + 1}`]}
                      onChange={(e) =>
                        handlePonderacionChange(
                          `ponderacion${index + 1}`,
                          parseFloat(e.target.value) || ''
                        )
                      }
                      placeholder={`Ponderación ${index + 1}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-3">
            <label>Nota de Aprobación:</label>
            <input
              type="number"
              className="form-control"
              value={notaAprobacion}
              onChange={(e) => setNotaAprobacion(parseFloat(e.target.value) || '')}
            />
          </div>

          <div className="mb-3">
            <label>Ponderación del Examen (%):</label>
            <input
              type="number"
              className="form-control"
              value={ponderaciones.ponderacionExamen}
              onChange={(e) =>
                handlePonderacionChange('ponderacionExamen', parseFloat(e.target.value) || '')
              }
            />
          </div>

          <div className="text-center">
            <button
              className="btn btn-primary me-2"
              onClick={() =>
                alert(`Tu promedio ponderado es: ${calcularPromedio()}`)
              }
            >
              Calcular Promedio
            </button>
            <button
              className="btn btn-success"
              onClick={() =>
                alert(`Necesitas un ${calcularNotaExamen()} en el examen final`)
              }
            >
              Calcular Nota Examen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

