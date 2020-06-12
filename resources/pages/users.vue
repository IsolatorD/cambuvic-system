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
                  :items="users"
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
                          `${item.first_name}`
                        }}
                      </td>
                      <td>
                        {{ item.last_name }}
                      </td>
                      <td>
                        {{ item.email }}
                      </td>
                      <td>
                        {{ getRoleName(item.role) }}
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
    <UserForm
      :dialog="userDialog"
      :roles="roles"
      :loading="formLoading"
      @close="closeModal"
      @save="save"
      @edit="edit"
      :userData="user"
    />
  </v-container>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

import UserForm from '@/components/users/userModal'

export default {
  name: 'Users',
  layout: 'dashboard',
  components: {
    UserForm
  },
  async created () {
    this.tableLoading = true
    await this.getUsers()
    this.tableLoading = false
  },
  data: () => ({
    userDialog: {
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
        value: 'first_name',
        class: 'blue--text text--darken-4'
      },
      {
        text: 'Apellido',
        value: 'last_name',
        class: 'blue--text text--darken-4'
      },
      {
        text: 'Correo',
        value: 'email',
        class: 'blue--text text--darken-4'
      },
      {
        text: 'Rol',
        value: 'role',
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
      getUsers: 'users/getUsers',
      getUser: 'users/getUser',
      storeUser: 'users/storeUser',
      updateUser: 'users/updateUser'
    }),
    ...mapMutations({
      setUser: 'users/setUser'
    }),
    async showDetails (id) {
      await this.getUser(id)
      this.showDialogForm({ mode: 'details', value: true })
    },
    closeModal (clean) {
      this.userDialog = {
        mode: 'new',
        value: false
      }

      if (clean) {
        this.setUser(null)
      }

    },
    edit () {
      if (this.userDialog.mode != 'edit') {
        this.userDialog.mode = 'edit'
      } else {
        this.userDialog.mode = 'details'
      }
    },
    async save (data) {
      console.log('save user', data)
      this.formLoading = true
      if (data.id) {
        await this.updateUser({
          id: data.id,
          body: data.user
        })
        this.formLoading = false
      } else {
        await this.storeUser(data.user)
        this.formLoading = false
      }
      this.closeModal(true)
    },
    showDialogForm (value) {
      this.userDialog = value
    },
    getRoleName (id) {
      const role = this.roles.find(f => f.id === id)
      return role.name
    }
  },
  computed: {
    ...mapState({
      users: ({ users: { users } }) => users,
      user: ({ users: { user } }) => user,
      roles: ({ users: { roles } }) => roles
    })
  }
}
</script>