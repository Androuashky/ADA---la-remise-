import { useState } from 'react';
import { useNavigate } from 'react-router';
import Donnateur from '../components/Donnateur';
import './NouveauDepot.css'
 

function FormulaireDepot({donnateur,setDonnateur}) {
    const [type, setType] = useState('')
    const [date_depot, setDate_depot] = useState('')
    const [personne_id, setPersonne_id] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        const nouveauDepot = {
            type,
            date_depot,
            personne_id: parseInt(personne_id),
        }

         const depotReponse = await fetch('http://localhost:3000/api/depots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nouveauDepot)
        })

        if (depotReponse.ok) {
            const depot = await depotReponse.json()

            setType('')
            setDate_depot('')
            setPersonne_id('')

            navigate(`/depots/${depot.id}`)

        } else {
            const erreur = await depotReponse.json()
            alert(erreur.erreur)
        }
    }

    return (
    <form className="formulaire-depot" onSubmit={handleSubmit}>
      <Donnateur setDonnateur={setDonnateur} />

      <input
        className="date-depot"
        type="date"
        placeholder="date du dépot"
        value={date_depot}
        onChange={(e) => setDate_depot(e.target.value)}
      />

      <select className="type-depot" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Type...</option>
        <option value="boutique">Boutique</option>
        <option value="domicile">Domicile</option>
      </select>

      <select className="personne-depot" value={personne_id} onChange={(e) => setPersonne_id(e.target.value)}>
        <option value="">Donnateur...</option>
        {donnateur.map(d => (
          <option key={d.id} value={d.id}>{d.nom} - {d.prenom} - {d.telephone}</option>
        ))}
      </select>

      <button className="btn-ajouter-depot" type="submit">Ajouter le dépot</button>
    </form>
    )  
}

export default FormulaireDepot