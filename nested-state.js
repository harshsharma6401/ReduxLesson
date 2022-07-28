const redux = require('redux');
const produce = require('immer').produce;

//Immer is used for appying changes in states
//https://blog.bitsrc.io/using-immer-with-react-a-simple-solutions-for-immutable-states-a6ebb8b0bfa

const initialState = {
    name:'Vishwas',
    address:{
        street:'123 Main St',
        city:'Boston',
        state:'MA',
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

const updateStreet = (street) =>{
    return {
        type:STREET_UPDATED,
        payload:street,
    }
}

const reducer = (state = initialState,action) =>{
    switch(action.type)
    {
        case STREET_UPDATED : 
       /*  return {
            ...state,
            address: {
                ...state.address,
                street: action.payload,
            },
        } */
        return produce(state,(draft)=>{
            draft.address.street = action.payload
        })
        default:{
            return state
        }
    }
}

const store = redux.createStore(reducer);

console.log('Inital store',store.getState());

const unsubscribe = store.subscribe(()=>{
    console.log('Updated State ', store.getState());
})
store.dispatch(updateStreet('456 Main St'));

unsubscribe();

//Middleware is the suggested way to extend redux with custom functionality
//provides a third party extension point /w dispatching an action, and the moment it reaches the reducer
//Use middleware for logging, crash reporting,performaing asynchronous tasks etc

//Logger is a middleware