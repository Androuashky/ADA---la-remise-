import { useState } from 'react';
import { useNavigate } from 'react-router';
import Donnateur from '../composants/Donnateur';
import './NouveauDepot.css'
 

function FormulaireDepot({donnateur,setDonnateur}) {
    const [type, setType] = useState('')
    const [date_depot, setDate_depot] = useState('')
    const [personne_id, setPersonne_id] = useState('')
    const navigate = useNavigate()

    const donateurSelectionne = donnateur.find(
        d => d.id === parseInt(personne_id)
    );


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


      <div
        className="retour-depots"
        onClick={() => navigate('/depots')}
        >
          ← Retour à la liste des dépôts
      </div>

      {/* TITRE */}
      <h1>Enregistrer un dépôt</h1>

        <p className="description-depot">
                Saisissez les détails du lot apporté.
        </p>

      {/* INFORMATIONS GÉNÉRALES */}
        <section className="bloc-informations">

          <h2>Informations générales</h2>

          <div className="ligne-separation"></div>

            <div className="grille-informations">


                    {/* DONATEUR */}
                    <div className="champ-depot">

                        <label>DONATEUR</label>

                        <select
                            value={personne_id}
                            onChange={(e) =>
                                setPersonne_id(e.target.value)
                            }
                        >

                            <option value="">
                                Sélectionner un donateur
                            </option>

                            {donnateur.map(d => (
                                <option
                                    key={d.id}
                                    value={d.id}
                                >
                                    {d.prenom} {d.nom}
                                </option>
                            ))}

                        </select>

                    </div>


                    {/* TELEPHONE */}
                    <div className="champ-depot">

                        <label>TÉLÉPHONE DU DONATEUR</label>

                        <input
                            type="text"
                            value={
                                donateurSelectionne
                                    ? donateurSelectionne.telephone
                                    : ''
                            }
                            placeholder="Sélectionnez un donateur"
                            readOnly
                        />

                    </div>


                    {/* DATE */}
                    <div className="champ-depot">

                        <label>DATE DU DÉPÔT</label>

                        <input
                            type="date"
                            value={date_depot}
                            onChange={(e) =>
                                setDate_depot(e.target.value)
                            }
                        />

                    </div>


                    {/* TYPE */}
                    <div className="champ-depot">

                        <label>TYPE DE DÉPÔT</label>

                        <select
                            value={type}
                            onChange={(e) =>
                                setType(e.target.value)
                            }
                        >

                            <option value="">
                                Sélectionner
                            </option>

                            <option value="boutique">
                                Boutique
                            </option>

                            <option value="domicile">
                                Domicile
                            </option>

                        </select>

                    </div>

            </div>

      </section>


            {/* BOUTONS */}
            <div className="actions-depot">

                <button
                    type="button"
                    className="btn-annuler"
                    onClick={() => navigate('/depots')}
                >
                    Annuler
                </button>

                <button
                    type="submit"
                    className="btn-enregistrer"
                >
                    Enregistrer le dépôt
                </button>

            </div>

    </form>
    )  
}

export default FormulaireDepot
