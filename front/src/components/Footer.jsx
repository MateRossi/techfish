import logoContornoBranco from '../img/logoContornoBranco.png';
import './Footer.css';

function Footer() {
    return (
        <footer className="Footer">
            <img src={logoContornoBranco} alt="Logo da TecFish" />
            <p>Rua Bernardo Mascarenhas, 1283 <br/>
                Bairro Fábrica <br />
                Juiz de Fora - MG
            </p>
        </footer>
    );
}

export default Footer;