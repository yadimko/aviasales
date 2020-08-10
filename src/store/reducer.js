import initialStore from './initialState';

const transFilter = (arr, filter) => {
  if (arr.includes(filter)){
    return arr.filter((el) => {return el !== filter});
  }
  arr.push(filter);
  return arr;
}

const transAll = (arr) => {
  if (arr.allTransfers && arr.withoutTransfers && arr.oneTransfer && arr.twoTransfers && arr.threeTransfers){
    return {
      ...arr,
      allTransfers: false,
      withoutTransfers: false,
      oneTransfer: false,
      twoTransfers: false,
      threeTransfers: false
    }
  }
  return {
    ...arr,
    allTransfers: true,
    withoutTransfers: true,
    oneTransfer: true,
    twoTransfers: true,
    threeTransfers: true
  }
}

const zz = (arr) => {
  return {
    ...arr,
    tickets: [...arr.ticketsFromAPI].slice(15,23)
  }
}


export default function reducer(state = initialStore, action){

  switch (action.type){
    case 'GET_TICKETS_SUCCESS':{
      return {
        ...state,
        ticketsFromAPI: [...state.ticketsFromAPI.concat(action.payload)]
      }
    }
    case 'ALL_TRANSFERS_FILTER':
      return transAll(state)
    case 'WITHOUT_TRANSFERS_FILTER':
      return {
        ...state,
        withoutTransfers: !state.withoutTransfers
      }
    case 'ONE_TRANSFER_FILTER':
      return {
        ...state,
        oneTransfer: !state.oneTransfer
      }
    case 'TWO_TRANSFERS_FILTER':
      return {
        ...state,
        twoTransfers: !state.twoTransfers
      }
    case 'THREE_TRANSFER_FILTER':
      return {
        ...state,
        threeTransfers: !state.threeTransfers
      }
    case 'SORT_BY_PRICE': {
      return {
        ...state,
        ticketsFromAPI: [...state.ticketsFromAPI].sort((prev, next) => {
          if (prev.price < next.price) return -1;
          if (prev.price > next.price) return 1;
        })
      }
    }
    case 'SORT_BY_TIME': {
      return {
        ...state,
        ticketsFromAPI: [...state.ticketsFromAPI].sort((prev, next) => {
          if (prev.segments[0].duration + prev.segments[1].duration < next.segments[0].duration + next.segments[1].duration) return -1;
          if (prev.segments[0].duration + prev.segments[1].duration > next.segments[0].duration + next.segments[1].duration) return 1;
        })
      }
    }

    case 'CHANGE_PAGE': {
      const end = 5 * action.payload;
      const start = end - 5;
      return {
        ...state,
        tickets: [...state.ticketsFromAPI].slice(start, end)
      }
    }

    default: return state;
  }
}
