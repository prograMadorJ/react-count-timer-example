import React from 'react';
import CountTimer from './CountTimer';

export default function App() {
  return (
    <>
      <h1>React Count Timer Example</h1>
      <h2>⏱⬇ Count down</h2>
      <CountTimer countType={'down'} initDays={1}>
        {({ days, hours, minutes, seconds }) => {
          return (
            <>
              <span>{days}d </span>
              <span>{hours}h </span>
              <span>{minutes}m </span>
              <span>{seconds}s </span>
            </>
          );
        }}
      </CountTimer>
      <hr />
      <h2>⏱⬆ Count up</h2>
      <CountTimer countType={'up'} initDays={1}>
        {({ days, hours, minutes, seconds }) => {
          return (
            <>
              <span>{days}d </span>
              <span>{hours}h </span>
              <span>{minutes}m </span>
              <span>{seconds}s </span>
            </>
          );
        }}
      </CountTimer>
    </>
  );
}
