import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import useApi from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';
import { PageArea } from './styled';
import AdItem from '../../components/partials/AdItem';

let timer;

const Page = () => {
    const api = useApi();
    const history = useHistory();

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQueryString();

    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
    const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');

    const [adsTotal, setAdsTotal] = useState(0);
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [resultOpacity, setResultOpacity] = useState(1);
    const [warningMessage, setWarningMessage] = useState('Carregando...');
    const [loading, setLoading] = useState(true);

    const getAdsList = async () => {
        setLoading(true);
        let offset = (currentPage - 1) * 2;

        const json = await api.getAds({
            sort: 'desc',
            limit: 2,
            q,
            cat,
            state,
            offset
        });
        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setLoading(false);
    }

    useEffect(() => {
        const getState = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        };

        const getCategories = async () => {
            const json = await api.getCategories();
            setCategories(json);
        };

        getState();
        getCategories();
    }, []);

    useEffect(() => {
        if (adList.length > 0) {
            setPageCount(Math.ceil(adsTotal / adList.length))
        } else {
            setPageCount(0);
        }
    }, [adsTotal]);

    useEffect(() => {
        setResultOpacity(0.3);
        getAdsList();
    },[currentPage]);

    useEffect(() => {
        let queryString = [];
        if (q) {
            queryString.push(`q=${q}`);
        }
        if (cat) {
            queryString.push(`cat=${cat}`);
        }
        if (state) {
            queryString.push(`state=${state}`);
        }

        history.replace({
            search: `?${queryString.join('&')}`
        });

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(getAdsList, 2000);
        setResultOpacity(0.3);
        setCurrentPage(1);

    }, [q, cat, state]);

    let pagination = [];
    for (let i = 1; i <= pageCount; i++){
        pagination.push(i);
    }

    return (
        <PageContainer>
            <PageArea>
                <div className='leftside'>
                    <form method='GET'>
                        <input
                            type='text'
                            name='q'
                            placeholder='O que você procura?'
                            value={q}
                            onChange={event => setQ(event.target.value)}
                        />
                        <div className='filterName'>Estado:</div>
                        <select
                            name='state'
                            value={state}
                            onChange={event => setState(event.target.value)}
                        >
                            <option></option>
                            {stateList.map((state, i) =>
                                <option key={i} value={state.name}>{state.name}</option>)}
                        </select>
                        <div className='filterName'>Categoria:</div>
                        <ul>
                            {categories.map((c, i) =>
                                <li
                                    className={cat == c.slug ? 'categoryname active' : 'categoryname'}
                                    key={i}
                                    onClick={() => setCat(c.slug)}
                                >
                                    <img src={c.img} alt='' />
                                    <span>{c.name}</span>
                                </li>)}
                        </ul>
                    </form>
                </div>
                <div className='rightside'>
                    <h2>Resultados</h2>

                    {loading && adList.length === 0 &&
                        <div className='listWarning'>Carregando...</div>
                    }
                    {!loading && adList.length === 0 &&
                        <div className='listWarning'>Não encontramos resultados.</div>
                    }

                    <div className='list' style={{ opacity: resultOpacity }}>
                        {adList.map((add, i) =>
                            <AdItem key={i} data={add} />
                        )}
                    </div>

                    <div className='pagination'>
                        {pagination.map((p,i) => 
                            <div className={p === currentPage ? 'pageItem active' : 'pageItem'} 
                            onClick={() => setCurrentPage(p)}>{p}</div>
                        )}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    );
}

export default Page;