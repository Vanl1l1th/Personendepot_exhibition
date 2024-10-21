import Link from 'next/link';
import Router, {useRouter} from 'next/router';
import NProgress from 'nprogress';
import {handleLogout} from '../../utils/auth';
import {handleKeyLogout} from '../../utils/authKey';
import ReactDOM from 'react-dom'
import React from 'react';

Router.onRouteChangeStart=()=>NProgress.start();
Router.onRouteChangeComplete=()=>NProgress.done();
Router.onRouteChangeError=()=>NProgress.done();

function Header({ user, thekey,products }) {
  const router = useRouter();
  const[showMobile,setMobile]=React.useState("mobileModalHide");

  function isActive(route){
    if(route === router.pathname){
      return "active";
    }else{
      return "";
    }
  }

  function toggleMobile(){
    if(showMobile==="mobileModalHide"){
      setMobile("mobileModalShow");
    }else{
      setMobile("mobileModalHide");
    }
  }

  return (
    <>
      <div className="topnav">
      <Link href="/">
        <p className="navleft">Personendepot,</p>
      </Link>

      <div className="navright">
        <Link href="/">
            <p className={isActive('/')}>Collection,</p>
        </Link>

        <Link href="/about">
            <p className={isActive('/about')}>Info,</p>
        </Link>

        {!thekey &&(
          <Link href="/dropoff">
            <p className={isActive('/dropoff')+" highlight dropoffnav"}>Drop-off &rarr;</p>
          </Link>
        )}

        {user && (
          <p onClick={handleLogout}>Logout Admin</p>
        )}
        {thekey && (
          <div className="dropdown">
            <Link href={`/profil?person=${thekey.person}`}>
            <p className={isActive('/profil')+" dropbtn highlight dropoffnav"}>person: {thekey.person}</p>
            </Link>
            <div className="dropdown-content">
              <div id="dropdownCode">Your Code:</div>
              <div>{thekey.code}</div>
              <div onClick={handleKeyLogout} className="dropdownLogout">Logout &rarr;</div>
            </div>
          </div>
        )}
      </div>

      <div className="mobileMenu">
        <p className="highlight" onClick={toggleMobile}>&rarr; Menu</p>
        {thekey&&(

          <p  className={isActive('/profil')+" personMobile"}>person: {thekey.person}</p>

        )}

      </div>
        </div>

        <div className={showMobile}>
          <div className="mobileOverlay">
          <Link  href="/">
              <p onClick={toggleMobile} className={isActive('/')}>Collection,</p>
          </Link>

          <Link  href="/about">
              <p onClick={toggleMobile} className={isActive('/about')}>Info,</p>
          </Link>

          {!thekey &&(
            <Link  href="/dropoff">
              <p onClick={toggleMobile} className={isActive('/dropoff')+" dropoffnav"}>Drop-off &rarr;</p>
            </Link>
          )}
          {thekey && (
            <div>
                <Link href={`/profil?person=${thekey.person}`}>
                <p  className={isActive('/profil')+" mobileProfile"} onClick={toggleMobile}>Your Profile</p>
                </Link>
                <div className="mobileCode">
                  <p>Your Code:</p>
                  <p>{thekey.code}</p>
                </div>
                <div onClick={toggleMobile}>
                <p onClick={handleKeyLogout}>Logout &rarr;</p>
                </div>
            </div>
          )}

          <p onClick={toggleMobile} className="mobileClose">x</p>
          </div>
        </div>
    </>
  );
}

export default Header;
