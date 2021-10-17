import React, { useEffect, useState } from 'react';

import {ModalContainer} from '../../components/MainComponents';
import {PageArea} from './styled';
export default function Modal (props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('');

    useEffect(()=>{
        setName(props.name);
        setEmail(props.email);
        setPassword(props.password);
    },[]);

    const handleClose = () => {
        props.onClose();
    }

    const handleSubmit = () =>{
        props.onSave();
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
                                    <input 
                                        type='text' 
                                        name='name' 
                                        value={name} 
                                        onChange={(event)=>setName(event.target.value)} />
                                    <br /><br />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area-titulo'>E-mail</div>
                                <div className='area-input'>
                                    <input 
                                        type='email' 
                                        name='email' 
                                        value={email} 
                                        onChange={(event)=>setEmail(event.target.value)} />
                                    <br /><br />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area-titulo'>Estado</div>
                                <div className='area-input'>
                                    <select 
                                        className='select' 
                                        name='state' 
                                        onChange={(event)=>setState(event.target.value)}>
                                        <option>{state}</option>
                                    </select>
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area-titulo'>Senha</div>
                                <div className='area-input'>
                                    <input
                                        type='password'
                                        name='password'
                                        value={password}
                                        onChange={(event)=>setPassword(event.target.value)} />
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