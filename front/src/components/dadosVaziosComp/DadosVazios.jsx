import './DadosVazios.css';

export default function DadosVazios({ img, string }) {
    return (
        <div className='sem-dados-container'>
            <img className='sem-dados-img' src={img} alt='ícone de dados zerados' />
            <p>Você ainda não cadastrou nenhum(a) {string}.
                Adicione um(a) novo(a) clicando em <b>Adicionar {string}</b>.
            </p>
        </div>
    )
}