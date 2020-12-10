import fetch from "isomorphic-fetch"
import {API} from "../../config"
import {handleSession} from "../auth"

export const apiForm = (method, path, data, token) => {
  return fetch(`${API}/${path}`, {
    method: `${method}`,
    headers: {
      Accept: 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {})
    },
    body: data
    })
    .then(async (res) =>{
     await handleSession(res)
      return res.json();
    })
    .catch((err) => {
      return  {
        status: 502,
        message: 'Oops! Something is wrong. Please try later.'
      }
    })
}

export const api = (method, path, data, token) => {
  if (method === "GET" || method === "DELETE") {
    return fetch(`${API}/${path}`, {
      method: `${method}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? {Authorization: `Bearer ${token}`} : {})
      },
    })
      .then(async (res) => {
        await handleSession(res)
        return res.json()
      })
      .catch((err) => {
        return  {
          status: 502,
          message: 'Oops! Something is wrong. Please try later.'
        }
      })
  } else {
    return fetch(`${API}/${path}`, {
      method: `${method}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? {Authorization: `Bearer ${token}`} : {})
      },
      body: JSON.stringify(data)
    })
      .then(async (res) => {
        await handleSession(res)
        return res.json();
      })
      .catch((err) => {
        return  {
          status: 502,
          message: 'Oops! Something is wrong. Please try later.'
        }
      })
  }

}