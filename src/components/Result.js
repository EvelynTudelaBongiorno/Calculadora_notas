import React from 'react';

const Result = ({ average }) => {
  return (
    <div className="mt-4">
      <h3>Promedio Ponderado</h3>
      <p className="h4">{average !== null ? average.toFixed(2) : 'Ingresa tus notas'}</p>
    </div>
  );
};

export default Result;
