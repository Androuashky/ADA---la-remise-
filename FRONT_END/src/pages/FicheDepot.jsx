import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import '../composants/Fiche.css'
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
        <div className="loading-placeholder"> 
        Chargement... 
        </div> ) 
        }
   

    return (
        <>
       <div className="fiche-page">

            <div
                className="btn-retour"
                onClick={() => navigate('/depots')}
            >
                ← Retour à la liste des dépôts
            </div>


            <div className="fiche-header">

                <h1 className="page-title">Dépôt #{String(id).padStart(3, '0')}</h1>

                <p className="fiche-subtitle">

                    Enregistré le {depotcarte.date_depot}

                </p>

            </div>


            <div className="cartes-info">


                <div className="card">

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


                <div className="card">

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

                <div className="table-container">
                    <table>

                    <thead>

                        <tr>
                            <td colSpan={4} className="tableau-entete">
                                    <h3>
                                        Articles contenus dans ce dépôt
                                    </h3>
                            </td>
                        </tr>

                        <tr>

                            <th>ID</th>

                            <th>ARTICLE</th>

                            <th>PRIX ESTIMÉ</th>

                            <th>ACTIONS</th>

                        </tr>

                    </thead>


                    <tbody>

                        {depotcarte.liste_objet.map((objet, index) => {
                            const objetId = depotcarte.liste_objet_id[index];
                            return (
                                <tr key={objetId}>
                                    <td>
                                        #OBJ-{String(objetId).padStart(3, '0')}
                                    </td>

                                    <td className="nom-objet">
                                        {objet}
                                    </td>

                                    <td>
                                        {depotcarte.liste_objet_prix[index] !== null
                                            ? `${depotcarte.liste_objet_prix[index]} €`
                                            : '—'}
                                    </td>

                                    <td>
                                        <button
                                            className="btn-vignette"
                                            onClick={() => {
                                                navigate(`/objets/${objetId}`);
                                            }}
                                        >
                                            Voir la fiche
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan={4}>
                                {depotcarte.liste_objet.length} article
                                {depotcarte.liste_objet.length > 1 ? 's' : ''}
                                {' '}
                                référencé
                                {depotcarte.liste_objet.length > 1 ? 's' : ''}
                            </td>
                        </tr>
                    </tfoot>

                </table>
                </div>


            </div>


            {!afficherFormulaire && (

                <button
                    className="btn-primaire btn-ajouter-objet"
                    onClick={() => setAfficherFormulaire(true)}
                >
                    Ajouter un objet
                </button>

            )}


            {afficherFormulaire && (

                <FormulaireObjet
                    categorie={categorie}
                    setCategorie={setCategorie}
                    onAjouteObjet={() => {
                        setAfficherFormulaire(false)
                        setRafraichir(rafraichir + 1)
                    }}
                    onAnnuler={() => setAfficherFormulaire(false)}
                />

            )}


        </div>
    </>
    )

}

export default FicheDepot