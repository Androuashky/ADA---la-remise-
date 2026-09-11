import './StatutBadge.css';

export const label_statut = {
  arrive: "Arrivé",
  en_reparation: "En réparation",
  en_rayon: "En rayon",
  recycle: "Recyclé",
  vendu: "Vendu",
};

export default function StatutBadge({ statut }) {

  const label = label_statut[statut] || statut;

  const classeCouleur = label_statut[statut] ? statut : 'defaut';

  return (
    <span className={`statut-badge ${classeCouleur}`}>
      {label}
    </span>
  );
}