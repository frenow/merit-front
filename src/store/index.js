import { createStore } from 'redux';
import User from '../reducers/user';

export const Store = createStore(User);