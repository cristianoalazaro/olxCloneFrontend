import React from "react";

import useApi from '../../helpers/OlxAPI';
import {PageContainer} from '../../components/MainComponents';
import {PageArea} from './styled';

export default function MyAccount(){
    return (
        <PageContainer>
            <PageArea>
                <div className='datas'>
                    <form>
                        <label className='area'>
                            <div className='area-titulo'>Nome</div>
                            <div className='area-input'>
                                <input type='text' name='name' readOnly/>
                            </div>
                        </label>
                        <label className='area'>
                            <div className='area-titulo'>E-mail</div>
                            <div className='area-input'>
                                <input type='email' name='email' readOnly/>
                            </div>
                        </label>
                        <label className='area'>
                            <div className='area-titulo'>Estado</div>
                            <div className='area-input'>
                                <select className='select' name='state' readOnly>
                                    <option></option>
                                </select>
                            </div>
                        </label>
                        <div className='area-input'>
                            <button>Editar</button>
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
    )
}