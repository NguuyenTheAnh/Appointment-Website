import { FETCH_USER_LOGIN_SUCCESS, FETCH_USER_LOGOUT_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        access_token: '',
        username: '',
        email: '',
        name: '',
        phone: '',
        address: '',
        department_name: '',
        role_name: '',
        image: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account: {
                    access_token: action?.payload?.data?.access_token,
                    username: action?.payload?.data?.username,
                    email: action?.payload?.data?.email,
                    name: action?.payload?.data?.name,
                    phone: action?.payload?.data?.phone,
                    address: action?.payload?.data?.address,
                    department_name: action?.payload?.data?.department_name,
                    role_name: action?.payload?.data?.role_name,
                    image: action?.payload?.data?.image
                },
                isAuthenticated: true
            };
        case FETCH_USER_LOGOUT_SUCCESS:
            state = INITIAL_STATE;
            return state;
        default: return state;
    }
};

export default userReducer;