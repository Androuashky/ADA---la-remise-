import { useEffect, useState } from "react";

function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/stats")
            .then((response) => response.json())
            .then((data) => {
                setStats(data);
            });
    }, []);

    return (
        <div>
            <h1>Tableau de bord</h1>

            <h2>Objets par statut</h2>

            {stats?.objets_par_statut.map((statut) => (
                <p key={statut.statut}>
                    {statut.statut} : {statut.nombre_objets}
                </p>
            ))}

            <h2>Poids total reçu</h2>

            <p>
                {stats?.poids_total_recu_kg} kg
            </p>

            <h2>Objets en rayon</h2>

            <p>
                {stats?.nombre_objets_en_rayon}
            </p>
        </div>
    );
}

export default Dashboard;