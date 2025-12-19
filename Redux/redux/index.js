const redux = require("redux");
const createStore = redux.createStore;

const initialState = {
  numberOfBooks : 200,
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

 const reducer = (state = initialState, action)=>{
     switch(action.type){
     case BUY_BOOK : {
      return {
        ...state,
        numberOfBooks : state.numberOfBooks - 1
      };
     }
     case BUY_MODEL : 
     return {
      ...state,
      numberofModels : state.numberofModels - 1
     }
     default : 
        return state;
     }
 };

 //store
 const store = createStore(reducer);

 console.log("Initial state of our application :", store.getState());
 const unsubscribe = store.subscribe(()=>{
  console.log("Updated value of the store is :", store.getState());
 });
// unsubscribe();
 store.dispatch(buy_book());
 store.dispatch(buy_model());