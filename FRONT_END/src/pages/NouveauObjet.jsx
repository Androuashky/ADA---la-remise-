import { useState } from 'react';
import { useParams } from 'react-router';
import Categorie from '../components/Categorie';
import './NouveauObjet.css'

function FormulaireObjet({categorie, setCategorie}) {
  
    const [libelle, setLibelle] = useState('')
    const [poids_kg, setPoids_kg] = useState('')
    const [etat_arrivee, setEtat_arrivee] = useState('')
    const [statut, setStatut] = useState('')
    const [prix, setPrix] = useState('')
    const [date_mise_rayon, setDate_mise_rayon] = useState('')
    const [catego, setCatego] = useState('')
    const [vente_id, setVente_id] = useState('')
    const [prix_paye, setPrix_paye] = useState('')

    const {id} = useParams()

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

         const objetReponse = await fetch(`http://localhost:3000/api/depots/${id}/objets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nouveauObjet)
        })

        if (objetReponse.ok) {
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
            const erreur = await objetReponse.json()
            alert(erreur.erreur)
        }
    }

    return (
    <form className="formulaire-objet" onSubmit={handleSubmit}>
      <Categorie setCategorie={setCategorie}/>

      <input
        className="champ-objet"
        type="text"
        placeholder="nom de l'objet"
        value={libelle}
        onChange={(e) => setLibelle(e.target.value)}
      />

       <input
          className="champ-objet"
          type="text"
          inputMode="decimal"
          placeholder="poids en kg"
          value={poids_kg}
          onChange={(e) => {
              let valeur = e.target.value

              // Supprime tout sauf les chiffres et la virgule
              valeur = valeur.replace(/[^0-9,]/g, '')

              // Une seule virgule
              const parties = valeur.split(',')

              // Maximum 2 chiffres après la virgule
              if (parties[1]) {
                  parties[1] = parties[1].slice(0, 2)
              }

              valeur = parties.join(',')

              setPoids_kg(valeur)
          }}
      />

      <select className="champ-objet" value={etat_arrivee} onChange={(e) => setEtat_arrivee(e.target.value)}>
        <option value="">Etat arrivée</option>
        <option value="bon_etat">Bon état</option>
        <option value="a_reparer">A réparer</option>
        <option value="hors_service">Hors service</option>
      </select>

      <select className="champ-objet" value={statut} onChange={(e) => setStatut(e.target.value)}>
        <option value="">Statut</option>
        <option value="arrive">arrivé</option>
        <option value="en_reparation">en réparation</option>
        <option value="en_rayon">en rayon</option>
        <option value="vendu">vendu</option>
        <option value="recycle">recyclé</option>
      </select>

      <input
        className="champ-objet"
        type="text"
        inputMode="decimal"
        placeholder="prix"
        value={prix}
        onChange={(e) => {
            let valeur = e.target.value

            // Supprime tout sauf les chiffres et la virgule
            valeur = valeur.replace(/[^0-9,]/g, '')

            // Une seule virgule
            const parties = valeur.split(',')

            // Maximum 2 chiffres après la virgule
            if (parties[1]) {
                parties[1] = parties[1].slice(0, 2)
            }

            valeur = parties.join(',')

            setPrix(valeur)
        }}
    />
      <div className="date-mise-rayon">
          <label>Date de mise en rayon</label>

          <input
              className="champ-objet"
              type="date"
              placeholder="date de mise en rayon"
              value={date_mise_rayon}
              onChange={(e) => setDate_mise_rayon(e.target.value)}
          />
      </div>

      <select className="champ-objet"  value={catego} onChange={(e) => setCatego(e.target.value)}>
        <option value="">Catégories</option>
        {categorie.map(c => (
          <option key={c.id} value={c.id}>{c.libelle}</option>
        ))}
      </select>

      <button className="btn-ajouter-objet" type="submit">Ajouter l'objet</button>
    </form>
    )  
}

export default FormulaireObjet