import parseCookies from "../helpers/parseCookies";

export default async function isAuth(req) {
  const cookies = parseCookies(req)
  if (cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      }
    }
  } else {
    return {
      props: {}
    }
  }
}