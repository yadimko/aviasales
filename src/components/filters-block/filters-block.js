import React from 'react';
import classes from '../app/app.module.scss';
import store from '../../store/store';

export default function FiltersBlock() {

  const all = store.getState().transfersList.length === 4 ? true : false;
  const zero = store.getState().transfersList.includes('zero') ? true : false;
  const one = store.getState().transfersList.includes('one') ? true : false;
  const two = store.getState().transfersList.includes('two') ? true : false;
  const three = store.getState().transfersList.includes('three') ? true : false;

  return (
    <div className={classes['filter-block']}>
      <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
      <ul>
        <li><label><input type='checkbox' name='all' checked={all || store.getState().transferAll} onChange={() => {store.dispatch({type: 'transferAll'})}}/>Все</label></li>
        <li><label><input type='checkbox' name='zero' checked={zero || store.getState().transferAll} onChange={() => {store.dispatch({type: 'zero'})}}/>Без пересадки</label></li>
        <li><label><input type='checkbox' name='one' checked={one || store.getState().transferAll} onChange={() => {store.dispatch({type: 'one'})}}/>1 пересадка</label></li>
        <li><label><input type='checkbox' name='two' checked={two || store.getState().transferAll} onChange={() => {store.dispatch({type: 'two'})}}/>2 пересадки</label></li>
        <li><label><input type='checkbox' name='three' checked={three || store.getState().transferAll} onChange={() => {store.dispatch({type: 'three'})}}/>3 пересадки</label></li>
      </ul>
    </div>
  )
}