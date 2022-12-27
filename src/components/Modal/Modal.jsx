import React from 'react';
import '../Modal/Modal.css'

const Modal = ({ open, onClose, enteredPass }) => {

    function getVal() {
        let val = document.querySelector('input').value;
        enteredPass(val)
      }


    if (!open) return null;
    return (
        <div onClick={onClose} className='overlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='modalContainer'>
                <div className='modalRight'>
                    <p className='closeBtn' onClick={onClose}>X</p>
                    <div className='content'>
                        <p> Please confirm your password</p>
                            <input id='confPass' type="password" name='pass'  />
                    </div>
                    <div className='btnContainer'>
                        <button className='btnPrimary' onClick={getVal} >
                            <span className='bold'>Go Ahead</span>
                        </button>
                        <button className='btnOutline' onClick={onClose}>
                            <span className='bold'>Go Back</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;