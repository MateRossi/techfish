import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import './Modal.css';

function Modal({ onClose, children, actionBar }) {
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

    return ReactDOM.createPortal(
        <div>
            <div onClick={onClose} className='modal-background'></div>
            <div className='modal'>
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