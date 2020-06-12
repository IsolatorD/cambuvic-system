<template>
  <v-container>
    <v-row
      no-gutters
    >
      <v-col
        cols="12"
        class="pt-4"
      >
        <v-card
          elevation="1"
        >
          <v-card-text>
            <v-row
              no-gutters
            >
              <v-col
                cols="3"
              >
                <v-text-field
                  label="Buscar"
                  v-model="search"
                ></v-text-field>
              </v-col>
              <v-col
                cols="2"
                offset="7"
              >
                <v-btn
                  color="primary"
                  dark
                  @click="showDialogForm({mode: 'new', value: true})"
                >
                  Agregar
                </v-btn>
              </v-col>
              <v-col
                cols="12"
                class="pa-4"
              >
                <v-data-table
                  :search="search"
                  :headers="headers"
                  :items="products"
                  :loading="tableLoading"
                >
                  <template
                    v-slot:item="{ item }"
                  >
                    <tr>
                      <td>
                        {{ item.created_at }}
                      </td>
                      <td>
                        {{
                          `${item.name}`
                        }}
                      </td>
                      <td>
                        {{ item.totalIncomes }}
                      </td>
                      <td>
                        {{ item.price }} BsS
                      </td>
                      <td>
                        {{ getTypeName(item.type_sell) }}
                      </td>
                      <td>
                        <v-menu
                          bottom
                          origin="center center"
                        >
                          <template v-slot:activator="{ on }">
                            <v-btn
                              color="primary"
                              dark
                              icon
                              v-on="on"
                            >
                              <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>

                          <v-list>
                            <v-list-item
                              @click="showDetails(item.id)"
                            >
                              <v-list-item-title>
                                Ver detalles
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item
                              @click="showAddIncome(item.id, item.name)"
                            >
                              <v-list-item-title>
                                Agregar ingreso
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <ProductForm
      :dialog="productDialog"
      :types="typeSells"
      :loading="formLoading"
      @close="closeModal"
      @save="save"
      @edit="edit"
      :productData="product"
    />
    <incomeForm
      :dialog="incomeDialog"
      :loading="formLoading"
      @close="closeAddIncome"
      @save="saveIncome"
      :productData="selectedProduct"
      :providers="providers"
    />
  </v-container>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

import ProductForm from '@/components/products/productModal'
import IncomeForm from '@/components/products/incomeModal'

export default {
  name: 'Products',
  layout: 'dashboard',
  components: {
    ProductForm,
    IncomeForm
  },
  async created () {
    this.tableLoading = true
    await this.getProducts()
    this.tableLoading = false
  },
  data: () => ({
    productDialog: {
      mode: 'new',
      value: false
    },
    incomeDialog: false,
    selectedProduct: null,
    search: '',
    tableLoading: false,
    formLoading: false,
    headers: [
      {
        text: 'Fecha de Registro',
        value: 'created_at',
        class: 'blue--text text--darken-4'
      },
      {
        text: 'Producto',
        value: 'name',
        class: 'blue--text text--darken-4'
      },
      {
        text: 'Cantidad',
        value: 'totalIncomes',
        class: 'blue--text text--darken-4'
      },
      {
        text: 'Precio',
        value: 'price',
        class: 'blue--text text--darken-4'
      },
      {
        text: 'Venta por',
        value: 'type_sell',
        class: 'blue--text text--darken-4'
      },
      {
        text: '',
        value: '',
        align: 'left',
        sortable: false,
        class: 'blue--text text--darken-4'
      }
    ],
  }),
  methods: {
    ...mapActions({
      getProducts: 'products/getProducts',
      getProduct: 'products/getProduct',
      storeProduct: 'products/storeProduct',
      updateProduct: 'products/updateProduct',
      storeIncome: 'products/storeIncome'
    }),
    ...mapMutations({
      setProduct: 'products/setProduct'
    }),
    async saveIncome (data) {
      await this.storeIncome({
        quantity: data.quantity,
        product_id: this.selectedProduct.id,
        provider_id: data.provider_id
      })
      this.closeAddIncome()
    },
    showAddIncome (id, name) {
      this.selectedProduct = {id, name}
      this.incomeDialog = true
    },
    closeAddIncome () {
      this.selectedProduct = null
      this.incomeDialog = false
    },
    async showDetails (id) {
      await this.getProduct(id)
      this.showDialogForm({ mode: 'details', value: true })
    },
    closeModal (clean) {
      this.productDialog = {
        mode: 'new',
        value: false
      }

      if (clean) {
        this.setProduct(null)
      }

    },
    edit () {
      if (this.productDialog.mode != 'edit') {
        this.productDialog.mode = 'edit'
      } else {
        this.productDialog.mode = 'details'
      }
    },
    async save (data) {
      console.log('save product', data)
      this.formLoading = true
      if (data.id) {
        await this.updateProduct({
          id: data.id,
          body: data.product
        })
        this.formLoading = false
      } else {
        await this.storeProduct(data.product)
        this.formLoading = false
      }
      this.closeModal(true)
    },
    showDialogForm (value) {
      this.productDialog = value
    },
    getTypeName (id) {
      const type = this.typeSells.find(f => f.id === id)
      return type.name
    }
  },
  computed: {
    ...mapState({
      products: ({ products: { products } }) => products,
      product: ({ products: { product } }) => product,
      typeSells: ({ products: { type_sells } }) => type_sells,
      providers: ({ providers: { providers } }) => providers
    })
  }
}
</script>