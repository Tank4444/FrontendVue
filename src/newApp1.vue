<template>
  <div id="app">
    <v-app>
      <v-toolbar app dark class="primary">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title v-text="'No Name'"></v-toolbar-title>

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

      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
        <v-footer height="auto" :fixed="true" >
          <v-card
                  class="flex myFooter"
                  flat
                  tile
          >
            <v-card-text class="primary player_panel text-xs-center">

            </v-card-text>

            <v-card-text class="primary justify-center text-xs-center">
              <strong>
                &copy;{{ new Date().getFullYear() }}
              </strong>
            </v-card-text>
          </v-card>
        </v-footer>
    </v-app>
  </div>
</template>

<script>
import {TokenService} from './services/storage.service'
import {MusicService} from "./services/music.service";
import { mapGetters,mapActions } from "vuex";

export default {
  name: 'App',
  components: {

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
      {
        title:'upload',
        icon:'touch_app',
        link:'/upload'
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
      },

    ],
  }),
  method:{
    getListofM(from, size) {
      let resp = MusicService.getListOfMusic(from,size);
      console.log(resp)
      return resp
    }
  },
  computed: {
    resp(){
      return MusicService.getListOfMusic(0,10)
    },
    ...mapGetters(
            'auth',
            [
                    'loggedIn'
            ]
    ),
    getMenu: function () {
      let men = []
      men = men.concat(this.simpleMenu)
      if (!TokenService.getToken()) {
        men = men.concat(this.registrationMenu)
      }
      return men
    },
  }


}



</script>
<style>
  .player_panel{
    height: 10vh;
  }
  .myFooter{
    width: 100%;
  }
  .content{
    margin-left: 10px;
    margin-right: 10px;
    height: 75vh;
  }
</style>
