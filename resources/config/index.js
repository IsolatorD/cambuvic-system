require('dotenv').config()

const configAuth = {
  rewriteRedirects: true,
  fullPathRedirect: true,
  watchLoggedIn: true,
  redirect: {
    login: '/login'
  },
  strategies: {
    local: {
      endpoints: {
        login: {
          url: '/auth/login',
          method: 'post',
          propertyName: 'token.token'
        },
        logout: { url: '/auth/logout', method: 'post' },
        user: { url: '/profile', method: 'get', propertyName: false }
      }
    }
  }
}

const configAxios = {
  baseURL: process.env.URL_ENV,
  credentials: false
}

const baseURL = process.env.APP_URL

const configVuetify = {
  customVariables: ['~/assets/variables.scss'],
  theme: {
    dark: false
  }
}

const configToast = {
  position: 'top-right',
  register: [
    {
      name: 'success',
      message: message => message,
      options: { theme: 'toasted-primary', duration: 5000, icon: false }
    },
    {
      name: 'error',
      message: message => message,
      options: { type: 'error', duration: 5000, icon: false }
    }
  ]
}

const configValidate = {
  lang: 'es'
}

module.exports = { configAuth, configAxios, configVuetify, configToast, configValidate, baseURL }
