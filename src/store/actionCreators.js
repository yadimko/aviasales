import AviasalesService from '../aviasales-service/aviasales-service';

const as = new AviasalesService();

export const SORT_BY_PRICE = () => ({ type: 'SORT_BY_PRICE' });

export const SORT_BY_TIME = () => ({ type: 'SORT_BY_TIME' });

export const ALL_TRANSFERS_FILTER = () => ({ type: 'ALL_TRANSFERS_FILTER' });

export const TRANSFERS_FILTER = (name, num) => ({ type: 'TRANSFERS_FILTER', name, num});

export const CHANGE_PAGE = (number) => ({ type: 'CHANGE_PAGE', payload: number });

export const FETCH_POSTS_REQUEST = () => ({ type: 'FETCH_POSTS_REQUEST' });

export const FETCH_POSTS_FAILURE = () => ({ type: 'FETCH_POSTS_FAILURE', error: 'Oops...'});

export const FETCH_POSTS_SUCCESS = (array) => ({ type: 'FETCH_POSTS_SUCCESS', payload: array });

export const GET_TICKETS_FETCH = () => async (dispatch) => {

  const id = await as.getSearchID();

  const fetch = async () => {
    dispatch(FETCH_POSTS_REQUEST());
    try {
      const response = await as.getTickets(id);
      const ticketFromAPI = await response.tickets;
      dispatch(FETCH_POSTS_SUCCESS(ticketFromAPI));
      if (!response.stop) {
        fetch();
        dispatch(FETCH_POSTS_FAILURE())
      }
    } catch (err) {
      fetch();
    }
  };
  fetch();
};
