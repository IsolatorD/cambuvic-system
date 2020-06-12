<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant="drawer"
      :clipped="clipped"
      fixed
      app
      mobile-break-point="600"
      dark
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dark
      color="green"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-btn
        to="/profile"
        text
        style="height: 100%"
        class="mr-2"
      >
        <div
          v-if="$vuetify.breakpoint.mdAndUp"
        >
          <strong v-if="user">{{ user.first_name }} {{ user.last_name }}</strong>
        </div>
        <v-avatar
          size="40"
          color="white"
          v-else
        >
          <strong
            v-if="user"
            class="green--text"
          >
            {{ user.first_name[0] }}{{ user.last_name ? user.last_name[0] : '' }}
          </strong>
        </v-avatar>
      </v-btn>
      <v-btn
        style="zoom: 90%"
        rounded
        outlined
        @click="logout"
      >
        <span
          v-if="$vuetify.breakpoint.mdAndUp"
        >
          Cerrar Sesión
        </span>
        <v-icon
          v-else
        >
          mdi-logout
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Productos',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'Usuarios',
          to: '/users'
        },
        {
          icon: 'mdi-group',
          title: 'Proveedores',
          to: '/providers'
        }
      ],
      miniVariant: false,
      right: true,
      title: 'Fruteria'
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logOut').then(() => {
        this.$router.push('/')
        setTimeout(() => {
          this.$router.go('/')
        }, 100)
      })
    },
  },
  computed: {
    ...mapState({
      user: ({ auth: { user } }) => user
    })
  }
}
</script>
