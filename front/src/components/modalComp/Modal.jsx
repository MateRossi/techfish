import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import './Modal.css';

function Modal({ onClose, children, actionBar, width='640px', height='380px' }) {
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

    return ReactDOM.createPortal(
        <div onClick={(e) => e.stopPropagation()}>
            <div onClick={onClose} className='modal-background'></div>
            <div className='modal' style={{ width, height }}>
                <div className='modal-content'>
                    {children}
                    <div className='modal-options'>
                        {actionBar}
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector('.modal-container')
    );
}

export default Modal;