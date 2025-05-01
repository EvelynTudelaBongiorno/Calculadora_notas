import React, { useState } from 'react';

const NoteInput = ({ addNote }) => {
  const [note, setNote] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note && weight) {
      addNote({ note: parseFloat(note), weight: parseFloat(weight) });
      setNote('');
      setWeight('');
    }
  };

  return (
    <div className="mb-4">
      <h3>Agregar Nota</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nota</label>
          <input
            type="number"
            className="form-control"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ponderación</label>
          <input
            type="number"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
};

export default NoteInput;
