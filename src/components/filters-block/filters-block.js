import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from '../app/app.module.scss';
import * as actions from '../../store/actionCreators';

const FiltersBlock = ({
  transfers,
  ALL_TRANSFERS_FILTER,
  TRANSFERS_FILTER,
}) => {
  const {withoutTransfers, oneTransfer, twoTransfers, threeTransfers} = transfers;
  return (
    <div className={classes['filter-block']}>
      <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              name="all"
              checked={withoutTransfers && oneTransfer && twoTransfers && threeTransfers}
              onChange={ALL_TRANSFERS_FILTER}
            />
            Все
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" name="zero" checked={withoutTransfers} onChange={() => {TRANSFERS_FILTER('withoutTransfers', 0)}} />
            Без пересадки
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" name="one" checked={oneTransfer} onChange={() => {TRANSFERS_FILTER('oneTransfer', 1)}} />1 пересадка
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" name="two" checked={twoTransfers} onChange={() => {TRANSFERS_FILTER('twoTransfers', 2)}} />2 пересадки
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" name="three" checked={threeTransfers} onChange={() => {TRANSFERS_FILTER('threeTransfers', 3)}} />3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transfers: state.transfers
  };
};

FiltersBlock.propTypes = {
  transfers: PropTypes.objectOf(PropTypes.bool).isRequired,
  ALL_TRANSFERS_FILTER: PropTypes.func.isRequired,
  TRANSFERS_FILTER: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(FiltersBlock);
