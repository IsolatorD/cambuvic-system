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
                  :items="providers"
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
                        {{
                          `${item.identification}`
                        }}
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
    <ProviderForm
      :dialog="providerDialog"
      :loading="formLoading"
      @close="closeModal"
      @save="save"
      @edit="edit"
      :providerData="provider"
    />
  </v-container>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

import ProviderForm from '@/components/providers/providerModal'

export default {
  name: 'Providers',
  layout: 'dashboard',
  components: {
    ProviderForm
  },
  async created () {
    this.tableLoading = true
    await this.getProviders()
    this.tableLoading = false
  },
  data: () => ({
    providerDialog: {
      mode: 'new',
      value: false
    },
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
        text: 'Nombre',
        value: 'name',
        class: 'blue--text text--darken-4'
      },
      {
        text: 'Identificación',
        value: 'indentification',
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
      getProviders: 'providers/getProviders',
      getProvider: 'providers/getProvider',
      storeProvider: 'providers/storeProvider',
      updateProvider: 'providers/updateProvider'
    }),
    ...mapMutations({
      setProvider: 'providers/setProvider'
    }),
    async showDetails (id) {
      await this.getProvider(id)
      this.showDialogForm({ mode: 'details', value: true })
    },
    closeModal (clean) {
      this.providerDialog = {
        mode: 'new',
        value: false
      }

      if (clean) {
        this.setProvider(null)
      }

    },
    edit () {
      if (this.providerDialog.mode != 'edit') {
        this.providerDialog.mode = 'edit'
      } else {
        this.providerDialog.mode = 'details'
      }
    },
    async save (data) {
      console.log('save provider', data)
      this.formLoading = true
      if (data.id) {
        await this.updateProvider({
          id: data.id,
          body: data.provider
        })
        this.formLoading = false
      } else {
        await this.storeProvider(data.provider)
        this.formLoading = false
      }
      this.closeModal(true)
    },
    showDialogForm (value) {
      this.providerDialog = value
    },
  },
  computed: {
    ...mapState({
      providers: ({ providers: { providers } }) => providers,
      provider: ({ providers: { provider } }) => provider
    })
  }
}
</script>