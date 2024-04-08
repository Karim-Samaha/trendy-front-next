import axios from 'axios'

const _axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
})
_axios.interceptors.request.use(
  function (config) {
    let headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    }
    if (config?.session?.user?.accessToken) {
      headers['Authorization'] = `Bearer ${config.session.user.accessToken}`
    }
    if (config?.userToken) {
      headers['Authorization'] = `Bearer ${config.session.user.accessToken}`
    }
    if (!config.data) {
      config.data = {}
    }
    config.headers = headers
    // config.data.appName = process.env.NEXT_PUBLIC_API_APP_NAME
    // config.data.channel = config.data.channel ?? process.env.NEXT_PUBLIC_API_CHANNEL
    // config.data.locale = config.data.locale ?? process.env.NEXT_PUBLIC_API_LOCALE
    // config.data.storeCurrencyId = config.data.storeCurrencyId ?? process.env.NEXT_PUBLIC_API_STORE_CURRENCY_ID
    // if (config.data.store) {
    //   // config.data.locale = config.data.store.symbol
    //   config.data.storeCurrencyId = config.data.store.id
    // }
    // delete config.data.store
    return config
  },
  function (error) {
    return Promise.reject()
  }
)
_axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error(`------Error Start-----`)
    console.log(error?.response?.config?.url)
    console.table(error?.response?.data)
    console.log('------Error End-----')
    throw error
  }
)
export default _axios