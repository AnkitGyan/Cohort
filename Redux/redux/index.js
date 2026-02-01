const redux = require("redux");
const createStore = redux.createStore;
const reduxLogger = require("redux-logger");
const combinereducers = redux.combineReducers;
const logger = reduxLogger.createLogger();

const initialBookState = {
  numberOfBooks : 200,
};

const initialModelState = {
  numberofModels : 30
};


//action type
const BUY_BOOK = "BUY_BOOK";
const BUY_MODEL = "BUY_MODEL";

//action creator
function buy_book(){
  return {
    type: BUY_BOOK,
    payload : {
       username : "Ankit",
       userId : 1
    }
  }
 }


 function buy_model(){
  return{
    type : BUY_MODEL,
     payload : {
       username : "Ankit",
       userId : 1
    }
  }
 }

 const bookReducer = (state = initialBookState, action)=>{
     switch(action.type){
     case BUY_BOOK : {
      return {
        ...state,
        numberOfBooks : state.numberOfBooks - 1
      };
     }
     default : 
        return state;
     }
 };

 
 const modelReducer = (state = initialModelState, action)=>{
     switch(action.type){
     case BUY_MODEL : 
     return {
      ...state,
      numberofModels : state.numberofModels - 1
     }
     default : 
        return state;
     }
 };

//apply middleware

const applyMiddleware = redux.applyMiddleware;

 const rootReducer = combinereducers({
  books : bookReducer,
  models : modelReducer
 })


 //store
 const store = createStore(rootReducer, applyMiddleware(logger));

 console.log("Initial state of our application :", store.getState());
 const unsubscribe = store.subscribe(()=>{
  // console.log("Updated value of the store is :", store.getState());
 });
// unsubscribe();
 store.dispatch(buy_book());
 store.dispatch(buy_model());