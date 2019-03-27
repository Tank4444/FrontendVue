<template>
  <div id="app">
    <v-app>
      <v-toolbar app dark class="primary">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title v-text="'No Name'"></v-toolbar-title>
        <v-autocomplete
                v-model="select"
                :loading="loading"
                :items="items"
                :search-input.sync="search"
                cache-items
                class="mx-3"
                flat
                hide-no-data
                hide-details
                label="What state are you from?"
                solo-inverted
        ></v-autocomplete>
      </v-toolbar>
      <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
      >
        <v-list>
          <v-list-tile
                  v-for="menu in getMenu"
                  :key="menu.title"
                  :to="menu.link"
          >
            <v-list-tile-action>
              <v-icon>{{ menu.icon }}</v-icon>

            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-content overflow-hidden>
        <router-view/>
      </v-content>
      <Footer/>
    </v-app>
  </div>
</template>

<script>
import Footer from "./components/Footer";

import {TokenService} from './services/storage.service'

export default {
  name: 'App',
  components: {
    Footer
  },
  data: () =>({
    drawer: null,
    simpleMenu:[
      {
        title:'home',
        icon:'dashboard',
        link:'/'
    },{
      title:'about',
        icon:'info',
        link: '/about'
    },
    ],
    registrationMenu:[
      {
        title:'signin',
        icon:'face',
        link: '/signin'
      },
      {
        title:'signup',
        icon:'touch_app',
        link:'/signup'
      }
    ],
  }),
  method:{

  },
  computed:{
    getMenu:function () {
      let men=[]
      men=men.concat(this.simpleMenu)
      if(!TokenService.getToken()) {men=men.concat(this.registrationMenu)}


      return men
    }
  }


}



</script>
<style>

</style>
