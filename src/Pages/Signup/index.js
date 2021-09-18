import React, { useState, useEffect } from 'react';

import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { PageArea } from './styled';

const Page = () => {
    const api = useApi();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [stateList, setStateList] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getState = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getState();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');

        if (password !== confirmPassword){
            setError('Senhas não conferem');
            return;
        }

        const json = await api.register(name, password, email, stateLoc);

        if (json.error) {
            setError(json.error);
        } else {
             doLogin(json.token);
             window.location.href = '/';
        }
        setDisabled(false);
    }


    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>

                    <label className='area'>
                        <div className='area-titulo'>Nome completo</div>
                        <div className='area-input'>
                            <input
                                type='name'
                                disabled={disabled}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area-titulo'>Estado</div>
                        <div className='area-input'>
                            <select required disabled={disabled} value={stateLoc}
                                onChange={(event) => setStateLoc(event.target.value)}>
                                <option>Selecione</option>
                                {stateList.map((x,i) => 
                                    <option key={i} value={x._id}>{x.name}</option>
                                    )}
                            </select>
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area-titulo'>E-mail</div>
                        <div className='area-input'>
                            <input
                                type='email'
                                disabled={disabled}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area-titulo'>Senha</div>
                        <div className='area-input'>
                            <input
                                type='password'
                                disabled={disabled}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area-titulo'>Confirmar senha</div>
                        <div className='area-input'>
                            <input
                                type='password'
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area-titulo'></div>
                        <div className='area-input'>
                            <button disabled={disabled}>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;