import React from 'react';
import * as dateFns from 'date-fns';
import { connect } from 'react-redux';
import classes from '../app/app.module.scss';

let id = 1;

const transferWord = (element, number) => {
  let transferWord = 'БЕЗ ПЕРЕСАДОК';
  if(element.segments[number].stops.length > 0){
    if ((element.segments[number].stops.length === 1)){
      transferWord = '1 ПЕРЕСАДКА';
    }
    if ((element.segments[number].stops.length === 2)){
      transferWord = '2 ПЕРЕСАДКИ';
    }
    if ((element.segments[number].stops.length === 3)){
      transferWord = '3 ПЕРЕСАДКИ';
    }
  }
  return transferWord
}

const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  if (minutes < 10){
    minutes = '0' + minutes;
  }
  return hours + 'ч ' + minutes + 'м';
};

const giveFlyTime = (date, minutesOnFly) => {
  const departDate = new Date(date)
  const arrivalDate = dateFns.addMinutes(departDate, minutesOnFly);
  let hoursDepart = departDate.getHours();
  let minutesDepart = departDate.getMinutes();
  let hoursArrival = arrivalDate.getHours();
  let minutesArrival = arrivalDate.getMinutes();
  if (hoursDepart < 10){hoursDepart = '0' + hoursDepart};
  if (minutesDepart < 10){minutesDepart = '0' + minutesDepart};
  if (hoursArrival < 10){hoursArrival = '0' + hoursArrival};
  if (minutesArrival < 10){minutesArrival = '0' + minutesArrival};
  return hoursDepart + ':' + minutesDepart + ' - ' + hoursArrival + ':' + minutesArrival
}

function Tickets({tickets}){

    const tick = tickets.map((element) => {
      id++;
      return(
        <div className={classes.ticket} key={id}>
          <div className={classes['ticket-header']}>
            <span className={classes.price}>{element.price} P</span>
            <span><img src={`//pics.avs.io/99/36/${element.carrier}.png`} alt=""/></span>
          </div>
          <div className={classes['info-block-in-ticket']}>
            <div className={classes['info-block-in-ticket-title']}>
              <span>{`${element.segments[0].origin} - ${element.segments[0].destination}`}</span>
              <span>В пути</span>
              <span className={classes['info-block-in-ticket-title-last']}>{transferWord(element, 0)}</span>
            </div>
            <div className={classes['info-block-in-ticket-info']}>
              <span>{giveFlyTime(element.segments[0].date, element.segments[0].duration)}</span>
              <span>{getTimeFromMins(element.segments[0].duration)}</span>
              <span className={classes['info-block-in-ticket-info-last']}>{element.segments[0].stops.join(', ')}</span>
            </div>
          </div>
          <div className={classes['info-block-in-ticket']}>
            <div className={classes['info-block-in-ticket-title']}>
              <span>{`${element.segments[1].origin} - ${element.segments[1].destination}`}</span>
              <span>В пути</span>
              <span className={classes['info-block-in-ticket-title-last']}>{transferWord(element, 1)}</span>
            </div>
            <div className={classes['info-block-in-ticket-info']}>
              <span>{giveFlyTime(element.segments[1].date, element.segments[1].duration)}</span>
              <span>{getTimeFromMins(element.segments[1].duration)}</span>
              <span className={classes['info-block-in-ticket-info-last']}>{element.segments[1].stops.join(', ')}</span>
            </div>
          </div>
        </div>
      )
    })


  return(
    <>
      {tick}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets
  };
};

export default connect(mapStateToProps)(Tickets);