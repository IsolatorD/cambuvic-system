export default function ({ $axios, store }) {
  $axios.onRequest(() => {
    const token = store.getters['auth/token']
    if (token) {
      $axios.setToken(token, 'Bearer')
    }
  })

  $axios.onResponse(() => {
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status, 10)
    if (code === 400) {
      // redirect('/400')
    }
  })
}
