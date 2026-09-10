// src/pages/ListeObjets.jsx — domaine A : écran « Liste des objets »
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getObjets, getCategories, getStatuts } from '../api.js';

export default function ListeObjets() {
  // --- 1. Les états ---
  const [objets, setObjets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuts, setStatuts] = useState([]);
  const [filtres, setFiltres] = useState({});
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // --- 2. Chargement des options des filtres ---
  useEffect(() => {
    (async () => {
      try {
        const [cats, sts] = await Promise.all([getCategories(), getStatuts()]);
        setCategories(cats);
        setStatuts(sts);
      } catch (e) {
        setErreur(e.message);
      }
    })();
  }, []);

  // --- 3. Chargement des objets (rejoué à chaque changement de filtres) ---
  useEffect(() => {
    (async () => {
      setChargement(true);
      try {
        const resultat = await getObjets(filtres);
        setObjets(resultat);
        setErreur(null);
      } catch (e) {
        setErreur(e.message);
      } finally {
        setChargement(false);
      }
    })();
  }, [filtres]);

  // --- 4. Le rendu, en 4 cas ---
  if (chargement) {
    return <p>Chargement…</p>;
  }

  if (erreur) {
    return (
      <div>
        <p style={{ color: 'red' }}>Erreur : {erreur}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Liste des objets</h1>

      {/* Filtres */}
      <div>
        <select
          value={filtres.statut ?? ''}
          onChange={(e) => setFiltres({ ...filtres, statut: e.target.value || undefined })}
        >
          <option value="">Tous les statuts</option>
          {statuts.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={filtres.categorie_id ?? ''}
          onChange={(e) =>
            setFiltres({ ...filtres, categorie_id: e.target.value ? Number(e.target.value) : undefined })
          }
        >
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.libelle}
            </option>
          ))}
        </select>
      </div>

      {/* Liste */}
      {objets.length === 0 ? (
        <p>Aucun objet ne correspond à ces filtres.</p>
      ) : (
        <ul>
          {objets.map((objet) => (
            <li key={objet.id}>
              <Link to={`/objets/${objet.id}`}>{objet.libelle}</Link> — {objet.statut}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}