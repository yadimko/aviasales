import AviasalesService from '../components/aviasales-service/aviasales-service';

const as = new AviasalesService();

export const SORT_BY_PRICE = () => ({ type: 'SORT_BY_PRICE' });

export const SORT_BY_TIME = () => ({ type: 'SORT_BY_TIME' });

export const ALL_TRANSFERS_FILTER = () => ({ type: 'ALL_TRANSFERS_FILTER' });

export const WITHOUT_TRANSFERS_FILTER = () => ({ type: 'WITHOUT_TRANSFERS_FILTER' });

export const ONE_TRANSFER_FILTER = () => ({ type: 'ONE_TRANSFER_FILTER' });

export const TWO_TRANSFERS_FILTER = () => ({ type: 'TWO_TRANSFERS_FILTER' });

export const THREE_TRANSFER_FILTER = () => ({ type: 'THREE_TRANSFER_FILTER' });

export const GET_TICKETS_SUCCESS = (array) => ({ type: 'GET_TICKETS_SUCCESS', payload: array });

export const CHANGE_PAGE = (number = 1) => ({ type: 'CHANGE_PAGE', payload: number });

export const LOAD_TO_TICKETS_BEFORE = () => ({ type: 'LOAD_TO_TICKETS_BEFORE' });

export const LOADING = () => ({ type: 'LOADING' });

export const GET_TICKETS_FETCH = () => async (dispatch) => {
  const id = await as.getSearchID();
  let key = 0;
  const fetch = async () => {
    try {
      const response = await as.getTickets(id);
      const ticketFromAPI = await response.tickets.map((element) => {
        return {
          ...element,
          key: key++,
        };
      });
      dispatch(GET_TICKETS_SUCCESS(ticketFromAPI));
      dispatch(LOAD_TO_TICKETS_BEFORE());
      dispatch(LOADING());
      dispatch(CHANGE_PAGE());
      if (!response.stop) {
        fetch();
      }
    } catch (err) {
      fetch();
    }
  };
  fetch();
};
