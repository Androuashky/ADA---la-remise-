import { useState } from 'react';
import { useNavigate } from 'react-router';
import Donnateur from '../composants/Donnateur';
import '../composants/Fiche.css';


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
    <div className="fiche-page">
        <div
            className="btn-retour"
            onClick={() => navigate('/depots')}
        >
            ← Retour à la liste des dépôts
        </div>

        <div className="fiche-header">
            <h1 className="page-title">Enregistrer un dépôt</h1>
            <p className="fiche-subtitle">
                Saisissez les détails du lot apporté.
            </p>
        </div>

        <form className="form-card card" onSubmit={handleSubmit}>
            <h3>Informations générales</h3>
            <Donnateur setDonnateur={setDonnateur} />

            <div className="ligne-formulaire">

                {/* DONATEUR */}
                <div className="form-group">
                    <label>DONATEUR</label>

                    <select
                        className="champ-form"
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
                <div className="form-group">
                    <label>TÉLÉPHONE DU DONATEUR</label>

                    <input
                        className="champ-form"
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
                <div className="form-group">
                    <label>DATE DU DÉPÔT</label>

                    <input
                        className="champ-form"
                        type="date"
                        value={date_depot}
                        onChange={(e) =>
                            setDate_depot(e.target.value)
                        }
                    />
                </div>


                {/* TYPE */}
                <div className="form-group">
                    <label>TYPE DE DÉPÔT</label>

                    <select
                        className="champ-form"
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

            {/* BOUTONS */}
            <div className="form-actions">

                <button
                    type="button"
                    className="btn-neutre"
                    onClick={() => navigate('/depots')}
                >
                    Annuler
                </button>

                <button
                    type="submit"
                    className="btn-primaire"
                >
                    Enregistrer le dépôt
                </button>

            </div>
        </form>
    </div>
    )  
}

export default FormulaireDepot