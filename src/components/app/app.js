import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import FiltersBlock from '../filters-block/filters-block';
import Tickets from '../tickets/tickets';
import * as actions from '../../store/actionCreators';
import 'antd/dist/antd.css';
import classes from './app.module.scss';
import logo from './logo.svg'


let page = 1;
function App({ticketsFromAPI, GET_TICKETS_FETCH, CHANGE_PAGE, SORT_BY_PRICE, SORT_BY_TIME}) {

  useEffect(() => {
    GET_TICKETS_FETCH()
  }, [])

  const onChange = (e) => {
    page = e;
    CHANGE_PAGE(page);
  }
  return(
    <section className={classes['master-wrapper']}>
      <div className={classes.logotype}><img src={logo} alt='logo' /></div>
      <section className={classes['slave-wrapper']}>
        <FiltersBlock/>
        <div className={classes['ticket-wrapper']}>
          <div className={classes['button-block']}>
            <button className={`${classes['btn-left']} ${classes['btn-active']}`} onClick={()=>{SORT_BY_PRICE(); CHANGE_PAGE(page)}}>САМЫЙ ДЕШЕВЫЙ</button>
            <button className={classes['btn-right']} onClick={()=>{SORT_BY_TIME(); CHANGE_PAGE(page)}}>САМЫЙ БЫСТРЫЙ</button>
          </div>
          <Tickets />
        </div>
      </section>
      <Pagination className={classes['ant-pagination-block']} defaultCurrent={1} total={ticketsFromAPI.length} showSizeChanger={false} pageSize={5} onChange={onChange}/>
    </section>
  )
}


const mapStateToProps = (state) => {
  return{
    ticketsFromAPI: state.ticketsFromAPI
  }
}

export default connect(mapStateToProps, actions)(App);

