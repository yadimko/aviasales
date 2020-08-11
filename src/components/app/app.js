import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import FiltersBlock from '../filters-block/filters-block';
import Tickets from '../tickets/tickets';
import * as actions from '../../store/actionCreators';
import 'antd/dist/antd.css';
import classes from './app.module.scss';
import logo from './logo.svg';

let page = 1;
function App({ ticketsBeforeRender, GET_TICKETS_FETCH, CHANGE_PAGE, SORT_BY_PRICE, SORT_BY_TIME }) {
  useEffect(() => {
    GET_TICKETS_FETCH();
  }, []);

  useEffect(() => {
    CHANGE_PAGE(page);
  }, [ticketsBeforeRender]);

  const onChange = (el) => {
    page = el;
    CHANGE_PAGE(page);
  };
  return (
    <section className={classes['master-wrapper']}>
      <div className={classes.logotype}>
        <img src={logo} alt="logo" />
      </div>
      <section className={classes['slave-wrapper']}>
        <FiltersBlock />
        <div className={classes['ticket-wrapper']}>
          <div className={classes['button-block']}>
            <button
              type="button"
              className={classes['btn-left']}
              onClick={() => {
                SORT_BY_PRICE();
                CHANGE_PAGE(page);
              }}
            >
              САМЫЙ ДЕШЕВЫЙ
            </button>
            <button
              type="button"
              className={classes['btn-right']}
              onClick={() => {
                SORT_BY_TIME();
                CHANGE_PAGE(page);
              }}
            >
              САМЫЙ БЫСТРЫЙ
            </button>
          </div>
          <Tickets />
        </div>
      </section>
      <Pagination
        className={classes['ant-pagination-block']}
        defaultCurrent={1}
        total={ticketsBeforeRender.length}
        showSizeChanger={false}
        pageSize={5}
        onChange={onChange}
      />
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    ticketsBeforeRender: state.ticketsBeforeRender,
  };
};

App.propTypes = {
  ticketsBeforeRender: PropTypes.arrayOf(PropTypes.object).isRequired,
  GET_TICKETS_FETCH: PropTypes.func.isRequired,
  CHANGE_PAGE: PropTypes.func.isRequired,
  SORT_BY_PRICE: PropTypes.func.isRequired,
  SORT_BY_TIME: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(App);
