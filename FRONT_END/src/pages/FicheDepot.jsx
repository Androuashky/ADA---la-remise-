import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import './FicheDepot.css'


function FicheDepot() {
    const { id } = useParams();
    const [depotcarte, setDepotCarte] = useState([])
    
    useEffect(()=> {

        async function ChargerCarte () {
            const reponse = await fetch(`http://localhost:3000/api/depots/${id}`)
            const donnees = await reponse.json()
            setDepotCarte(donnees)
        }
        ChargerCarte()
    }, [id])

    return (
        <div className="table-container">

        <table>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TYPE</th>
                    <th>DONNATEUR</th>
                    <th>LISTE OBJETS</th>
                    <th>LISTE PRIX</th>
                </tr>
            </thead>

            <tbody>

                {depotcarte.map((depot) => (

                    <tr key={depot.id}>

                        <td>
                            Fiche du dépôt {id}
                        </td>

                        <td>
                            {depot.date_depot}
                        </td>

                        <td>
                            {depot.type}
                        </td>

                        <td className="donateur">
                            {depot.personne_nom} {depot.personne_prenom}
                        </td>

                        <td>
                            {depot.liste_objet.map((objet, index) => (
                                <div key={index}>
                                    {objet}
                                </div>
                            ))}
                        </td>

                        <td>
                            {depot.liste_objet_prix.map((prix, index) => (
                                <div key={index}>
                                    {prix !== null ? `${prix} €` : '—'}
                                </div>
                            ))}
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>
    )

}

export default FicheDepot