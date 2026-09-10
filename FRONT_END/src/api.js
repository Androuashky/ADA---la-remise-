// src/api.js — le seul endroit qui parle au backend
//

const BASE_URL = 'http://localhost:3000/api';

// Fonction générique : un fetch + gestion d'erreur unique
async function requete(url, options = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const donnees = await response.json();

  if (!response.ok) {
    throw new Error(donnees.error || `Erreur ${response.status}`);
  }

  return donnees;
}

// Les fonctions dédiées (une par route du back)

// ---------- Objets ----------
export const getObjets = (filtres = {}) => {
  // On construit la querystring à partir des filtres remplis
  const params = new URLSearchParams();
  if (filtres.statut) params.set('statut', filtres.statut);
  if (filtres.categorie_id) params.set('categorie_id', filtres.categorie_id);

  const qs = params.toString();
  return requete(`/objets${qs ? `?${qs}` : ''}`);
};

export const getObjet = (id) => requete(`/objets/${id}`);

export const changerStatut = (id, { statut, prix }) =>
  requete(`/objets/${id}/statut`, {
    method: 'PATCH',
    body: JSON.stringify({ statut, prix }),
  });

// ---------- Catégories & statuts (pour les filtres) ----------
export const getCategories = () => requete('/categories');
export const getStatuts = () => requete('/statuts');

// ---------- Dépôts ----------
export const getDepot = (id) => requete(`/depots/${id}`);
export const creerDepot = (depot) =>
  requete('/depots', {
    method: 'POST',
    body: JSON.stringify(depot),
  });
export const ajouterObjetAuDepot = (depotId, objet) =>
  requete(`/depots/${depotId}/objets`, {
    method: 'POST',
    body: JSON.stringify(objet),
  });

// ---------- Personnes ----------
export const getPersonnes = () => requete('/personnes');

// ---------- Bénévoles ----------
export const getBenevoles = () => requete('/benevoles');

// ---------- Stats ----------
export const getStatsParStatut = () => requete('/stats/par-statut');
export const getStatsPoidsTotal = () => requete('/stats/poids-total');
export const getStatsEnRayon = () => requete('/stats/en-rayon');

// Règle d'équipe : dès que quelqu'un ajoute une route au back, il ajoute aussi sa fonction dans api.js. C'est le contrat central