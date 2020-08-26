console.clear();

const createPolicy=(name, amount) => {
  return {
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  }
}

const deletePolicy =(name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  }
}

const createClaim = (name, amountToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfClaim: amountToCollect
    }
  }
}

//reducers
const claimsHistory = (oldListOfClaims = [], action) => {
  if(action.type === 'CREATE_CLAIM') {
    return [...oldListOfClaims, action.payload]
  };
  
  return oldListOfClaims;
}

const accounting = (bagOfMoney= 100, action) => {
  if(action.type === 'CREATE_CLAIM') {
    return bagOfMoney-action.payload.amountOfClaim;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
  
  return bagOfMoney;
}

const policies = (listOfPolicyHolders=[], action) => {
  if(action.type === 'CREATE_POLICY' ) {
    return [...listOfPolicyHolders, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicyHolders.filter(username => username !== action.payload.name);
  }
  return listOfPolicyHolders;
}

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const Store= createStore(ourDepartments);

// const action=createPolicy('Akshay',50);
//Store.dispatch(action);

Store.dispatch(createPolicy('akshay',50));
Store.dispatch(createPolicy('bob',60));
console.log(Store.getState())
Store.dispatch(createPolicy('tim',20));
Store.dispatch(createClaim('akshay',100));
console.log(Store.getState())
Store.dispatch(deletePolicy('bob'));

console.log(Store.getState())
