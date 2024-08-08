import Cookies from 'js-cookie';

const initialState = {
    isAuthenticated: !!Cookies.get('access_token'),
    recipes: [],
    details: [],
    patients: []
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'LOGIN_SUCCESS':
            return { ...state, isAuthenticated: true };

        case 'LOGOUT':
            return { ...state, isAuthenticated: false };
            
        case 'GET_PATIENTS':
            return {
                ...state,
                patients: payload,
                // patients2: payload
            };

        case 'GET_RECIPES':
            return {
                ...state,
                recipes: payload
            }
        case 'RESET_DETAILS':
            return {
                ...state,
                details: []
            }

        default: return state
    }
}