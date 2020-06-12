<template>
  <v-row>
    <v-dialog
      v-model="dialog"
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
                Agregar Ingreso
              </span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form
            ref="productForm"
          >
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    label="Cantidad"
                    type="number"
                    min="1"
                    v-model="income.quantity"
                    :readonly="loading"
                    v-validate="'required'"
                    :data-vv-name="'Cantidad'"
                    :error-messages="errors.collect('Cantidad')"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-select
                    label="Proveedor"
                    :items="providers"
                    item-value="id"
                    item-text="name"
                    v-model="income.provider_id"
                    :readonly="loading"
                  ></v-select>
                  <!-- v-validate="'required'"
                  :data-vv-name="'venta por'"
                  :error-messages="errors.collect('venta por')"
                  required -->
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
  name: 'ModalIncome',
  props: ['dialog', 'productData', 'loading', 'providers'],
  watch: {
    dialog (newVal, oldVal) {
      if (newVal.value === false) {
        this.icome = {
          quantity: '',
          provider_id: null
        }
        this.$validator.reset()
      }
    },
    productData (newVal, oldVal) {
      if (newVal) {

      }
    }
  },
  data: () => ({
    income: {
      quantity: '',
      provider_id: null
    }
  }),
  methods: {
    close () {
      this.product = {
        quantity: '',
        provider_id: null
      }
      this.$nextTick(() => {
        this.$validator.reset()
      })
      this.$emit('close', !!this.productData)
    },
    async save () {
      const isValid = await this.$validator.validateAll()
      if (isValid) {
        this.$emit('save', this.income)
      }
    }
  }

}
</script>

<style>

</style>