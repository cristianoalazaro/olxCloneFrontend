import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

import useApi from '../../helpers/OlxAPI';
import {PageContainer} from '../../components/MainComponents';
import {PageArea} from './styled';
import Modal from '../../components/Modal';

export default function MyAccount(){
    const api = useApi();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let token = Cookies.get('token');
        const getUser = async () => {
            const user = await api.getUser(token);
            setName(user.name);
            setEmail(user.email);
            setState(user.state);
            console.log(user);
        }
        getUser();
    },[]);

    const handleEdit = (event) =>{
        event.preventDefault();
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
        <PageContainer>
            <PageArea>
                <div className='datas'>
                    <form>
                        <label className='area'>
                            <div className='area-titulo'>Nome</div>
                            <div className='area-input'>
                                <input type='text' name='name' value={name} readOnly/>
                            </div>
                        </label>
                        <label className='area'>
                            <div className='area-titulo'>E-mail</div>
                            <div className='area-input'>
                                <input type='email' name='email' value={email} readOnly/>
                            </div>
                        </label>
                        <label className='area'>
                            <div className='area-titulo'>Estado</div>
                            <div className='area-input'>
                                <select className='select' name='state' readOnly>
                                    <option>{state}</option>
                                </select>
                            </div>
                        </label>
                        <div className='area-input'>
                            <button onClick={handleEdit}>Editar</button>
                        </div>
                    </form>
                </div>
                <div className='posts'>
                    <PageContainer>
                        <PageArea>
                            <h2>Seus anúncios</h2>
                            <div className='list'>
                                
                            </div>
                        </PageArea>
                    </PageContainer>
                </div>
            </PageArea>
        </PageContainer>
        {showModal && 
                <Modal 
                name={name}
                email={email}
                state={state}
                onClose={closeModal}
                />
            }

        </>
    )
}