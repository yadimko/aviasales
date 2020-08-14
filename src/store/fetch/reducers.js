import initialStore from '../initialState';

const initialStore = {
  ticketsFromAPI: [],
  ticketsBeforeRender: [],
  loading: false,
  error: false,
};

export default function fetchReducer(state = initialStore, action) {
  switch (action.type) {
    case 'FETCH_POSTS_REQUEST': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'FETCH_POSTS_FAILURE': {
      return {
        ...state,
        error: true,
      };
    }

    case 'FETCH_POSTS_SUCCESS': {
      return {
        ...state,
        ticketsFromAPI: [...state.ticketsFromAPI.concat(action.payload)],
        ticketsBeforeRender: [...state.ticketsFromAPI],
      };
    }

    default:
      return state;
  }
}