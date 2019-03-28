<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Join Form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field prepend-icon="person" name="email" label="Email" type="email"
                                          v-model="email" required>
                            </v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password" id="password"
                                          type="password" required v-model="password">
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="handleSubmit">Sign In</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import { mapGetters, mapActions } from "vuex";
    export default {
        data() {
            return {
                email: "",
                password: "",
            };
        },
        computed: {
            ...mapGetters('auth', [
                'authenticating',
                'authenticationError',
                'authenticationErrorCode'
            ])
        },
        methods: {
            ...mapActions('auth', [
                'login'
            ]),
            handleSubmit() {
                // Perform a simple validation that email and password have been typed in
                if (this.email != '' && this.password != '') {
                    this.login({email: this.email, password: this.password})
                    this.password = ""
                }
            }
        }
    };
</script>
