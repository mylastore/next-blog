import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

export const APP_NAME = publicRuntimeConfig.APP_NAME
export const API = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.API_LIVE : publicRuntimeConfig.API_DEV
export const IMG = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.IMG_LIVE : publicRuntimeConfig.IMG_DEV
export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_LIVE : publicRuntimeConfig.DOMAIN_DEV
export const FACEBOOK_ID = publicRuntimeConfig.FACEBOOK_ID
export const LIMIT = publicRuntimeConfig.LIMIT
export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME
export const GOOGLE_ID = publicRuntimeConfig.GOOGLE_ID
