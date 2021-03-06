import React, {useState} from 'react';

import useApi from '../../helpers/OlxAPI';
import {doLogin} from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { PageArea } from './styled';

const Page = () => {
    const api = useApi();    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');

        const json = await api.login(email, password);

        if (json.error){
            setError(json.error);
        } else {
            doLogin(json.token, rememberPassword);
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
                            <div className='area-titulo'>E-mail</div>
                            <div className='area-input'>
                                <input 
                                    type='email' 
                                    disabled={disabled} 
                                    value={email}
                                    onChange={(event)=>setEmail(event.target.value)}
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
                                    onChange={(event)=>setPassword(event.target.value)}
                                    required
                                    />
                            </div>

                        </label>
                        <label className='area'>
                            <div className='area-titulo'>Lembrar senha</div>
                            <div className='area-input'>
                                <input 
                                type='checkbox' 
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={()=>setRememberPassword(!rememberPassword)}
                                />
                            </div>

                        </label>
                        <label className='area'>
                            <div className='area-titulo'></div>
                            <div className='area-input'>
                                <button disabled={disabled}>Fazer login</button>
                            </div>
                        </label>
                    </form>
                </PageArea>
            </PageContainer>
    );
}

export default Page;