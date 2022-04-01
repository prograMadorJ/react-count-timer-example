import React from 'react';
import CountTimer from './CountTimer';

export default function App() {
  return (
    <>
    <h1>React Count Timer Example</h1>
      <CountTimer countType={'down'} initHours={2}>
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
