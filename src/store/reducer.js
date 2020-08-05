import initialStore from './initialState';

const transFilter = (arr, filter) => {
  if (arr.includes(filter)){
    return arr.filter((el) => {return el !== filter});
  }
  arr.push(filter);
  return arr;
}

export default function reducer(state = initialStore, action){

  switch (action.type){
    case 'transferAll':
      return {
        ...state,
        transferAll: !state.transferAll
      }
    case 'zero':
      return {
        ...state,
        transfersList: transFilter(state.transfersList, 'zero')
      }
    case 'one':
      return {
        ...state,
        transfersList: transFilter(state.transfersList, 'one')
      }
    case 'two':
      return {
        ...state,
        transfersList: transFilter(state.transfersList, 'two')
      }
    case 'three':
      return {
        ...state,
        transfersList: transFilter(state.transfersList, 'three')
      }

    default: return state;
  }
}
