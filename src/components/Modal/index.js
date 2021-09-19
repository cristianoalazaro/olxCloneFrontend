import React, { useState } from 'react';

import {ModalContainer} from '../../components/MainComponents';
import {PageArea} from './styled';
export default function Modal (props) {
    const [name, setName] = useState('');
    const [email, seEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('');

    const handleClose = () => {
        props.onClose();
    }

    document.addEventListener('keydown',(event)=>{
        if (event.keyCode == 27){
            handleClose();
        }
    })

    return (
        <ModalContainer>
            <PageArea>
                <div className='main'>
                    <div className='title'>
                        <h1>ALTERAÇÃO DE DADOS CADASTRAIS</h1>
                        <hr />
                    </div>
                    <div className='body'>
                        <div className='fields'>
                            <label className='area'>
                                <div className='area-titulo'>Nome</div>
                                <div className='area-input'>
                                    <input type='text' name='name' value={props.name} />
                                    <br /><br />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area-titulo'>E-mail</div>
                                <div className='area-input'>
                                    <input type='email' name='email' value={props.email} />
                                    <br /><br />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area-titulo'>Estado</div>
                                <div className='area-input'>
                                    <select className='select' name='state' >
                                        <option>{props.state}</option>
                                    </select>
                                </div>
                            </label>
                        </div>
                        <div className='buttons'>
                            <button>Salvar</button>
                            <button onClick={handleClose}>X</button>
                        </div>
                    </div>    
                </div>
            </PageArea>
        </ModalContainer>
    )
}