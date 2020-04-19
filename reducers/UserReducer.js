
const userReducer = (state, action) => {
    switch (action.type) {
        case 'User_Login':
            return {...state, login:{...action.login}};
        case 'User_Logout':
            return {...state, login:{}};
        default:
            return state;
            break;
    }
}

export {
    userReducer
}