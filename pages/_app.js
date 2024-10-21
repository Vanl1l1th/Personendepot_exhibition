import App from "next/app";
import Layout from '../components/_App/Layout';
import {parseCookies, destroyCookie} from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from "axios";
import {redirectUser} from '../utils/auth';
import {redirectKey} from '../utils/authKey';
import Router from 'next/router';

class MyApp extends App {
  static async getInitialProps({Component,ctx}){
    const {token, tokenKey} =parseCookies(ctx);
    let pageProps = {};

    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx)
    }

    //handel admin autherization
    if (!token) {
      const isProtectedRoute = ctx.pathname === "/edit";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;
        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);
        destroyCookie(ctx, "token")
        redirectUser(ctx,'/login')
      }
    }
    //handle key autherization
    if (!tokenKey) {
      const isProtectedRoute = ctx.pathname === "/profil";
      if (isProtectedRoute) {
        redirectKey(ctx, "/dropoff");
      }
    } else {
      try {
        const payload = { headers: { Authorization: tokenKey } };
        const url = `${baseUrl}/api/profil`;
        const response = await axios.get(url, payload);
        const key = response.data;
        pageProps.thekey = key;
      } catch (error) {
        console.error("Error getting current key", error);
        destroyCookie(ctx, "tokenKey")
        redirectUser(ctx,'/dropoff')
      }
    }
    return {pageProps}
  }
  componentDidMount() {
    window.addEventListener('storage',this.syncLogout)
  }
  syncLogout = event =>{
    if(event.key === 'logout'){
      Router.push('/login')
    }
    if(event.key === 'removeKey'){
      Router.push('/dropoff')
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    return(
      <Layout{...pageProps}>
        <Component{...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
