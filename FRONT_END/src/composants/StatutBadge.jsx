import './StatutBadge.css';
import { label_statut } from './labels';

export default function StatutBadge({ statut }) {

  const label = label_statut[statut] || statut;

  const classeCouleur = label_statut[statut] ? statut : 'defaut';

  return (
    <span className={`statut-badge ${classeCouleur}`}>
      {label}
    </span>
  );
}