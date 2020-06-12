<template>
  <v-row>
    <v-dialog
      v-model="dialog.value"
      persistent max-width="500px"
    >
      <v-card>
        <v-card-title>
          <v-row>
            <v-col
              cols="11"
              :style="{
                paddingTop: 0,
                paddingBotton: 0
              }"
            >
              <span class="headline">
                {{ dialog.mode === 'new' ?
                    'Agregar Usuario'
                    :
                    dialog.mode === 'edit' ?
                      'Actualizar Usuario'
                      :
                      `${userData.first_name} ${userData.last_name}`
                }}
              </span>
            </v-col>
            <v-col
              v-if="dialog.mode != 'new'"
              cols="1"
              :style="{
                paddingTop: 0,
                paddingBotton: 0
              }"
            >
              <v-btn
                icon
                color="primary"
                @click="$emit('edit')"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="6"
                >
                  <v-text-field
                    label='Nombre'
                    v-model="user.first_name"
                    :readonly="dialog.mode === 'details' || loading"
                    v-validate="'required'"
                    :data-vv-name="'nombre'"
                    :error-messages="errors.collect('nombre')"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-text-field
                    label="Apellido"
                    v-model="user.last_name"
                    :readonly="dialog.mode === 'details' || loading"
                    v-validate="'required'"
                    :data-vv-name="'apellido'"
                    :error-messages="errors.collect('apellido')"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    label="Correo electronico"
                    v-model="user.email"
                    :readonly="dialog.mode === 'details' || loading"
                    v-validate="'required'"
                    :data-vv-name="'email'"
                    :error-messages="errors.collect('email')"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                  v-if="!userData"
                >
                  <v-text-field
                    label="Contraseña"
                    v-model="user.password"
                    :readonly="dialog.mode === 'details' || loading"
                    v-validate="dialog.mode === 'new' ? 'required' : ''"
                    :data-vv-name="'contraseña'"
                    :error-messages="errors.collect('contraseña')"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-select
                    label="Rol"
                    :items="roles"
                    item-value="id"
                    item-text="name"
                    v-model="user.role"
                    :readonly="dialog.mode === 'details' || loading"
                    v-validate="'required'"
                    :data-vv-name="'rol'"
                    :error-messages="errors.collect('rol')"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="close"
            :disabled="loading"
            dark
          >
            Cerrar
          </v-btn>
          <v-btn
            color="primary"
            dark
            :loading="loading"
            @click="save"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ModalUser',
  props: ['dialog', 'roles', 'userData', 'loading'],
  watch: {
    dialog (newVal, oldVal) {
      if (newVal.value === false) {
        this.id = null
        this.user = {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          role: ''
        }
        this.$validator.reset()
      }
    },
    userData (newVal, oldVal) {
      if (newVal) {
        this.id = newVal.id
        this.user.first_name = newVal.first_name
        this.user.last_name = newVal.last_name
        this.user.email = newVal.email
        this.user.role = newVal.role
      }
    }
  },
  data: () => ({
    id: null,
    user: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: ''
    }
  }),
  methods: {
    close () {
      this.id = null
      this.user = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: ''
      }
      this.$nextTick(() => {
        this.$validator.reset()
      })
      this.$emit('close', !!this.userData)
    },
    async save () {
      const isValid = await this.$validator.validateAll()
      if (isValid) {
        Object.keys(this.user).map(key => {
          if (this.user[key] === '') {
            delete this.user[key]
          }
        })
        this.$emit('save', {
          id: this.id,
          user: this.user
        })
      }
    }
  }

}
</script>

<style>

</style>