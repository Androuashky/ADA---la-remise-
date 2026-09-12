import './FicheObjet.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import StatutBadge from '../composants/StatutBadge';

const api_url = "http://localhost:3000/api";

export default function FicheObjet() {
  const { id } = useParams();

  const [objet, setObjet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function chargerObjet() {
      try {
        const reponse = await fetch(`${api_url}/objets/${id}`);
        const donnees = await reponse.json();
        setObjet(donnees.resultat || donnees);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'objet :", err);
      } finally {
        setLoading(false);
      }
    }

    chargerObjet();
  }, [id]);

  if (!objet) return <p>Objet introuvable.</p>;

  return (
    <div className="main-container">
      <div className="fiche-container">
        <Link to="/objets" className="btn-retour">
          ← Retour à la liste d'objets
        </Link>

        <div className="fiche-header">
          <div className="header-title-row">
            <h1 className="page-title">{objet.libelle}</h1>
            <StatutBadge statut={objet.statut} />
          </div>
          <p className="header-subtitle">
            Identifiant : #{objet.id} - Ajouté le {(objet.date_depot)}
          </p>
        </div>

        <div className="fiche-content">
          <div className="left-column">
            <div className="card">
              <h3>Caractéristique de l'article</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Catégorie</span>
                  <span className="info-value">{objet.categorie_libelle || '-'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Poids</span>
                  <span className="info-value">
                    {objet.poids_kg ? `${objet.poids_kg} kg` : '-'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">État d'arrivé</span>
                  <span className="info-value">{objet.etat || 'Bon état'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Prix</span>
                  <span className="info-value">
                    {objet.prix ? `${objet.prix} €` : '-'}
                  </span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Dépôt correspondant</h3>
              <div className="depot-user-info">
                <div className="user-details">
                  <span className="user-name">
                    {objet.personne_prenom} {objet.personne_nom}
                  </span>
                  <span className="depot-link">
                    Dépôt lié : <Link to={`/depots/${objet.depot_id}`}>#{objet.depot_id}</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card">
              <h3>Changer le statut</h3>
              <div className="form-group">
                <label htmlFor="select-statut">Nouveau statut</label>
                <select id="select-statut" className="select-statut">
                  <option value="en_rayon">En rayon</option>
                  <option value="reserve">En réserve</option>
                  <option value="vendu">Vendu</option>
                </select>
              </div>
              <button className="btn-update-statut" disabled>
                Mettre à jour le statut
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> // 2. Fermeture de la div main-container
  );
}