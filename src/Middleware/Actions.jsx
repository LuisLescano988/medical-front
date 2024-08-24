import Cookies from 'js-cookie';
import axiosInstance from '../config/axiosConfig';

// const usersUrl = 'http://127.0.0.1:8000/api/users/'
const registerUrl = 'http://127.0.0.1:8000/api/users/register/'
const loginUrl = 'http://127.0.0.1:8000/api/users/login/'
const refreshTokenUrl = 'http://127.0.0.1:8000/api/users/token/refresh/'
const patientsUrl = 'http://127.0.0.1:8000/api/pacientes/'
const recipesUrl = 'http://127.0.0.1:8000/api/recetas/'
const laboratoryUrl = 'http://127.0.0.1:8000/api/pedidos_laboratorio/'
// const LaboratoryUrl = 'PendienteGaio'
// const laboratoryUrl = 'PendienteGaio'
// const qrCreateUrl = 'PendienteGaio'
// const qrReadUrl = 'PendienteGaio'

export function addUser(payload) {
    return function (dispatch) {
        return axiosInstance
            .post(registerUrl, payload)
            .then((info) => {
                const patientData = info.data
                dispatch({
                    type: 'ADD_USER',
                    payload: patientData
                });
                return patientData;
            });
    }
}

export const loginUser = (payload) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(loginUrl, payload);
        const { access, refresh, user_id, first_name, last_name } = response.data;

        Cookies.set('access_token', access, { secure: true, sameSite: 'strict' });
        Cookies.set('refresh_token', refresh, { secure: true, sameSite: 'strict' });
        Cookies.set('user_id', user_id, { secure: true, sameSite: 'strict' })
        Cookies.set('first_name', first_name, { secure: true, sameSite: 'strict' })
        Cookies.set('last_name', last_name, { secure: true, sameSite: 'strict' })

        dispatch({
            type: 'LOGIN_SUCCESS',
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

export const refreshAccessToken = () => async (dispatch) => {
    try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) throw new Error('No refresh token available');

        const response = await axiosInstance.post(refreshTokenUrl, { refresh: refreshToken });
        const { access } = response.data;

        Cookies.set('access_token', access, { secure: true, sameSite: 'strict' });
        dispatch({ type: 'LOGIN_SUCCESS' })
    } catch (error) {
        console.error('Error refreshing access token:', error);
        dispatch(logoutUser());
    }
};

export const logoutUser = () => (dispatch) => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    dispatch({ type: 'LOGOUT' })
    location.reload();
};

export function getPatients(user_id) {
    return function (dispatch) {
        axiosInstance.get(patientsUrl, {
            params: {
                user_id: user_id
            }
        })
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
        axiosInstance.get(recipesUrl)
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

export function getLaboratory() {
    return function (dispatch) {
        axiosInstance.get(laboratoryUrl)
            .then(json => {
                return dispatch({
                    type: 'GET_LABORATORIES',
                    payload: json.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function addPatient(payload) {
    return function (dispatch) {
        return axiosInstance
            .post(patientsUrl, payload)
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

export function addRecipe(payload) {
    return function (dispatch) {
        return axiosInstance
            .post(recipesUrl, payload)
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

export function addLaboratory(payload) {
    return function (dispatch) {
        return axiosInstance
            .post(laboratoryUrl, payload)
            .then((info) => {
                const laboratoryData = info.data
                dispatch({
                    type: 'ADD_LABORATORY',
                    payload: laboratoryData
                });
                return laboratoryData;
            });
    }
}