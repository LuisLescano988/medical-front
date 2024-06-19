import axios from 'axios';

export function getPatients() {
    return function (dispatch) {
        axios.get('http://127.0.0.1:8000/api/pacientes/')
            .then(json => {
                return dispatch({
                    type: 'GET_PATIENTS',
                    payload: json.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function getRecipes() {
    return function (dispatch) {
        axios.get('http://127.0.0.1:8000/api/users/medicos/')
            .then(json => {
                return dispatch({
                    type: 'GET_RECIPES',
                    payload: json.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            await axios.get(`https://henry-videogames-production.up.railway.app/videogames/${id}`)
                .then((game) => {
                    dispatch({
                        type: 'GET_GAMES_DETAILS',
                        payload: game.data
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export function addPatient(payload) {
    return function (dispatch) {
        return axios
            .post('http://127.0.0.1:8000/api/pacientes/', payload)
            .then((info) => {
                const patientData = info.data
                dispatch({
                    type: 'ADD_PATIENT',
                    payload: patientData
                });
                return patientData;
            });
    }
}

export function editGame({ name, id }) {
    return async function (dispatch) {
        return await axios
        .put(`https://henry-videogames-production.up.railway.app/videogames/${id}`, { name })
        .then((info) => {
            return dispatch({
                type: 'EDIT_GAME',
                payload: info
            })
        })
    };
}

export function deleteGame({name, id}) {
    return async function (dispatch) {        
        return await axios
            .delete(`https://henry-videogames-production.up.railway.app/videogames/del/${id}`, {name})
            .then((info) => {
                return dispatch({
                    type: 'DELETE_GAME',
                    payload: info
                })
            })
    };
}

export function filterBySource(payload) {
    return {
        type: 'FILTER_BY_SOURCE',
        payload
    }
};

export function filterByGenres(payload) {
    return {
        type: 'FILTER_BY_GENRES',
        payload
    }
};

export function sortByName(payload) {
    return {
        type: 'SORT_BY_NAME',
        payload
    }
};

export function sortByRating(payload) {
    return {
        type: "SORT_BY_RATING",
        payload,
    };
};

export function resetDetails() {
    return ({
        type: 'RESET_DETAILS'
    })
}