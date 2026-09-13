import { useState } from 'react';
import { useParams } from 'react-router';
import Categorie from '../components/Categorie';
import './NouveauObjet.css'

function FormulaireObjet({categorie, setCategorie, onAjouteObjet}) {
  
    const [libelle, setLibelle] = useState('')
    const [poids_kg, setPoids_kg] = useState('')
    const [etat_arrivee, setEtat_arrivee] = useState('')
    const [statut, setStatut] = useState('')
    const [prix, setPrix] = useState('')
    const [date_mise_rayon, setDate_mise_rayon] = useState('')
    const [categorie_id, setCategorie_id] = useState('')


    const {id} = useParams()

    async function handleSubmit(e) {
        e.preventDefault()

        const nouveauObjet = {
            libelle,
            poids_kg: parseFloat(poids_kg.replace(',', '.')),
            etat_arrivee,
            statut,
            prix: parseFloat(prix.replace(',', '.')),
            date_mise_rayon: date_mise_rayon || undefined,
            categorie_id: parseInt(categorie_id),
            depot_id: parseInt(id)
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
            setCategorie_id('')

            onAjouteObjet()
            } else {
            const erreur = await objetReponse.json()
            alert(erreur.erreur)

    
        }
    }

        function gererNombre(e, setter) {
        let valeur = e.target.value;

        // Autorise uniquement les chiffres et la virgule
        valeur = valeur.replace(/[^0-9,]/g, '');

        // Une seule virgule
        const parties = valeur.split(',');

        if (parties.length > 2) {
            valeur = parties[0] + ',' + parties.slice(1).join('');
        }

        const nouvellesParties = valeur.split(',');

        // Maximum 2 chiffres après la virgule
        if (nouvellesParties[1]) {
            nouvellesParties[1] =
                nouvellesParties[1].slice(0, 2);
        }

        setter(nouvellesParties.join(','));
    }

    return (
     <form
            className="formulaire-objet"
            onSubmit={handleSubmit}
        >
            <Categorie setCategorie={setCategorie}/>
            <div className="ligne-formulaire">

                {/* DÉSIGNATION */}
                <div className="groupe-champ groupe-libelle">
                    <label>DÉSIGNATION DE L'OBJET</label>

                    <input
                        className="champ-objet"
                        type="text"
                        placeholder="Ex : Chaise en bois"
                        value={libelle}
                        onChange={(e) =>
                            setLibelle(e.target.value)
                        }
                        required
                    />
                </div>


                {/* CATÉGORIE */}
                <div className="groupe-champ">
                    <label>CATÉGORIE</label>

                    <select
                        className="champ-objet"
                        value={categorie_id}
                        onChange={(e) =>
                            setCategorie_id(e.target.value)
                        }
                        required
                    >
                        <option value="">
                            Sélectionner
                        </option>

                        {categorie.map((c) => (
                            <option
                                key={c.id}
                                value={c.id}
                            >
                                {c.libelle}
                            </option>
                        ))}
                    </select>
                </div>


                {/* POIDS */}
                <div className="groupe-champ">
                    <label>POIDS (KG)</label>

                    <input
                        className="champ-objet"
                        type="text"
                        inputMode="decimal"
                        placeholder="0,00"
                        value={poids_kg}
                        onChange={(e) =>
                            gererNombre(
                                e,
                                setPoids_kg
                            )
                        }
                        required
                    />
                </div>


                {/* PRIX */}
                <div className="groupe-champ">
                    <label>PRIX ESTIMÉ (€)</label>

                    <input
                        className="champ-objet"
                        type="text"
                        inputMode="decimal"
                        placeholder="0,00"
                        value={prix}
                        onChange={(e) =>
                            gererNombre(
                                e,
                                setPrix
                            )
                        }
                        required
                    />
                </div>

            </div>


            <div className="ligne-formulaire">

                {/* ÉTAT À L'ARRIVÉE */}
                <div className="groupe-champ">
                    <label>ÉTAT À L'ARRIVÉE</label>

                    <select
                        className="champ-objet"
                        value={etat_arrivee}
                        onChange={(e) =>
                            setEtat_arrivee(e.target.value)
                        }
                        required
                    >
                        <option value="">
                            Sélectionner
                        </option>

                        <option value="bon_etat">
                            Bon état
                        </option>

                        <option value="a_reparer">
                            À réparer
                        </option>

                        <option value="hors_service">
                            Hors service
                        </option>
                    </select>
                </div>


                {/* STATUT */}
                <div className="groupe-champ">
                    <label>STATUT</label>

                    <select
                        className="champ-objet"
                        value={statut}
                        onChange={(e) =>
                            setStatut(e.target.value)
                        }
                        required
                    >
                        <option value="">
                            Sélectionner
                        </option>

                        <option value="arrive">
                            Arrivé
                        </option>

                        <option value="en_reparation">
                            En réparation
                        </option>

                        <option value="en_rayon">
                            En rayon
                        </option>

                        <option value="vendu">
                            Vendu
                        </option>

                        <option value="recycle">
                            Recyclé
                        </option>
                    </select>
                </div>


                {/* DATE */}
                <div className="groupe-champ">
                    <label>DATE DE MISE EN RAYON</label>

                    <input
                        className="champ-objet"
                        type="date"
                        value={date_mise_rayon}
                        onChange={(e) =>
                            setDate_mise_rayon(
                                e.target.value
                            )
                        }
                    />
                </div>

            </div>


            {/* BOUTON */}
            <div className="actions-formulaire">

                <button
                    className="btn-valider-objet"
                    type="submit"
                >
                    Ajouter l'objet
                </button>

            </div>

    </form>

    )  
}

export default FormulaireObjet