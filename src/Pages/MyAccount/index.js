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
                        <input type='text' name='name' readOnly/>
                        <input type='email' name='email' readOnly/>
                        <input type='text' name='state' readOnly/>
                        <button>Editar</button>
                    </form>
                </div>
                <div className='posts'>

                </div>
            </PageArea>
        </PageContainer>
    )
}