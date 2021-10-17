import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://localhost:3001/';

const apiFetchFile = async (endpoint, body) => {

    if (!body.token){
        let token = Cookies.get('token');
        if (token) {
            body.append('token', token);
        }
    }
    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        body
    });
    const json = await res.json();
    
    
    if (json.notallowed) {
        return window.location.href = '/signin';
    }

    return json;
}

const apiFetchPost = async (endpoint, body) => {
    if (!body.token){
        let token = Cookies.get('token');
        if (token){
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI + endpoint, {
        method:'POST',
        headers:{
            'Accept':'Application/json',
            'Content-type':'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();

    if (json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json;
}

const apiFetchGet = async (endpoint, body = []) => {
    if (!body.token){
        let token = Cookies.get('token');
        if (token){
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if (json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json;
}

const apiFetchGetNoToken = async (endpoint, body) => {
    const res = await fetch(BASEAPI + endpoint,body);
    const json = await res.json();
    return json;
}

const apiFetchPut = async (endpoint, body) => {
    if (!body.token){
        let token = Cookies.get('token');
        if (token){
            body.token = token;
        }
    }
    const res = await fetch(BASEAPI + endpoint,{
        method: 'PUT',
        headers: {
            'Accept': 'Application/json',
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(body) 
    });
    const json = await res.json();
    return json;
}

const OlxAPI = {
    login: async (email, password) => {
        const json = await apiFetchPost(
            'user/signin',
            {email, password}
        );
        return json;
    },
    register: async (name, email, password, stateLoc) => {
        const json = await apiFetchPost(
            'user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },
    getStates: async () => {
        const json = await apiFetchGet(
            'states'
        );
        return json.states;
    },
    getStateByName: async (stateName) =>{
        const json = await apiFetchGetNoToken(
            `state?state=${stateName}`
        );
        return json;
    },
    getCategories: async () => {
        const json = await apiFetchGet(
            'categories'
        );
        return json.categories;
    },
    getAds: async (options) =>{
        const json = await apiFetchGet(
            'ad/list',
            options,
        );
        return json;
    },
    getAd: async (id, other = false) => {
        const json = await apiFetchGet(
            'ad/item',
            {id, other}
        );
        return json;
    },
    getUser: async (token) => {
        const json = await apiFetchGet(
            'user/me',
            {token}
        );
        return json;
    },
    addAd: async (fData) => {

        const json = await apiFetchFile(
            'ad/add',
            fData
        );
        return json;
    },
    editUser: async (name, email, stateCode, password) => {
        let token = Cookies.get('token');
        const user = await apiFetchGet(
            'user/me',
            {token}
        );
        const data = {
            name,
            email,
            state: stateCode,
        };
        if (password) data.password = password;
        const json = await apiFetchPut('user/me', data);
        return json;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => OlxAPI;