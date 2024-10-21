import Link from 'next/link';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import React from 'react';
import {handleLogin, handleGenerate} from '../utils/authKey';
import catchErrors from '../utils/catchErrors';

function Dropoff() {

    return (
      <>
        <h1 className="dropoffExhibition">Please visit <span className="highlight">personendepot.ch</span><br/>
         with your personal device to
         <br/>contribute to the collection.</h1>

         <img className="exhibtionImg" src="../static/qrcode.jpeg" alt="qr code" width="100%"/>
      </>
    );
}

export default Dropoff;
