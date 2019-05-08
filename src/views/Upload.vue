<template>
    <div>
        <div class="large-12 medium-12 small-12 cell">
            <label>
                <h1>List of Music</h1>
                <input type="file"
                       id="files"
                       ref="files"
                       multiple
                       accept="audio/*"
                       v-on:change="handleFilesUpload()"
                />
            </label>
        </div>
        <div class="large-12 medium-12 small-12 cell">
            <div v-for="(file, key) in files"
                 class="file-listing"
            >
                {{ file.name }}
                <br>
                    <v-btn color="error" v-on:click="removeFile( key )">
                        Remove
                    </v-btn>
            </div>
        </div>
        <v-divider></v-divider>
        <div class="large-12 medium-12 small-12 cell">
            <v-btn color="blue" v-on:click="addFiles()">Add Files</v-btn>
        </div>
        <div class="large-12 medium-12 small-12 cell">
            <v-btn color="green" v-on:click="submitFiles()"
                   :disabled="uploading">Submit</v-btn>
        </div>
        <v-snackbar
                v-model="snackbar"
                :bottom="y === 'bottom'"
                :left="x === 'left'"
                :multi-line="mode === 'multi-line'"
                :right="x === 'right'"
                :timeout="timeout"
                :top="y === 'top'"
                :vertical="mode === 'vertical'"
        >
            {{ text }}
            <v-btn
                    color="pink"
                    flat
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import {MusicService} from "../services/music.service";

    export default {
        data(){
            return {
                files: [],
                snackbar: false,
                y: 'top',
                x: null,
                mode: '',
                timeout: 6000,
                text:"",
                uploading:false
            }
        },
        methods: {
            addFiles(){
                this.$refs.files.click();
            },

            submitFiles:async function(){
                this.uploading=true
                for( var i = 0; i < this.files.length; i++ ){
                    //let file = this.files[i];
                    let formData = new FormData();
                    formData.append("music", this.files[i]);
                    try {
                        let response = await MusicService.uploadMusic(formData);
                        this.text="Success"
                        this.snackbar=true
                        console.log("Success "+response.toString())
                        this.removeFile(i)
                    }catch (e) {
                        this.text="Faild"
                        this.snackbar=true
                        console.log("Faild "+e)
                    }
                }
                this.uploading=false
                if(this.files.length>0)this.submitFiles();
            },
            handleFilesUpload(){
                let uploadedFiles = this.$refs.files.files;
                for( var i = 0; i < uploadedFiles.length; i++ ){
                    this.files.push( uploadedFiles[i] );
                }
            },
            removeFile( key ){
                this.files.splice( key, 1 );
            }
        }
    }
</script>

<style>
    input[type="file"]{
        position: absolute;
        top: -500px;
    }
    div.file-listing{
        width: 200px;
    }

    span.remove-file{
        color: red;
        cursor: pointer;
        float: right;
    }
</style>
