import initialStore from './initialState';

const transFilter = (arr, filter) => {
  if (arr.includes(filter)) {
    return arr.filter((el) => {
      return el !== filter;
    });
  }
  arr.push(filter);
  return arr;
};

const transAll = (arr) => {
  if (arr.allTransfers && arr.withoutTransfers && arr.oneTransfer && arr.twoTransfers && arr.threeTransfers) {
    return {
      ...arr,
      ticketsBeforeRender: [],
      allTransfers: false,
      withoutTransfers: false,
      oneTransfer: false,
      twoTransfers: false,
      threeTransfers: false,
    };
  }
  return {
    ...arr,
    ticketsBeforeRender: [...arr.ticketsFromAPI],
    allTransfers: true,
    withoutTransfers: true,
    oneTransfer: true,
    twoTransfers: true,
    threeTransfers: true,
  };
};

export default function reducer(state = initialStore, action) {
  switch (action.type) {
    case 'GET_TICKETS_SUCCESS': {
      return {
        ...state,
        ticketsFromAPI: [...state.ticketsFromAPI.concat(action.payload)],
      };
    }
    case 'ALL_TRANSFERS_FILTER':
      return transAll(state);
    case 'WITHOUT_TRANSFERS_FILTER':
      return {
        ...state,
        withoutTransfers: !state.withoutTransfers,
        ticketsBeforeRender: state.withoutTransfers
          ? [
              ...state.ticketsBeforeRender.filter((el) => {
                if (el.segments[0].stops.length !== 0 && el.segments[1].stops.length !== 0) {
                  return el;
                }
              }),
            ]
          : [
              ...state.ticketsBeforeRender,
              ...state.ticketsFromAPI.filter((el) => {
                if (el.segments[0].stops.length === 0 && el.segments[1].stops.length === 0) {
                  return el;
                }
              }),
            ],
      };
    case 'ONE_TRANSFER_FILTER':
      return {
        ...state,
        oneTransfer: !state.oneTransfer,
        ticketsBeforeRender: state.oneTransfer
          ? [
              ...state.ticketsBeforeRender.filter((el) => {
                if (el.segments[0].stops.length !== 1 && el.segments[1].stops.length !== 1) {
                  return el;
                }
              }),
            ]
          : [
              ...state.ticketsBeforeRender,
              ...state.ticketsFromAPI.filter((el) => {
                if (el.segments[0].stops.length === 1 && el.segments[1].stops.length === 1) {
                  return el;
                }
              }),
            ],
      };
    case 'TWO_TRANSFERS_FILTER':
      return {
        ...state,
        twoTransfers: !state.twoTransfers,
        ticketsBeforeRender: state.twoTransfers
          ? [
              ...state.ticketsBeforeRender.filter((el) => {
                if (el.segments[0].stops.length !== 2 && el.segments[1].stops.length !== 2) {
                  return el;
                }
              }),
            ]
          : [
              ...state.ticketsBeforeRender,
              ...state.ticketsFromAPI.filter((el) => {
                if (el.segments[0].stops.length === 2 && el.segments[1].stops.length === 2) {
                  return el;
                }
              }),
            ],
      };
    case 'THREE_TRANSFER_FILTER':
      return {
        ...state,
        threeTransfers: !state.threeTransfers,
        ticketsBeforeRender: state.threeTransfers
          ? [
              ...state.ticketsBeforeRender.filter((el) => {
                if (el.segments[0].stops.length !== 3 && el.segments[1].stops.length !== 3) {
                  return el;
                }
              }),
            ]
          : [
              ...state.ticketsBeforeRender,
              ...state.ticketsFromAPI.filter((el) => {
                if (el.segments[0].stops.length === 3 && el.segments[1].stops.length === 3) {
                  return el;
                }
              }),
            ],
      };
    case 'SORT_BY_PRICE': {
      return {
        ...state,
        ticketsBeforeRender: [...state.ticketsBeforeRender].sort((prev, next) => {
          if (prev.price < next.price) return -1;
          if (prev.price > next.price) return 1;
        }),
      };
    }
    case 'SORT_BY_TIME': {
      return {
        ...state,
        ticketsBeforeRender: [...state.ticketsBeforeRender].sort((prev, next) => {
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
        }),
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

    case 'LOAD_TO_TICKETS_BEFORE': {
      return {
        ...state,
        ticketsBeforeRender: [...state.ticketsFromAPI],
      };
    }

    case 'LOADING': {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
}
