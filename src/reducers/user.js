import { ADD_USER, ADD_BALANCE } from '../actions/actionTypes';

const initialState = {  
    user: [],
    balance: []
}
export default function user(state = initialState, action) { 
    switch (action.type) { 
            case ADD_USER: 
            console.log('passou no reducers add user');       
            return {
                ...state, 
                user: [action.user] 
            }            
            case ADD_BALANCE: 
            console.log('passou no reducers add balance '+action.balance);       
            return {
                ...state, 
                balance: [action.balance] 
            }            
        default:            
            return state;
    } 
}