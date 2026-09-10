import { useState, useEffect, use } from 'react';

function FormulaireObjet(donnateur) {
  
    const [libelle, setLibelle] = useState('')
    const [poids_kg, setPoids_kg] = useState('')
    const [etat_arrivee, setEtat_arrivee] = useState('')
    const [statut, setStatut] = useState('')
    const [prix, setPrix] = useState('')
    const [date_mise_rayon, setDate_mise_rayon] = useState('')
    const [categorie, setCategorie] = useState('')
    const [vente_id, setVente_id] = useState('')
    const [prix_paye, setPrix_paye] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        const nouveauObjet = {
            libelle,
            poids_kg,
            etat_arrivee,
            statut,
            prix,
            date_mise_rayon,
            categorie,
            vente_id,
            prix_paye
        }

         const depotReponse = await fetch('http://localhost:3000/api/:id/depots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nouveauObjet)
        })

        if (depotReponse.ok) {
            setLibelle(''),
            setPoids_kg(''),
            setEtat_arrivee(''),
            setStatut(''),
            setPrix(''),
            setDate_mise_rayon(''),
            setCategorie(''),
            setVente_id(''),
            setPrix_paye('')
            } else {
            const erreur = await depotReponse.json()
            alert(erreur.erreur)
        }
    }

    return (
    <form onSubmit={handleSubmit}>

      <input
        type="number"
        placeholder="Durée (minutes)"
        value={date_depot}
        onChange={(e) => setDate_depot(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Type...</option>
        <option value="boutique">Boutique</option>
        <option value="domicile">Domicile</option>
      </select>

      <select value={personne_id} onChange={(e) => setPersonne_id(e.target.value)}>
        <option value="">Donnateur...</option>
        {donnateur.map(d => (
          <option key={d.id} value={d.id}>{d.nom} - {d.prenom} - {d.telephone}</option>
        ))}
      </select>

      <button type="submit">Ajouter le dépot</button>
    </form>
    )  
}

export default FormulaireDepot