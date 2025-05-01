// Función para calcular la nota faltante para aprobar el curso
export const calcularNotaRequerida = (
  notas,
  porcentajes,
  notaAprobacion,
  setNotaExamen,
  toast
) => {
  let sumaNotasConocidas = 0;
  let porcentajeAcumulado = 0;

  // Verifica si todas las notas están completadas
  const todasLasNotasCompletas = notas.every(
    (nota) => nota !== null && nota !== ""
  );

  // Si todas las notas están completas, calcular la nota total
  if (todasLasNotasCompletas) {
    for (let i = 0; i < notas.length; i++) {
      sumaNotasConocidas += notas[i] * (porcentajes[i] / 100);
      porcentajeAcumulado += porcentajes[i];
    }

    const notaFinal = sumaNotasConocidas;

    // Si ya se ha completado todo y el porcentaje es 100%, verificar si se aprobó
    if (porcentajeAcumulado === 100) {
      if (notaFinal >= notaAprobacion) {
        toast.success(`¡Ya aprobaste con un total de ${notaFinal.toFixed(2)}!`);
      } else {
        toast.error(
          `No has aprobado. Necesitas ${notaAprobacion - notaFinal} más.`
        );
      }
    } else {
      toast.error(
        "El porcentaje total no llega al 100%. Verifica los porcentajes."
      );
    }

    return; // Finaliza la función si todas las notas están completas
  }

  // Si no todas las notas están completas, calculamos la nota faltante
  let porcentajeAcumuladoIncompleto = 0;
  for (let i = 0; i < notas.length; i++) {
    if (notas[i] !== "" && notas[i] !== null) {
      sumaNotasConocidas += notas[i] * (porcentajes[i] / 100);
      porcentajeAcumuladoIncompleto += porcentajes[i];
    }
  }

  // Calcula el porcentaje restante
  const porcentajeRestante = 100 - porcentajeAcumuladoIncompleto;

  if (porcentajeRestante <= 0) {
    toast.error("El porcentaje total ya alcanza el 100%. Verifica los campos.");
    return; // Si el porcentaje es 100%, no se puede calcular más
  }

  // Calcula la nota necesaria para alcanzar la nota de aprobación
  const notaNecesaria =
    (notaAprobacion - sumaNotasConocidas) / (porcentajeRestante / 100);

  // Verifica si es posible aprobar con la nota necesaria
  if (notaNecesaria <= 7) {
    setNotaExamen(notaNecesaria); // Actualiza el estado con la nota necesaria
    toast.success(
      `Necesitas una nota de ${notaNecesaria.toFixed(2)} para aprobar.`
    );
  } else {
    setNotaExamen(null); // No es posible aprobar
    toast.error("No es posible aprobar el curso con las notas actuales.");
  }
};
