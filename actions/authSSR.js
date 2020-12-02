import {api} from './api'
import Router from 'next/router';
import { Cookies } from 'react-cookie';

export async function handleAuthSSR(ctx) {
  const cookies = new Cookies();
  let token = null

  try {
    if (ctx.req.headers.cookie) {
      token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }
    else {
      token = cookies.get('token')
    }
    return await api('GET', "auth", {}, token)
  } catch (err) {
    if (!ctx.req.headers.cookie) {
      res.statusCode = 302
      res.setHeader('Location', `/singin`) // Replace <link> with your url link
      return {props: {}}
    } else {
      await Router.push('/singin')
    }
  }
}