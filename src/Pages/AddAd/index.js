import React, { useEffect, useRef, useState } from 'react';
import {useHistory} from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import CreateNumberMask from 'text-mask-addons/dist/createNumberMask';

import useApi from '../../helpers/OlxAPI';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { PageArea } from './styled';

const Page = () => {
    const api = useApi();
    const fileField = useRef();
    const history = useHistory();

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        const getCategories = async () =>{
            const categories = await api.getCategories();
            setCategories(categories);
        }
        getCategories();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if (!title.trim()){
            errors.push('sem título');
        }
        if (!category){
            errors.push('Sem categoria');
        }

        if (errors.length === 0){
            const fData = new FormData();
            fData.append('title',title);
            fData.append('price',price);
            fData.append('priceneg',priceNegotiable);
            fData.append('desc',desc);
            fData.append('cat',category);

            if (fileField.current.files.length > 0){
                for (let i = 0; i < fileField.current.files.length; i++){
                    fData.append('img',fileField.current.files[i]);
                }
                const json = await api.addAd(fData);
                
                if (!json.error){
                    return history.push(`/ad/${json.id}`);
                } else {
                    setError(json.error);
                }
            }
        } else {
            setError(errors.join("\n"));
        }

        setError(false);

    }

    const priceMask = CreateNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    })

    return (
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className='area-titulo'>Título</div>
                        <div className='area-input'>
                            <input
                                type='text'
                                disabled={disabled}
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                required
                            />
                        </div>

                    </label>
                    <label className='area'>
                        <div className='area-titulo'>Categoria</div>
                        <div className='area-input'>
                            <select
                                disabled={disabled}
                                onChange={event => setCategory(event.target.value)}
                                required
                            >
                                <option></option>
                                {categories &&
                                    categories.map(cat =>
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>)
                                }
                            </select>
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area-titulo'>Preço</div>
                        <div className='area-input'>
                            <MaskedInput 
                                mask={priceMask}
                                placeholder='R$ '
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={(event)=>setPrice(event.target.value)}
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area-titulo'>Preço Negociável</div>
                        <div className='area-input'>
                            <input
                                type='checkbox'
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={event => setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area-titulo'>Descrição</div>
                        <div className='area-input'>
                            <textarea
                                disabled={disabled}
                                value={desc}
                                onChange={(event => setDesc(event.target.value))}
                            >                                
                            </textarea>
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area-titulo'>Imagens (1 ou mais)</div>
                        <div className='area-input'>
                            <input 
                                type='file'
                                disabled={disabled}
                                multiple
                                ref={fileField}
                            />
                        </div>
                    </label>

                    <label className='area'>
                        <div className='area-titulo'></div>
                        <div className='area-input'>
                            <button disabled={disabled}>Adicionar Anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;