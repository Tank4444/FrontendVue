<template>
    <div>
    <ul>
        <li>
           {{nameOfMusic}}
        </li>
        <li>
            <v-btn>прошлый</v-btn>
            <v-btn>стоп</v-btn>
            <v-btn v-if="!played" @click="play()">играть</v-btn>
            <v-btn v-else>пауза</v-btn>
            <v-btn>следующий</v-btn>

        </li>
    </ul>
    </div>
</template>
<script>
    import { mapGetters,mapActions } from "vuex";
    import MusicService from "../services/music.service";
    import {Howl,Howler} from 'howler'

    export default {
        data: () => ({
            howler:new Howl({
                src:this.playl,
                html5:true,
                preload:true,
                volume:0.5,
            }),
            nameOfMusic:0,
            played:false,
        }),
        methods:{
            ...mapActions('musiclist', [
                'setMusicList',
                'setNowPlayedId'
            ]),
            async play(){
                let arr=this.getMusicList;
                if(!arr){
                    let list=MusicService.getListOfMusic(0,10)
                    list.then(
                        result=>{
                            this.setMusicList(result)
                        },
                    )
                    //this.setMusicList(await MusicService.getListOfMusic(0,10))
                    this.setNowPlayedId(0)
                }
                let playid=this.getNowPlayedId
                if(!playid){
                    this.setNowPlayedId(0)
                    playid=0
                }
                if(!arr[playid].hasOwnProperty('howler')){
                    let res= MusicService.getMusicUrl(arr[playid].id)
                    /*
                    if(res){
                        arr[playid].howler=new Howl({
                            src:[res],
                            html5:true,
                            preload:true,
                            volume:0.5,
                        })
                        arr[playid].howler.play()
                    }
                    */
                    res.then(
                        response=>{
                            this.getMusicList[this.getNowPlayedId].howler=
                            arr[playid].howler=new Howl({
                                src:[response],
                                html5:true,
                                preload:true,
                                volume:0.5,
                            })
                            arr[playid].howler.play()
                        },
                        error=>{
                            console.log(error)
                        }
                    )
                    /*
                    res.then(
                        response=>{
                            arr[playid].howler=new Howl({
                                src:[response],
                                html5:true,
                                preload:true,
                                volume:0.5,
                            })
                            arr[playid].howler.play()
                        },
                        error=>{
                            console.log(error)
                        }
                    )
                     */

                }else{
                    arr[this.getNowPlayedId].howler.play()
                }
            },
        },
        computed:{
            ...mapGetters('musiclist',[
                'getMusicList',
                'getNowPlayedId'
            ]),
            playl:[]
        },

    }
</script>
<style scoped>
    li {
        list-style-type: none; /* Убираем маркеры */
    }
</style>
