import { useState } from 'react';
import './ImageUpload.css';
import useAxiosPrivate from '../../hooks/use-axios-private';

export default function ImageUpload({ id }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

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
            const response = await axiosPrivate.post(`/especies/${id}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUploadStatus('Upload realizado com sucesso!');
            console.log('Resposta do servidor:', response.data);
        } catch (err) {
            setUploadStatus('Erro no upload da imagem.');
            console.error('Erro ao enviar a imagem', err);
        }
    };

    return (
        <div>
            <h2>Upload de imagem</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept='image/*' />
                <button type='submit'>Enviar Imagem</button>
            </form>

            {previewUrl && <img src={previewUrl} alt='pré-visualização' style={{ width: '200px', height: 'auto' }} />}
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
}