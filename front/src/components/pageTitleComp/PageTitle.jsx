import '../../icons/PerfilIcon';
import './PageTitle.css';
import tanque from '../../img/tanque.png';

function PageTitle({ title, description }) {
    return (
        <div className='page-title-container' >
            <img src={tanque} className='page-title-icon' alt="" />
            <div className='page-title-texts-container'>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default PageTitle;