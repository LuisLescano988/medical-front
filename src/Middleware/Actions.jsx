import Cookies from 'js-cookie';
import axiosInstance from '../config/axiosConfig';


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const registerUrl = `${apiBaseUrl}/users/register/`
const loginUrl = `${apiBaseUrl}/users/login/`
const refreshTokenUrl = `${apiBaseUrl}/users/token/refresh/`
const patientsUrl = `${apiBaseUrl}/pacientes/`
const recipesUrl = `${apiBaseUrl}/recetas/`
const laboratoryUrl = `${apiBaseUrl}/pedidos_laboratorio/`

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
        const { access, refresh, user_id, first_name, last_name, email } = response.data;

        Cookies.set('access_token', access, { secure: true, sameSite: 'strict' });
        Cookies.set('refresh_token', refresh, { secure: true, sameSite: 'strict' });
        Cookies.set('user_id', user_id, { secure: true, sameSite: 'strict' })
        Cookies.set('first_name', first_name, { secure: true, sameSite: 'strict' })
        Cookies.set('last_name', last_name, { secure: true, sameSite: 'strict' })
        Cookies.set('email', email, { secure: true, sameSite: 'strict' })

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
                id: user_id
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

export function getRecipes(user) {
    return function (dispatch) {
        axiosInstance.get(recipesUrl, {
            params: {
                user:user}})
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