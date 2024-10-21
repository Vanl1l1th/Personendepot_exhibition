import cookie from 'js-cookie'
import Router from 'next/router'

export function handleLogin({tokenKey, person}){
  cookie.set('tokenKey', tokenKey);
  Router.push(`/profil?person=${person}`);
}

export function handleGenerate({tokenKey}){
  cookie.set('tokenKey', tokenKey);
  Router.push('/dropoff');
}

export function redirectKey(ctx, location){
  if(ctx.req){
    ctx.res.writeHead(302,{Location: location})
    ctx.res.end();
  }else{
    Router.push(location);
  }
}

export function handleKeyLogout(){
  cookie.remove('tokenKey');
  window.localStorage.setItem('removeKey',Date.now())
  Router.push('/');
}
