//console.log("Hello JI");

//Three concepts of redux
//Cake Shop Example
//Entities
//Shop, Shopkeeper , Customer
//Activities
//Customer - Order a Cake
//Shopkeeper - Box a cake from shelf. Update invetory. Make a Receipt

//3 Core Concepts of Redux
//Shop -> Store in Redux (Holds state of Application)
//Cake ordered -> Action - Describes what happened
//Shopkeeper ->Reducer -> Ties the store and actions together

//Store -> Holds the state of the application
// Action -> Describes what happened in the app
//Reducer -> Handles the actions and decides how to update the state

//Three Principles

//First  Principle
//The global state of the app is stored as an object inside a single store
// Maintain the app state in a single object which would be managed by the redux Store

//Second 
//The only way to change the state is to dispatch an action , an object that describes what happened
//To update the state, Upu need to let redux know about that with an action
//Not allowed to directly update the state object

//Third Principle
//To specify how the state tree is updated based on actions, you write pure reducers
//Reducer(prevState,Action) => newState


const redux = require('redux');
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED';
const ICE_CREAM_RESTOCKED = 'ICE_CREAM_RESTOCKED';

//Action in redux
function orderCake()
{
    return {
        type: CAKE_ORDERED,
        //quantity: 1,
        payload : 1,
    }
}

function restockCake(qty = 1){
    return {
        type: CAKE_RESTOCKED,
       // quantity: qty
        payload : qty,
    }
}

function orderIcecream(qty=1)
{
    return {
        type : ICE_CREAM_ORDERED,
        payload: qty
    }
}

function restockIcecream(qty=1)
{
    return{
        type: ICE_CREAM_RESTOCKED,
        payload:qty,
    }
}

//Reducer 
//(previousState,action) => newState
//Shopkeeper is reducer here
// numOfCakes = 10;

const initialState = {
    numofCakes  : 10,
    numofIceCreams: 20
}

const reducer = (state = initialState,action) =>{

    switch(action.type)
    {
        case CAKE_ORDERED:
            return {
                ...state, //First make a copy of state and only update numofCakes
                numofCakes : state.numofCakes - 1,
            }
        
        case CAKE_RESTOCKED:
            return{
                ...state,
                numofCakes : state.numofCakes + action.payload,
            }    
                
        case ICE_CREAM_ORDERED:
            return {
                ...state, //First make a copy of state and only update numofCakes
                numofIceCreams : state.numofIceCreams - 1,
            }
        
        case ICE_CREAM_RESTOCKED:
            return{
                ...state,
                numofIceCreams : state.numofIceCreams + action.payload,
            }    
         

        default:
            return state    
    }

}

// redux Store
// Holds app state
// Allows access to state via getState()
// ALlows state to be updated via dispatch(action)
// Registers listeners via subscribe(listener)
// Handles unregestering of listeners via the fucntion returned by subscribe(listener)

//Responsibility 1
const store = createStore(reducer);

//Responsibility 2
console.log("Intial State",store.getState());

//Responsibility 4
const unsubscribe = store.subscribe(()=> console.log('Updated state ',store.getState()));

//Responsibility 3
/* store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake()); */

//unsubscribe();

//Restocking Cakes
/* store.dispatch(restockCake(3)); */

const actions = bindActionCreators({orderCake,restockCake,orderIcecream,restockIcecream},store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.orderIcecream();
actions.orderIcecream();
actions.restockCake(3);
actions.restockIcecream(2);
unsubscribe();
 
 

