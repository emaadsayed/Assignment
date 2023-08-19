import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import contactsReducer from './reducers/contactsReducer';

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
