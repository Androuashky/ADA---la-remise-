import { useNavigate, useLocation } from 'react-router'
import './BoutonNvDepot.css'

function BoutonNvDepot(){
    const navigate = useNavigate()
    const location = useLocation()

    return(
        <>
        <button
            className="btn-nouveau-depot btn-secondaire"
            onClick={() => {navigate ('/nvdepots')}}
            disabled={location.pathname === '/nvdepots'}
        >
            Créer un nouveau dépôt
        </button>
        </>
    )
}

export default BoutonNvDepot