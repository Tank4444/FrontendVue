import {MusicService} from "../services/music.service";
import ApiService from "../services/api.service";
import {Howl,Howler} from "howler"
import {TokenService} from "../services/storage.service";

const state =  {
    playlist:[],
}

const getters = {
    getList: (state) => {
        return state.playlist
    },
}

const actions = {
    setList:async function({ commit }, {from, size}) {

        try {
            const responce = await MusicService.getListOfMusic(from, size);
            for( var i = 0; i < responce.length; i++ ){
                responce[i].display=true
                /*
                const requestData = {
                    method: 'GET',
                    url: `/api/music/stream`,
                    params: {
                        'id': responce[i].id,
                    }
                }
                ApiService.setHeader()
                try {
                    const resp = await ApiService.customRequest(requestData)
                    console.log(resp)
                    let url = window.URL.createObjectURL(resp.data)
                    responce[i].howl = new Howl({
                        src: url
                    })
                } catch (error) {
                    console.log(error)
                }
                 */
                responce[i].howl=new Howl({
                    src:[`https://springbootapptest22.herokuapp.com/api/music/stream?id=`+responce[i].id],
                    headers: [
                        {
                            name: 'Authorization',
                            value: 'Bearer ' + TokenService.getToken()
                        }]
                    ,
                    html5:true,
                    volume:1,
                    buffer: true,
                })
            }

            commit('list', responce)
            return true
        } catch (e) {
            return false
        }
    },
}

const mutations = {
    list(state,data) {
        state.playlist=data;
    },

}

export const musiclist = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
