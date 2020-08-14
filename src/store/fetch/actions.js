import AviasalesService from '../../aviasales-service/aviasales-service';

const as = new AviasalesService();

export const FETCH_POSTS_REQUEST = () => ({ type: 'FETCH_POSTS_REQUEST' });

export const FETCH_POSTS_FAILURE = () => ({ type: 'FETCH_POSTS_FAILURE', error: 'Oops...'});

export const FETCH_POSTS_SUCCESS = (array) => ({ type: 'FETCH_POSTS_SUCCESS', payload: array });

export const GET_TICKETS_FETCH = () => async (dispatch) => {

  const id = await as.getSearchID();

  const fetch = async () => {
    try {
      const response = await as.getTickets(id);
      const ticketFromAPI = await response.tickets;
      dispatch(FETCH_POSTS_SUCCESS(ticketFromAPI));
      dispatch(FETCH_POSTS_REQUEST());
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