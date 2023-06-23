import * as actionTypes from '../constants/actionTypes';

const messageReducer = (messages = [], action) => {
    switch (action.type) {
        case actionTypes.START_LOADING:
            return { ...messages, isLoading: true };
        case actionTypes.END_LOADING:
            return { ...messages, isLoading: false };
        case actionTypes.FETCH_MESSAGES:
            return action.payload;
        case actionTypes.SEND_MESSAGE:
            return [...messages, action.payload];
        default:
            return messages;
    }
}
export default messageReducer;
