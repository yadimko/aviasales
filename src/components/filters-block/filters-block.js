import React from 'react';
import { connect } from 'react-redux';
import classes from '../app/app.module.scss';
import * as actions from '../../store/actionCreators';



const FiltersBlock = ({allTransfers, withoutTransfers, oneTransfer, twoTransfers, threeTransfers,
                                       ALL_TRANSFERS_FILTER, WITHOUT_TRANSFERS_FILTER, ONE_TRANSFER_FILTER, TWO_TRANSFERS_FILTER, THREE_TRANSFER_FILTER}) => {


  return (
    <div className={classes['filter-block']}>
      <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
      <ul>
        <li><label><input type='checkbox' name='all' checked={(withoutTransfers && oneTransfer && twoTransfers && threeTransfers)} onChange={ALL_TRANSFERS_FILTER}/>Все</label></li>
        <li><label><input type='checkbox' name='zero' checked={withoutTransfers} onChange={WITHOUT_TRANSFERS_FILTER}/>Без пересадки</label></li>
        <li><label><input type='checkbox' name='one' checked={oneTransfer} onChange={ONE_TRANSFER_FILTER}/>1 пересадка</label></li>
        <li><label><input type='checkbox' name='two' checked={twoTransfers} onChange={TWO_TRANSFERS_FILTER}/>2 пересадки</label></li>
        <li><label><input type='checkbox' name='three' checked={threeTransfers} onChange={THREE_TRANSFER_FILTER}/>3 пересадки</label></li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    withoutTransfers: state.withoutTransfers,
    oneTransfer: state.oneTransfer,
    twoTransfers: state.twoTransfers,
    threeTransfers: state.threeTransfers
  };
};

export default connect(mapStateToProps, actions)(FiltersBlock);