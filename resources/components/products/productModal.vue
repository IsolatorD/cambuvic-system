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
                    'Agregar Producto'
                    :
                    dialog.mode === 'edit' ?
                      'Actualizar Producto'
                      :
                      productData.name
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
          <v-form
            ref="productForm"
          >
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    label='Nombre'
                    v-model="product.name"
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
                    label="Precio"
                    type="number"
                    min="1"
                    v-model="product.price"
                    :readonly="dialog.mode === 'details' || loading"
                    v-validate="'required'"
                    :data-vv-name="'precio'"
                    :error-messages="errors.collect('precio')"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-select
                    label="Venta Por"
                    :items="types"
                    item-value="id"
                    item-text="name"
                    v-model="product.type_sell"
                    :readonly="dialog.mode === 'details' || loading"
                    v-validate="'required'"
                    :data-vv-name="'venta por'"
                    :error-messages="errors.collect('venta por')"
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
  name: 'ModalProduct',
  props: ['dialog', 'types', 'productData', 'loading'],
  watch: {
    dialog (newVal, oldVal) {
      if (newVal.value === false) {
        this.id = null
        this.product = {
          name: '',
          price: '',
          type_sell: ''
        }
        this.$validator.reset()
      }
    },
    productData (newVal, oldVal) {
      if (newVal) {
        this.id = newVal.id
        this.product.name = newVal.name
        this.product.price = newVal.price
        this.product.type_sell = newVal.type_sell
      }
    }
  },
  data: () => ({
    id: null,
    product: {
      name: '',
      price: '',
      type_sell: ''
    }
  }),
  methods: {
    close () {
      this.id = null
      this.product = {
        name: '',
        price: '',
        type_sell: ''
      }
      this.$nextTick(() => {
        this.$validator.reset()
      })
      this.$emit('close', !!this.productData)
    },
    async save () {
      const isValid = await this.$validator.validateAll()
      if (isValid) {
        this.$emit('save', {
          id: this.id,
          product: this.product
        })
      }
    }
  }

}
</script>

<style>

</style>