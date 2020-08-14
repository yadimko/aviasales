import initialStore from '../initialState';

const sortingByPrice = (array) => {
  return array.sort((prev, next) => {
    if (prev.price < next.price) return -1;
    if (prev.price > next.price) return 1;
  })
};

const sortingByTime = (array) => {
  return array.sort((prev, next) => {
    if (
      prev.segments[0].duration + prev.segments[1].duration <
      next.segments[0].duration + next.segments[1].duration
    )
    {return -1;}
    if (
      prev.segments[0].duration + prev.segments[1].duration >
      next.segments[0].duration + next.segments[1].duration
    )
    {return 1;}
  })
}

const filterState = (bool, state, num) => {
  const {sortByPrice, sortByTime} = state;
  let array = null;
  if(bool){
    array = [
      ...state.ticketsBeforeRender.filter((el) => {
        if (el.segments[0].stops.length !== num && el.segments[1].stops.length !== num) {
          return el;
        }
      }),
    ]
  } else {
    array = [
      ...state.ticketsBeforeRender,
      ...state.ticketsFromAPI.filter((el) => {
        if (el.segments[0].stops.length === num && el.segments[1].stops.length === num) {
          return el;
        }
      }),
    ]
  }
  if (sortByPrice){
    return sortingByPrice(array);
  }else if (sortByTime){
    return sortingByTime(array)
  }else{return array}
}

const transAll = (arr) => {
  const {transfers} = arr;
  if (transfers.allTransfers && transfers.withoutTransfers && transfers.oneTransfer && transfers.twoTransfers && transfers.threeTransfers) {
    return {
      ...arr,
      ticketsBeforeRender: [],
      transfers: {
        allTransfers: false,
        withoutTransfers: false,
        oneTransfer: false,
        twoTransfers: false,
        threeTransfers: false,
      }
    };
  }else if (arr.sortByTime){
    return {
      ...arr,
      ticketsBeforeRender: sortingByTime(arr.ticketsFromAPI),
      transfers: {
        allTransfers: true,
        withoutTransfers: true,
        oneTransfer: true,
        twoTransfers: true,
        threeTransfers: true,
      }
    };
  }else if (arr.sortByPrice){
    return {
      ...arr,
      ticketsBeforeRender: sortingByPrice(arr.ticketsFromAPI),
      transfers: {
        allTransfers: true,
        withoutTransfers: true,
        oneTransfer: true,
        twoTransfers: true,
        threeTransfers: true,
      }
    };
  }else{
    return {
      ...arr,
      ticketsBeforeRender: [...arr.ticketsFromAPI],
      transfers: {
        allTransfers: true,
        withoutTransfers: true,
        oneTransfer: true,
        twoTransfers: true,
        threeTransfers: true,
      }
    };
  }

};

export default function filterReducer(state = initialStore, action) {
  switch (action.type) {
    case 'ALL_TRANSFERS_FILTER':
      return transAll(state);

    case 'TRANSFERS_FILTER':
      const currentName = action.name;
      return {
        ...state,
        transfers: {
          ...state.transfers,
          [currentName]: !state.transfers[currentName]
        },
        ticketsBeforeRender: filterState(state.transfers[currentName], state, action.num)
      };

    case 'SORT_BY_PRICE': {
      return {
        ...state,
        sortByPrice: true,
        sortByTime: false,
        ticketsBeforeRender: sortingByPrice(state.ticketsBeforeRender),
      };
    }
    case 'SORT_BY_TIME': {
      return {
        ...state,
        sortByPrice: false,
        sortByTime: true,
        ticketsBeforeRender: sortingByTime(state.ticketsBeforeRender)
      };
    }

    case 'CHANGE_PAGE': {
      const end = 5 * action.payload;
      const start = end - 5;
      return {
        ...state,
        tickets: [...state.ticketsBeforeRender].slice(start, end),
      };
    }

    default:
      return state;
  }
}