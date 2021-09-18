import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import useApi from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';
import { PageArea, SearchArea } from './styled';
import AdItem from '../../components/partials/AdItem';

const Page = () => {
    const api = useApi();    

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [addList, setAddList] = useState([]);

    useEffect(()=>{
        const getState = async ()=>{
            const slist = await api.getStates();
            setStateList(slist);
        };

        const getCategories = async ()=>{
            const json = await api.getCategories();
            setCategories(json);
        };

        const getRecentsAds = async()=>{
            const json = await api.getAds({
                sort:'desc',
                limit:8,
            });
            setAddList(json.ads);
        };

        getState();
        getCategories();
        getRecentsAds();
    },[]);

    return (
        <>
        <SearchArea>
            <PageContainer>
                <div className='searchbox'>
                    <form method='GET' action='/ads'>
                        <input type='text' name='q' placeholder='O que você procura?' />
                        <select name='state'>
                            <option>Selecione</option>
                            {stateList.map((x, i)=>
                                <option key={i} value={x.name}>{x.name}</option>
                            )}
                        </select>
                        <button>Pesquisar</button>
                    </form>
                </div>
                <div className='categoryList'>
                    {categories.map((x, i) =>
                        <Link key={i} to={`/ads?cat=${x.slug}`} className='categoryItem'>
                            <img src={x.img} alt='' />
                            <span>{x.name}</span>
                        </Link>
                    )}
                </div>
            </PageContainer>
        </SearchArea>
        <PageContainer>
            <PageArea>
                <h2>Anúncios Recentes</h2>
                <div className='list'>
                    {addList.map((x,y)=>
                        <AdItem key={y} data={x}/>
                    )}
                </div>
                <Link to='/ads' className='seeAllLink'>Ver todos</Link>
                <hr />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book. It has survived not only five centuries, but also the leap into 
                electronic typesetting, remaining essentially unchanged. It was popularised in 
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.
            </PageArea>
        </PageContainer>
        </>
    );
}

export default Page;