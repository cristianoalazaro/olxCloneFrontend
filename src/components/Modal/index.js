import React, { useEffect } from 'react';

import {ModalContainer} from '../../components/MainComponents';
import {PageArea} from './styled';
export default function Modal (props) {

    useEffect(() => {
        document.querySelector('#name').value = props.name;
        document.querySelector('#email').value = props.email;
        document.querySelector('#state').value = props.state;
    },[]);

    const handleSubmit = () => {

    }

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
                                    <input type='text' id='name' />
                                    <br /><br />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area-titulo'>E-mail</div>
                                <div className='area-input'>
                                    <input type='email' id='email' />
                                    <br /><br />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area-titulo'>Senha</div>
                                <div className='area-input'>
                                    <input type='password' id='password' />
                                    <br /><br />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area-titulo'>Estado</div>
                                <div className='area-input'>
                                    <select className='select' id='state'>
                                        {props.stateList.map((list,i)=>
                                            <option key={i}>{list.name}</option>
                                        )};
                                    </select>
                                </div>
                            </label>
                        </div>
                        <div className='buttons'>
                            <button onClick={handleSubmit}>Salvar</button>
                            <button onClick={handleClose}>X</button>
                        </div>
                    </div>    
                </div>
            </PageArea>
        </ModalContainer>
    )
}