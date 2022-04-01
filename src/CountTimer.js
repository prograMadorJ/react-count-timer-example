import React, { useEffect, useState } from 'react';

export default function CountTimer({
  initDays,
  initHours,
  initMinutes,
  initSeconds,
  countType,
  children,
}) {
  let date = new Date();

  const get24Hours = (hour) =>
    hour === 0 && initHours > 0 ? 0 : hour

  initDays && date.setHours((initDays + get24Hours(date.getHours())) * 24);
  initHours && date.setHours(initHours + get24Hours(date.getHours()));
  initMinutes && date.setMinutes(initMinutes + date.getMinutes());
  initSeconds && date.setSeconds(initSeconds + date.getSeconds());

  const [countTime, setCountTime] = useState({
    days: '0',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const [seconds, setSeconds] = useState(initSeconds || 0);

  if (!['up', 'down'].includes(countType)) {
    return console.error(
      '[CountTimeError] countType may be `up` or `down` but given ' + countType
    );
  }

  if (initHours > 24 && initDays <= 1) {
    console.warn(
      '[CountTimerWarning] the initHours may be less than initDays, because initDays is less days.'
    );
  }

  if (countType === 'up') {
    initDays && date.setHours(initHours + get24Hours(date.getHours()) || 0);
    date.setHours(initHours || 0);
    date.setMinutes(initMinutes || 0);
    date.setSeconds(initSeconds || 0);
  }

  let counterTimeUp = date;

  const countTimer = () => {
    let timer;

    if (countType === 'down') {
      timer = setInterval(() => timerEngine(), 1000);
    } else {
      timer = setTimeout(() => timerEngine(), 1000);
    }

    function timerEngine() {
      let totalDays;
      let totalHours;
      let totalMinutes;
      let totalSeconds;
      let remainingDayTime;

      if (countType === 'up') {
        setSeconds((sec) => sec + 1);

        counterTimeUp.setSeconds(seconds);
        counterTimeUp.setMinutes(counterTimeUp.getMinutes());
        counterTimeUp.setHours(get24Hours(counterTimeUp.getHours()));

        const h = initHours*60 || (initMinutes ? initMinutes : 0)

        totalDays =
          !initDays && (h > 24) ? Math.floor(h / (24*60)) : 0;
        totalHours = get24Hours(counterTimeUp.getHours());
        totalMinutes = counterTimeUp.getMinutes();
        totalSeconds = counterTimeUp.getSeconds();
      } else {
        const countDateTime = date.getTime();
        const currentTime = new Date().getTime();
        remainingDayTime = countDateTime - currentTime;

        totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
        totalHours = Math.floor(
          (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        totalMinutes = Math.floor(
          (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);
      }

      const padStart = (value) => value.toString().padStart(2, '0');

      if (remainingDayTime >= 0 || countType === 'up') {
        const runningCountTime = {
          days: totalDays,
          hours: padStart(totalHours),
          minutes: padStart(totalMinutes),
          seconds: padStart(totalSeconds),
        };

        setCountTime(runningCountTime);
      }

      if (remainingDayTime < 0) {
        clearInterval(timer);
      }
    }
  };

  useEffect(() => {
    countTimer();
  }, [seconds]);

  return children ? (
    <>{children(countTime)}</>
  ) : (
    <>
      <span>
        {countTime.days}
        <span> Days </span>
      </span>
      <span>:&nbsp;</span>
      <span>
        {countTime.hours}
        <span> Hours </span>
      </span>
      <span>:&nbsp;</span>
      <span>
        {countTime.minutes}
        <span> Minutes </span>
      </span>
      <span>:&nbsp;</span>
      <span>
        {countTime.seconds}
        <span> Seconds </span>
      </span>
    </>
  );
}
