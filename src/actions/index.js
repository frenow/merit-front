import { ADD_USER, ADD_BALANCE } from '../actions/actionTypes';

export function addUser(user) { 
    return {    
        type: ADD_USER,     
        user   
    } 
}
export function addBalance(balance) { 
    return {    
        type: ADD_BALANCE,     
        balance   
    } 
}