export const SORT_BY_PRICE = () => ({ type: 'SORT_BY_PRICE' });

export const SORT_BY_TIME = () => ({ type: 'SORT_BY_TIME' });

export const ALL_TRANSFERS_FILTER = () => ({ type: 'ALL_TRANSFERS_FILTER' });

export const TRANSFERS_FILTER = (name, num) => ({ type: 'TRANSFERS_FILTER', name, num});

export const CHANGE_PAGE = (number) => ({ type: 'CHANGE_PAGE', payload: number });
