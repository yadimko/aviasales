import React from 'react';
import classes from './app.module.scss';
import logo from './logo.svg'
import s7logo from './S7 Logo.png'
import FiltersBlock from '../filters-block/filters-block';


export default function App() {

  return(
    <section className={classes['master-wrapper']}>
      <div className={classes.logotype}><img src={logo} alt='logo' /></div>
      <section className={classes['slave-wrapper']}>
        <FiltersBlock />
        <div className={classes['ticket-wrapper']}>
          <div className={classes['button-block']}>
            <button className={classes['btn-left']} autoFocus>САМЫЙ ДЕШЕВЫЙ</button>
            <button className={classes['btn-right']}>САМЫЙ БЫСТРЫЙ</button>
          </div>
          <div className={classes.ticket}>
            <div className={classes['ticket-header']}>
              <span className={classes.price}>13 400 P</span>
              <span><img src={s7logo} alt=""/></span>
            </div>
            <div className={classes['info-block-in-ticket']}>
              <div className={classes['info-block-in-ticket-title']}>
                <span>MOW – HKT</span>
                <span>В пути</span>
                <span className={classes['info-block-in-ticket-title-last']}>2 пересадки</span>
              </div>
              <div className={classes['info-block-in-ticket-info']}>
                <span>10:45 – 08:00</span>
                <span>21ч 15м</span>
                <span className={classes['info-block-in-ticket-info-last']}>HKG, JNB</span>
              </div>
            </div>
            <div className={classes['info-block-in-ticket']}>
              <div className={classes['info-block-in-ticket-title']}>
                <span>MOW – HKT</span>
                <span>В пути</span>
                <span className={classes['info-block-in-ticket-title-last']}>1 пересадка</span>
              </div>
              <div className={classes['info-block-in-ticket-info']}>
                <span>11:20 – 00:50</span>
                <span>13ч 30м</span>
                <span className={classes['info-block-in-ticket-info-last']}>HKG</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}