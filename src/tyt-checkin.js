const Axios = require('axios').default
const axiosCookieJarSupport = require('axios-cookiejar-support').default
const tough = require('tough-cookie')
const qs = require('querystring')
const axios = Axios.create({
  // WARNING: This value will be ignored.
  jar: new tough.CookieJar(),
  withCredentials: true,
})

// Set directly after wrapping instance.
axiosCookieJarSupport(axios)
axios.defaults.jar = new tough.CookieJar()
axios.defaults.withCredentials = true

const SCKEY = process.env.SCKEY
Axios.defaults.headers.common.cookie = process.env.COOKIE

module.exports = async function main() {
  let tyt_user = process.env.TYT_USER
  let tyt_pass = process.env.TYT_PASS
  const data = { email: tyt_user, passwd: tyt_pass, remember_me: 'week' }
  const headers = {
    referrer: 'https://tyt4.xyz/auth/login',
    origin: 'https://tyt4.xyz',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
    'cookie': ''
  }
  let loginRes = await axios.post(
    'https://tyt4.xyz/auth/login',
    qs.stringify(data),
    {
      headers,
    }
  )
  console.log(loginRes.data)
  if (!loginRes.data.ret) {
      throw new Error(loginRes.data.msg)
  }
  let checkinRes = await axios.post('https://tyt4.xyz/user/checkin', '', {
      headers: { cookie: ''}
  })
  console.log(checkinRes.data)
  if (!checkinRes.data.ret) {
      throw new Error(checkinRes.data.msg)
  }
}
