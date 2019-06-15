import ApiService from './api.service'
import {TokenService} from "./storage.service";
import {AuthenticationError} from "./user.service";

const MusicService = {
    getListOfMusic: async function(from, to) {

        const requestData = {
            method: 'GET',
            url: `/api/music/info`,
            params:{
              'from':from,
              'size':to
            },
            header: {
                'Authorization':TokenService.getToken()
            }
        }
        try {
            const response = await ApiService.customRequest(requestData)
            //console.log(response)
            return response.data
        } catch (error) {
            //console.log(error)
            return false
        }
    },

    blobToUrl(blob){
        return window.URL.createObjectURL(blob);
    },
    responceDataToUrl(resp){
        let blob = new Blob([resp], { type: 'audio/*' });
        return window.URL.createObjectURL(blob);
    },
    responceToUrl(resp){
        let blob = new Blob([resp.data], { type: 'audio/*' });
        return window.URL.createObjectURL(blob);
    },
    getMusicData: async function(id) {
        const requestData = {
            method: 'GET',
            url: '/api/music/stream?id='+id,
            responseType: 'blob',
            header:{
                'Authorization':'Bearer '+TokenService.getToken(),
            },
        }
        return await ApiService.customRequest(requestData)
    },

    getMusicUrl:async function(id){
        const resp = this.getMusicData(id);
        /*
        resp.then(
            result=>{
                let blob = new Blob([result.data]);
                return window.URL.createObjectURL(blob)
            },
            error=>{
                return null
            }
        )
         */
        resp.then(
            result=>{
                //let reader= result.data.getReader();
                //let blob = new Blob([reader.value]);
                //let url = window.URL.createObjectURL(result.data)
                //result.data.type
                let blob = new Blob([result.data], { type: 'audio/*' });
                return window.URL.createObjectURL(blob);
            },
            error=>{
                    return null
            }
        )

    },

    uploadMusic: async function(formData){
        return await ApiService.customRequest({
            method: 'POST',
            url: `/api/music/add`,
            data:formData
            ,
            header:{
                'Authorization':TokenService.getToken(),
                'Content-Type': 'multipart/form-data'
            },
        })
    },
    getCountOfMusic:async function(){
        return await ApiService.customRequest({
            method:'GET',
            url:`/api/music/size`,
            header:{
                'Authorization':'Bearer '+TokenService.getToken(),
            }
        }).data
    },

}

export default MusicService

export { MusicService }
