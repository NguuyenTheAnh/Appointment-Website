import { INCREMENT, DECREMENT } from '../action/counterAction';
import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        email: '',
        name: '',
        phone: '',
        address: '',
        department: '',
        role: '',
        image: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log('check acitons:', action)
            return {
                ...state, account: {
                    access_token: action?.payload?.data?.access_token,
                    refresh_token: action?.payload?.data?.refresh_token,
                    username: action?.payload?.data?.username,
                    email: action?.payload?.data?.email,
                    name: action?.payload?.data?.name,
                    phone: action?.payload?.data?.phone,
                    address: action?.payload?.data?.address,
                    department: action?.payload?.data?.department,
                    role: action?.payload?.data?.role,
                    image: action?.payload?.data?.image
                },
                isAuthenticated: true
            };

        case DECREMENT:
            return {
                ...state, count: state.count - 1,
            };
        default: return state;
    }
};

export default userReducer;