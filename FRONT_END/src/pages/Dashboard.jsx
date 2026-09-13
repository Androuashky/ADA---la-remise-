import { useEffect, useState } from "react";
import "./App.css";

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
        <div className="dashboard-page">

            <div className="dashboard-container">

                <header className="dashboard-header">
                    <div>
                        <h1>Tableau de bord</h1>
                        <p>Vue d'ensemble de l'activité de la ressourcerie.</p>
                    </div>
                </header>

                <div className="stats-cards">

                    <div className="stat-card">
                        <span className="stat-title">OBJETS EN RAYON</span>
                        <strong>
                            {stats?.nombre_objets_en_rayon}
                        </strong>
                        <span className="stat-icon">📦</span>
                    </div>

                    <div className="stat-card">
                        <span className="stat-title">POIDS TOTAL REÇU</span>
                        <strong>
                            {stats?.poids_total_recu_kg} kg
                        </strong>
                        <span className="stat-icon">⚖️</span>
                    </div>

                    <div className="stat-card">
                        <span className="stat-title">TOTAL D'OBJETS</span>
                        <strong>
                            {stats?.objets_par_statut.reduce(
                                (total, statut) => total + statut.nombre_objets,
                                0
                            )}
                        </strong>
                        <span className="stat-icon">✓</span>
                    </div>

                </div>

                <section className="status-section">

                    <h2>Objets par statut</h2>

                    <div className="status-list">

                        {stats?.objets_par_statut.map((statut) => (
                            <div
                                className="status-card"
                                key={statut.statut}
                            >
                                <span>{statut.statut}</span>
                                <strong>{statut.nombre_objets}</strong>
                            </div>
                        ))}

                    </div>

                </section>

                <section className="consultation-section">

                    <h2>Que voulez-vous consulter ?</h2>

                    <div className="consultation-list">

                        <div className="consultation-card objets-card">

                            <div className="consultation-top">

                                <div className="consultation-title">
                                    <span>📦</span>
                                    <h3>Gestion des objets</h3>
                                </div>

                                <span className="consultation-arrow">→</span>

                            </div>

                            <p>
                                Consultez l'inventaire, modifiez les prix,
                                changez les statuts (en rayon, vendu,
                                recyclé) et filtrez par catégorie.
                            </p>

                        </div>

                        <div className="consultation-card depots-card">

                            <div className="consultation-top">

                                <div className="consultation-title">
                                    <span>🏠</span>
                                    <h3>Gestion des dépôts</h3>
                                </div>

                                <span className="consultation-arrow">→</span>

                            </div>

                            <p>
                                Suivez les lots apportés par les donateurs,
                                créez de nouveaux reçus de dépôt et
                                attribuez les objets aux bénévoles.
                            </p>

                        </div>

                    </div>

                </section>

            </div>

        </div>
    );
}

export default Dashboard;