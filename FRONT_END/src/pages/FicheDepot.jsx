import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import './FicheDepot.css'
import FormulaireObjet from './NouveauObjet';



function FicheDepot({ categorie, setCategorie }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [depotcarte, setDepotCarte] = useState([])
    const [afficherFormulaire, setAfficherFormulaire] = useState(false)
    const [rafraichir, setRafraichir] = useState(0)
    
    useEffect(()=> {

        async function ChargerCarte () {
            const reponse = await fetch(`http://localhost:3000/api/depots/${id}`)
            const donnees = await reponse.json()
            setDepotCarte(Array.isArray(donnees) ? donnees[0] : donnees)
        }
        ChargerCarte()
    }, [id, rafraichir])

    if (depotcarte.length === 0) { 
        return ( 
        <div className="fiche-depot-loading"> 
        Chargement... 
        </div> ) 
        }
   

    return (
        <>
       <div className="fiche-depot-page">

            <div
                className="lien-retour"
                onClick={() => navigate('/depots')}
            >
                ← Retour à la liste des dépôts
            </div>


            <div className="entete-depot">

                <h1>Dépôt #{id}</h1>

            </div>


            <p className="date-depot">

                Enregistré le {depotcarte.date_depot}

            </p>


            <div className="cartes-info">


                <div className="carte">

                    <span className="carte-label">
                        INFORMATIONS DONATEUR
                    </span>

                    <p className="carte-titre">

                        {depotcarte.personne_nom} {depotcarte.personne_prenom}

                    </p>

                    <p className="carte-sous-texte">

                        {depotcarte.personne_telephone}

                    </p>

                </div>


                <div className="carte">

                    <span className="carte-label">
                        ESTIMATION TOTALE
                    </span>

                    <p className="carte-titre">

                        {depotcarte.liste_objet_prix
                            .reduce((total, prix) => total + (prix || 0), 0)
                            .toFixed(2)
                            .replace('.', ',')
                        } €

                    </p>

                    <p className="carte-sous-texte">

                        Valeur potentielle pour la ressourcerie

                    </p>

                </div>


            </div>


            <div className="carte-tableau">


                <div className="tableau-entete">

                    <h2>
                        Articles contenus dans ce dépôt
                    </h2>

                    <span className="nombre-articles">

                        {depotcarte.liste_objet.length} article
                        {depotcarte.liste_objet.length > 1 ? 's' : ''}
                        {' '}
                        référencé
                        {depotcarte.liste_objet.length > 1 ? 's' : ''}

                    </span>

                </div>


                <table className="table-container">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>ARTICLE</th>

                            <th>PRIX ESTIMÉ</th>

                            <th>ACTIONS</th>

                        </tr>

                    </thead>


                    <tbody>

                        {depotcarte.liste_objet.map((objet, index) => (

                            <tr key={index}>

                                <td>
                                    #OBJ-{String(index + 1).padStart(3, '0')}
                                </td>


                                <td className="nom-objet">

                                    {objet}

                                </td>


                                <td>

                                    {depotcarte.liste_objet_prix[index] !== null
                                        ? `${depotcarte.liste_objet_prix[index]} €`
                                        : '—'
                                    }

                                </td>


                                <td>

                                    <button
                                        className="btn-voir-fiche"
                                        onClick={() => {
                                            // navigation vers la fiche objet plus tard
                                        }}
                                    >
                                        👁 Voir la fiche
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>


            </div>


            {!afficherFormulaire && (

                <button
                    className="btn-ajouter-objet"
                    onClick={() => setAfficherFormulaire(true)}
                >
                    Ajouter un objet
                </button>

            )}


            {afficherFormulaire && (

                <>

                    <button
                        className="btn-annuler-objet"
                        onClick={() => setAfficherFormulaire(false)}
                    >
                        Annuler
                    </button>


                    <FormulaireObjet
                        categorie={categorie}
                        setCategorie={setCategorie}
                        onAjouteObjet={() => {

                            setAfficherFormulaire(false)

                            setRafraichir(rafraichir + 1)

                        }}
                    />

                </>

            )}


        </div>
    </>
    )

}

export default FicheDepot