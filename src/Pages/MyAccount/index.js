import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

import useApi from '../../helpers/OlxAPI';
import {PageContainer} from '../../components/MainComponents';
import {PageArea} from './styled';
import Modal from '../../components/Modal';
import AdItem from "../../components/partials/AdItem";

export default function MyAccount(){
    const api = useApi();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let token = Cookies.get('token');
        const getUser = async () => {
            const user = await api.getUser(token);
            setName(user.name);
            setEmail(user.email);
            setState(user.state);
        }
        
        const getStates = async () => {
            const states = await api.getStates();
            console.log(states);
            setStateList(states);
        }

        const getAds = async () => {
            const ads = await api.getAds({
                sort:'desc',
                //limit:8
            });
            setAdsList(ads.ads);
        }

        getUser();
        getStates();
        getAds();
    },[]);

    const handleEdit = (event) =>{
        event.preventDefault();
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const handleSubmit = async () => {
        const stateCode = await api.getStateByName(state);
        const res = await api.editUser(name, email, stateCode, password)
        if (res) alert(res.result);
    }

    return (
        <>
        <PageContainer>
            <PageArea>
                <div className='datas'>
                    <h1>Página do Usuário</h1>
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
                                {adsList.map((ad,i) => 
                                <AdItem key={i} data={ad} />)}
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
                password={password}
                stateList={stateList}
                onClose={closeModal}
                onSave={handleSubmit}
                />
            }

        </>
    )
}