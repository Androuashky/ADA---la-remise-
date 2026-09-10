import { useState, useEffect } from 'react';


function DepotsCarte() {

    const [depotcarte, setDepotCarte] = useState([])
    
    useEffect(()=> {

        async function ChargerCarte () {
            const reponse = await fetch('http://localhost:3000/api/depots/6')
            const donnees = await reponse.json()
            setDepotCarte(donnees)
        }
        ChargerCarte()
    }, [])

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
                            #DEP-{String(depot.id).padStart(3, '0')}
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

export default DepotsCarte