import { createStore, combineReducers } from 'redux';
import coffee from './reducers/coffee'

const rootReducers = combineReducers({
    coffees: coffee
});

const configureStore = () => {
    return createStore(rootReducers)
};

export default configureStore;