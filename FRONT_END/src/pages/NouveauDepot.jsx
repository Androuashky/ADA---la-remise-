// src/pages/NouveauDepot.jsx — formulaire de création d'un dépôt
import { useState } from 'react';

export default function NouveauDepot() {
  const [type, setType] = useState('boutique');
  const [personne_id, setPersonneId] = useState('');
  const [message, setMessage] = useState(null);

  async function enregistrer(e) {
    e.preventDefault();
    try {
      const reponse = await fetch('http://localhost:3000/api/depots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personne_id, type }),
      });
      const donnees = await reponse.json();
      if (!reponse.ok) throw new Error(donnees.error);
      setMessage(`Dépôt n°${donnees.id} enregistré ✅`);
      setPersonneId('');
    } catch (err) {
      setMessage(`Erreur : ${err.message}`);
    }
  }

  return (
    <div>
      <h1>Nouveau dépôt</h1>
      {message && <p>{message}</p>}
      <form onSubmit={enregistrer}>
        <label>
          Donatrice
          <input
            type="number"
            value={personne_id}
            onChange={(e) => setPersonneId(e.target.value)}
            placeholder="ID de la personne"
            required
          />
        </label>

        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="boutique">En boutique</option>
            <option value="domicile">À domicile</option>
          </select>
        </label>

        <button type="submit">Enregistrer le dépôt</button>
      </form>
    </div>
  );
}