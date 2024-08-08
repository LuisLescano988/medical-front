import Cookies from 'js-cookie';
import { logoutUser, refreshAccessToken } from '../Middleware/Actions';

const tokenMiddleware = (store) => (next) => async (action) => {
    if (action.type.startsWith('API_CALL')) {
        const token = Cookies.get('access_token');

        if (!token) {
            store.dispatch(logoutUser());
            return;
        }

        try {
            action.payload.headers.Authorization = `Bearer ${token}`;
            next(action);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                try {
                    await store.dispatch(refreshAccessToken());
                    const newToken = Cookies.get('access_token');
                    action.payload.headers.Authorization = `Bearer ${newToken}`;
                    next(action);
                } catch (refreshError) {
                    store.dispatch(logoutUser());
                }
            } else {
                next(action);
            }
        }
    } else {
        next(action);
    }
};

export default tokenMiddleware;
