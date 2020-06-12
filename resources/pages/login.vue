<template>
  <v-container>
    <v-row
      no-gutters
      align="center"
      class="mt-12"
      justify="center"
    >
      <v-card
        width="400"
        class="mt-12"
        elevation="3"
      >
        <v-card-text>
          <v-form
            ref="signInForm"
            @submit.prevent="sign"
          >
            <v-container>
              <v-col
                cols="12"
                class="pb-8"
              >
                <v-row
                  align="center"
                  justify="center"
                >
                  <v-btn
                    text
                    to="/"
                    class="no-decoration">
                    <h1
                      class="green--text"
                      style="font-size: 30px"
                    >
                      <b>
                        Cambuvic
                      </b>
                    </h1>
                  </v-btn>
                </v-row>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="email"
                  label="Correo electronico"
                  v-validate="'required'"
                  :data-vv-name="'correo electronico'"
                  :error-messages="errors.collect('correo electronico')"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="password"
                  label="Contraseña"
                  type="password"
                  v-validate="'required'"
                  :data-vv-name="'contraseña'"
                  :error-messages="errors.collect('contraseña')"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-row
                  align="center"
                  justify="center"
                >
                  <v-btn
                    dark
                    color="green"
                    block
                    type="submit"
                    :disabled="loading"
                    :loading="loading"
                  >
                    Ingresar
                  </v-btn>
                </v-row>
              </v-col>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  auth: false,
  middleware: 'guest',
  layout: 'auth',
  data: () => ({
    loading: false,
    email: null,
    password: null
  }),
  methods: {
    async sign () {
      const isValid = await this.$validator.validateAll()
      if (isValid) {
        this.loading = true
        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
          this.loading = false
          if (localStorage.getItem('auth.redirect')) {
            if (localStorage.getItem('auth.redirect') === '/') {
              this.$router.go('/')
            } else {
              this.$router.push(localStorage.getItem('auth.redirect'))
            }
          } else {
            this.$router.go('/')
          }
        } catch (error) {
          this.loading = false
          this.$toast.global.error('Email/Contraseña invalido')
          console.log('Ocurrio un error', error)
        }
      }
    }
  }
}
</script>

<style>

</style>