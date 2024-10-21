import {
  Grid,
  Header,
  Menu,
  Container,
  Sidebar,
} from 'semantic-ui-react';
import guides from '../../static/guide.json';
import React from 'react';

function Guide() {
  const [theguide, setguide] = React.useState(guides);
  const [classState, setClass] = React.useState([guides[0].active,guides[1].active,guides[2].active,guides[3].active,guides[4].active,guides[5].active,]);


function handleClick(i){
  let newState=classState;
  if(classState[i]==="guideActive"){
    newState[i]="guidePasiv";
  }else{
    newState[i]="guideActive";
    console.log("dff");
  }
   setClass(newState);
}



  return (<>
    <div className="theGuide">
    {theguide.map((value,i) => {
      return(
        <div className="guideSection" key={i}>
          <p className="guideTitel" key={i}>&darr; {value.titel}</p>
          <p>{value.text}</p>
        </div>
      )
    })}
    </div>
    </>);
}

export default Guide;
