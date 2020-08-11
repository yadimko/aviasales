import React from 'react';
import * as dateFns from 'date-fns';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classes from '../app/app.module.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

let id = 1;

const transferWord = (element, number) => {
  let transferWord = 'БЕЗ ПЕРЕСАДОК';
  if (element.segments[number].stops.length > 0) {
    if (element.segments[number].stops.length === 1) {
      transferWord = '1 ПЕРЕСАДКА';
    }
    if (element.segments[number].stops.length === 2) {
      transferWord = '2 ПЕРЕСАДКИ';
    }
    if (element.segments[number].stops.length === 3) {
      transferWord = '3 ПЕРЕСАДКИ';
    }
  }
  return transferWord;
};

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  if (minutes < 10) {
    minutes = `0${  minutes}`;
  }
  return `${hours  }ч ${  minutes  }м`;
};

const giveFlyTime = (date, minutesOnFly) => {
  const departDate = new Date(date);
  const arrivalDate = dateFns.addMinutes(departDate, minutesOnFly);
  let hoursDepart = departDate.getHours();
  let minutesDepart = departDate.getMinutes();
  let hoursArrival = arrivalDate.getHours();
  let minutesArrival = arrivalDate.getMinutes();
  if (hoursDepart < 10) {
    hoursDepart = `0${  hoursDepart}`;
  }
  if (minutesDepart < 10) {
    minutesDepart = `0${  minutesDepart}`;
  }
  if (hoursArrival < 10) {
    hoursArrival = `0${  hoursArrival}`;
  }
  if (minutesArrival < 10) {
    minutesArrival = `0${  minutesArrival}`;
  }
  return `${hoursDepart  }:${  minutesDepart  } - ${  hoursArrival  }:${  minutesArrival}`;
};

function Tickets({ tickets, loading }) {
  const loadIndicator = !loading ? <Spin indicator={antIcon} style={{ paddingTop: 70 }} /> : null;
  const pictureOrTickets =
    tickets.length === 0 && loading ? (
      <p style={{ width: '100%', fontSize: 32, textAlign: 'center' }}>
        <img
          src="https://cs.pikabu.ru/post_img/2013/01/21/6/1358756708_184017269.gif"
          alt="cool"
          style={{ width: 502 }}
        />
        Рейсов, подходящих под заданные фильтры, не найдено{' '}
      </p>
    ) : (
      tickets.map((element) => {
        id++;
        const { price, carrier, segments } = element;
        return (
          <div className={classes.ticket} key={id}>
            <div className={classes['ticket-header']}>
              <span className={classes.price}>{price} P</span>
              <span>
                <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="" />
              </span>
            </div>
            <div className={classes['info-block-in-ticket']}>
              <div className={classes['info-block-in-ticket-title']}>
                <span>{`${segments[0].origin} - ${segments[0].destination}`}</span>
                <span>В пути</span>
                <span className={classes['info-block-in-ticket-title-last']}>{transferWord(element, 0)}</span>
              </div>
              <div className={classes['info-block-in-ticket-info']}>
                <span>{giveFlyTime(segments[0].date, segments[0].duration)}</span>
                <span>{getTimeFromMins(segments[0].duration)}</span>
                <span className={classes['info-block-in-ticket-info-last']}>{segments[0].stops.join(', ')}</span>
              </div>
            </div>
            <div className={classes['info-block-in-ticket']}>
              <div className={classes['info-block-in-ticket-title']}>
                <span>{`${segments[1].origin} - ${segments[1].destination}`}</span>
                <span>В пути</span>
                <span className={classes['info-block-in-ticket-title-last']}>{transferWord(element, 1)}</span>
              </div>
              <div className={classes['info-block-in-ticket-info']}>
                <span>{giveFlyTime(segments[1].date, segments[1].duration)}</span>
                <span>{getTimeFromMins(segments[1].duration)}</span>
                <span className={classes['info-block-in-ticket-info-last']}>{segments[1].stops.join(', ')}</span>
              </div>
            </div>
          </div>
        );
      })
    );

  return (
    <>
      {loadIndicator}
      {pictureOrTickets}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
    loading: state.loading,
  };
};

Tickets.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Tickets);
