// src/components/TableNotas.js
import React from 'react';

const TableNotas = () => {
  return (
    <table height="45" align="center">
      <tbody>
        <tr className="ejemplo">
          <td colspan="4">- Ejemplo: Nota 1</td>
          <td>
            <input
              type="text"
              value="65"
              disabled
              className="textNota form-control"
              style={{ minWidth: '50px', width: '20%', float: 'left' }}
            />
          </td>
          <td>
            <input
              type="text"
              value="25"
              disabled
              className="textNota form-control"
              style={{ minWidth: '50px', width: '20%' }}
            />
          </td>
          <td>%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableNotas;
