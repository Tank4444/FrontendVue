const state =  {
    musiclist:[],//for music
    nowPlayedId:null,//id of player
}

const getters = {
    getMusicList: (state) => {
        return state.musiclist
    },
    getNowPlayedId: (state) => {
        return state.nowPlayedId
    },
}

const actions = {
    setMusicList:async function(context , data) {
        context.commit('musicList', data)
    },
    setNewPlayedId:async function(context , data) {
        context.commit('nowPlayed', data)
    },
}

const mutations = {
    musicList(state,data) {
        state.musiclist=data
    },
    nowPlayed(state,data){
        state.nowPlayedId=data
    }
}

export const musiclist = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
