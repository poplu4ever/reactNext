import {createStore,combineReducers,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'


const userInitialState = {}

const allReducers = combineReducers({
    user:userReducer
})


function userReducer(state = userInitialState,action){
    switch(action.type){
        default:
            return state
    }
}

//create a new store when rendering 
export default function initializeStore(state){
    const store = createStore(  
        allReducers,
        Object.assign(
            {},
            { 
                user:userInitialState
            },
            state
        ),
        composeWithDevTools(applyMiddleware(ReduxThunk))
    )
    return store;
}