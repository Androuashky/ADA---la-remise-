import { useNavigate } from 'react-router'
import './BoutonNvDepot.css'

function BoutonNvDepot(){
    const navigate = useNavigate()

    return(
        <>
        <button className="btn-nouveau-depot" onClick={() => {navigate ('/nvdepots')}}>
            Créer un nouveau dépôt
        </button>
        </>
    )
}

export default BoutonNvDepot