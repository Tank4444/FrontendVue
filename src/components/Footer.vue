<template>
    <v-footer height="auto" :fixed="true" >
        <v-card
                class="flex myFooter"
                flat
                tile
        >
            <v-card-text class="primary player_panel text-xs-center">

            </v-card-text>

            <v-card-text class="primary justify-center text-xs-center">
                &copy;{{ new Date().getFullYear() }} — 1<strong>Vuetify</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>
<script>
    export default {
        data () {
            return {
                msg: 'This is player'
            }
        },
    }
</script>
<style scoped>
    .player_panel{
        height: 10vh;
    }
    .myFooter{
        width: 100%;
    }
</style>
