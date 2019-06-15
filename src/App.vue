<template>
    <v-app>
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
        <v-toolbar :fixed="true" class="primary" dark app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title v-text="'My App'"></v-toolbar-title>
        </v-toolbar>
        <v-content app>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer class="primary text-xs-center justify-center" :fixed="true" dark height="auto" app>
            <ul>
                <li>
                    <player/>
                </li>
                <li>
                    <strong>
                        &copy;{{ new Date().getFullYear() }}
                    </strong>
                </li>
            </ul>

        </v-footer>
    </v-app>
</template>
<script>
    import {TokenService} from './services/storage.service'
    import {MusicService} from "./services/music.service";
    import { mapGetters } from "vuex";
    import Player from "./components/player";

    export default {
        name: 'App',
        components: {Player},
        data: () => ({
            drawer: null,
            simpleMenu: [
                {
                    title: 'home',
                    icon: 'dashboard',
                    link: '/'
                }, {
                    title: 'about',
                    icon: 'info',
                    link: '/about'
                },
                {
                    title: 'upload',
                    icon: 'touch_app',
                    link: '/upload'
                },
            ],
            registrationMenu: [
                {
                    title: 'signin',
                    icon: 'face',
                    link: '/signin'
                },
                {
                    title: 'signup',
                    icon: 'touch_app',
                    link: '/signup'
                },

            ],
        }),
        method: {
            getListofM(from, size) {
                let resp = MusicService.getListOfMusic(from, size);
                return resp
            }
        },
        computed: {
            resp() {
                return MusicService.getListOfMusic(0, 10)
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
    li {
        list-style-type: none; /* Убираем маркеры */
    }
</style>
