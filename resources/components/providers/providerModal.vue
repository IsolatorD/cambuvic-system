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
                    'Agregar Proveedor'
                    :
                    dialog.mode === 'edit' ?
                      'Actualizar Proveedor'
                      :
                      `${providerData.name}`
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
                  cols="12"
                >
                  <v-text-field
                    label='Nombre'
                    v-model="provider.name"
                    :readonly="dialog.mode === 'details' || loading"
                    v-validate="'required'"
                    :data-vv-name="'nombre'"
                    :error-messages="errors.collect('nombre')"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    label="Identificación"
                    v-model="provider.identification"
                    :readonly="dialog.mode === 'details' || loading"
                    v-validate="'required'"
                    :data-vv-name="'identificación'"
                    :error-messages="errors.collect('identificación')"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    textarea
                    label="Dirección"
                    v-model="provider.address"
                    :readonly="dialog.mode === 'details' || loading"
                    v-validate="'required'"
                    :data-vv-name="'Dirección'"
                    :error-messages="errors.collect('Dirección')"
                    required
                  ></v-text-field>
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
  name: 'ModalProvider',
  props: ['dialog', 'providerData', 'loading'],
  watch: {
    dialog (newVal, oldVal) {
      if (newVal.value === false) {
        this.id = null
        this.provider = {
          name: '',
          identification: '',
          address: ''
        }
        this.$validator.reset()
      }
    },
    providerData (newVal, oldVal) {
      if (newVal) {
        this.id = newVal.id
        this.provider.name = newVal.name
        this.provider.identification = newVal.identification
        this.provider.address = newVal.address
      }
    }
  },
  data: () => ({
    id: null,
    provider: {
      name: '',
      identification: '',
      address: ''
    }
  }),
  methods: {
    close () {
      this.id = null
      this.provider = {
        name: '',
        identification: '',
        address: ''
      }
      this.$nextTick(() => {
        this.$validator.reset()
      })
      this.$emit('close', !!this.providerData)
    },
    async save () {
      const isValid = await this.$validator.validateAll()
      if (isValid) {
        this.$emit('save', {
          id: this.id,
          provider: this.provider
        })
      }
    }
  }

}
</script>

<style>

</style>