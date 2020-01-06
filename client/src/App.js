import React from 'react';
import styles from './app.module.css';
import { Header } from './components/header/';
import { BtcWebSocketApp } from './containers/btcWebSocketApp';


const Main = () => {
  return (
    <>
      <Header title={'WebSocket BTCx'} />
      <div className={styles.container}>
        <BtcWebSocketApp />
      </div>
    </>
  );
}

export default Main;
