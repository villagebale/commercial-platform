import './directory-item.styles.scss'
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({directory}) => {
    const {id, title, imageUrl} = directory;
    const navigate = useNavigate(); 
    const goToCheckoutHandler = () => {
        navigate(`shop/${title}`)
    }
    
    return (
        <div className="directory-container" id={id}>
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`
            }} />
            <div className="directory-body-container" onClick={goToCheckoutHandler}>
                <h2>{title}</h2>
                <p>Shop Now!</p>
            </div>
        </div>
        
    )
}

export default DirectoryItem;