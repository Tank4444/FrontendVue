import ApiService from './api.service'
import {TokenService} from "./storage.service";

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

            console.log(response)

            return response.data
        } catch (error) {
            console.log(error)
            return false
        }
    },
    getMusicData: async function(id) {
        let params=new URLSearchParams();
        params.append('id',id)
        const requestData = {
            method: 'POST',
            url: `api/music/stream`,
            data:params,
        }
        try {
            const response = await ApiService.customRequest(requestData)

            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
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
    }
}

export default MusicService

export { MusicService }
