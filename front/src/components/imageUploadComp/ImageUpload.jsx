import { useState } from 'react';
import './ImageUpload.css';
import useAxiosPrivate from '../../hooks/use-axios-private';
import defautFish from '../../img/defaultFish.png';

export default function ImageUpload({ item, setShowModal }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [errMsg, setErrMsg] = useState('');

    const axiosPrivate = useAxiosPrivate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        //Gerar uma URL de pré-visualização para mostrar a imagem selecionada
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewUrl(previewUrl);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert('Por favior, selecione uma imagem para enviar.');
            return;
        }

        //Cria um objeto formData para enviar a imagem
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axiosPrivate.post(`/especies/${item?.id}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setShowModal(false);
            console.log('Resposta do servidor:', response.data);
        } catch (err) {
            setErrMsg('Erro ao fazer upload de imagem');
            console.error('Erro ao enviar a imagem', err);
        }
    };

    return (
        <div>
            <img src={defautFish} className='modal-icon' alt="ícone de peixes" />
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <h2 className="modal-title">Alterar imagem</h2>
            <p>Adicione ou altere a imagem da espécie selecionada!</p>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept='image/*' />
                <button type='submit' className='modal-confirm-button'>Enviar Imagem</button>
            </form>
            {previewUrl && <img src={previewUrl} alt='pré-visualização' className='preview-image' />}
        </div>
    );
}