const initialStore = {
  sortByPrice: false,
  sortByTime: false,
  transfers: {
    allTransfers: true,
    withoutTransfers: true,
    oneTransfer: true,
    twoTransfers: true,
    threeTransfers: true,
  },
  ticketsFromAPI: [],
  ticketsBeforeRender: [],
  tickets: [],
  loading: false,
  error: false,
};

export default initialStore;
