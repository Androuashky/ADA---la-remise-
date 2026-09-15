import './Liste.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import StatutBadge from '../composants/StatutBadge';
import { label_statut } from '../utils/labels';

const api_url = "http://localhost:3000/api";

export default function ListeObjets() {
  // États locaux : liste d'objets et valeurs sélectionnées
  const [objets, setObjets] = useState([]);
  const [categorieFiltre, setCategorieFiltre] = useState('');
  const [statutFiltre, setStatutFiltre] = useState('');

  // Chargement initial des objets depuis l'API
  useEffect(() => {
    async function chargerObjets() {
      try {
        const reponse = await fetch(`${api_url}/objets`);
        const donnees = await reponse.json();
        setObjets(donnees.resultats || donnees);
      } catch (err) {
        console.error('Erreur lors du chargement des objets :', err);
      }
    }

    chargerObjets();
  }, []);

  // On récupère les catégories (map) en recréant une collection de valeurs uniques/élimine les doublons (new Set)
  // et on nettoie les valeurs falsy (null, undefined, "", etc.)
  const categoriesUniques = [
    ...new Set(objets.map((o) => o.categorie_libelle).filter(Boolean))
  ];

  // Pareil pour les statuts
  const statutsUniques = [
    ...new Set(objets.map((o) => o.statut).filter(Boolean))
  ];

  // On filtre le tableau : un objet est conservé uniquement si toutes les conditions (et) sont remplies
  const objetsFiltres = objets.filter((objet) => {
    // Vrai si le filtre catégorie est sur "Toutes" (ou vide) ou si la catégorie de l'objet correspond
    const matchCategorie =
      categorieFiltre === '' || objet.categorie_libelle === categorieFiltre;

    // Pareil pour le statut
    const matchStatut =
      statutFiltre === '' || objet.statut === statutFiltre;

    // L'objet est conservé si matchCategorie et matchStatut sont tous les deux vrais
    return matchCategorie && matchStatut;
  });

  return (
    <div className="main-container">
      <h2 className="page-title">Gestion des objets</h2>
      <p>Gérez et suivez le statut de tous les objets enregistrés dans la Remise.</p>

      {/* Conteneur du tableau */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><div className="th-filter">Id</div></th>
              <th><div className="th-filter">Nom de l'objet</div></th>
              
              {/* Filtre Catégorie */}
              <th>
                <div className="th-filter">
                  Catégorie
                  <select
                    className="select-th"
                    value={categorieFiltre}
                    onChange={(e) => setCategorieFiltre(e.target.value)}
                  >
                    <option value="">Toutes</option>
                    {categoriesUniques.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </th>

              {/* Filtre Statut */}
              <th>
                <div className="th-filter">
                  Statut
                  <select
                    className="select-th"
                    value={statutFiltre}
                    onChange={(e) => setStatutFiltre(e.target.value)}
                  >
                    <option value="">Tous</option>
                    {statutsUniques.map((statut) => (
                      <option key={statut} value={statut}>{label_statut[statut] || statut}</option>
                    ))}
                  </select>
                </div>
              </th>

              <th><div className="th-filter">Actions</div></th>
            </tr>
          </thead>
          <tbody>
            {objetsFiltres.length > 0 ? (
              objetsFiltres.map((objet) => (
                <tr key={objet.id}>
                  <td>#OBJ-{String(objet.id).padStart(3, '0')}</td>
                  <td><b>{objet.libelle}</b></td>
                  <td>{objet.categorie_libelle}</td>
                  <td><StatutBadge statut={objet.statut} /></td>
                  <td>
                    <Link to={`/objets/${objet.id}`} className="btn-vignette">Voir la fiche</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: '#6b7280', padding: '24px' }}>
                  Aucun objet ne correspond à cette combinaison de filtres.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                {objetsFiltres.length} {objetsFiltres.length > 1 ? 'objets trouvés' : 'objet trouvé'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}