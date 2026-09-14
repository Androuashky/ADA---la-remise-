import '../composants/Fiche.css';
import './FicheObjet.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import StatutBadge from '../composants/StatutBadge';
import { label_statut, label_etat } from '../composants/labels';


const api_url = "http://localhost:3000/api";

export default function FicheObjet() {
  const { id } = useParams();

  const [objet, setObjet] = useState(null);
  const [statuts, setStatuts] = useState([]);
  const [statutSelectionne, setStatutSelectionne] = useState('');
  const [message, setMessage] = useState(null);

  // 1. Chargement de l'objet
  useEffect(() => {
    async function chargerObjet() {
      try {
        const reponse = await fetch(`${api_url}/objets/${id}`);
        const donnees = await reponse.json();
        const objetCharge = donnees.resultat || donnees;
        setObjet(objetCharge);
        setStatutSelectionne(objetCharge.statut);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'objet :", err);
      }
    }
    chargerObjet();
  }, [id]);

  // 2. Chargement de la liste des statuts
  useEffect(() => {
    async function chargerStatuts() {
      const reponse = await fetch(`${api_url}/statuts`);
      if (!reponse.ok) throw new Error("Impossible de charger les statuts.");
      setStatuts(await reponse.json());
    }
    chargerStatuts().catch(console.error);
  }, []);

  async function modifierStatut() {
  try {
    setMessage(null);
    const reponse = await fetch(`${api_url}/objets/${id}/statut`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut: statutSelectionne }),
    });
    if (!reponse.ok) {
      setMessage({ type: 'erreur', texte: "Mise à jour impossible." });
      return;
    }
    const misAJour = await reponse.json();
    setObjet({ ...objet, statut: misAJour.statut });
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    setMessage({
      type: 'erreur',
      texte: "Impossible de joindre le serveur.",
    });
  }
}

  if (!objet) return <p>Objet introuvable.</p>;

  return (
    <div className="main-container">
      <div className="fiche-page">
        <Link to="/objets" className="btn-retour">
          ← Retour à la liste d'objets
        </Link>

        <div className="fiche-header">
          <div className="fiche-title-row">
            <h1 className="page-title">{objet.libelle}</h1>
            <StatutBadge statut={objet.statut} />
          </div>
          <p className="fiche-subtitle">
            Identifiant : #{objet.id} - Ajouté le {new Date(objet.date_depot).toLocaleDateString('fr-FR')}
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
                  <span className="info-value">{label_etat[objet.etat_arrivee] || 'Non renseigné'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Prix</span>
                  <span className="info-value">
                    {objet.prix ? `${objet.prix} €` : '-'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Mise en rayon</span>
                  <span className="info-value">
                    {objet.date_mise_rayon
                      ? new Date(objet.date_mise_rayon).toLocaleDateString('fr-FR')
                      : '-'}
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
                    Dépôt lié : <Link to={`/depots/${objet.depot_id}`} className="btn-vignette">#{objet.depot_id}</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card">
              <h3>Changer le statut</h3>
              <div className="form-group">
                <label htmlFor="select-statut" className='info-label'>Nouveau statut</label>
                <select
                  id="select-statut"
                  className="champ-form"
                  value={statutSelectionne}
                  onChange={(e) => {
                    setStatutSelectionne(e.target.value);
                    setMessage(null);
                  }}
                >
                  {statuts.map((statut) => (
                    <option key={statut} value={statut}>
                      {label_statut[statut] || statut}
                    </option>
                  ))}
                </select>
              </div>
                  <button
                    className="btn-primaire btn-full"
                    onClick={modifierStatut}
                    disabled={statutSelectionne === objet.statut}
                  >
                    Mettre à jour le statut
                  </button>
                  {message && (
                    <p className={`message message-${message.type}`}>{message.texte}</p>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}