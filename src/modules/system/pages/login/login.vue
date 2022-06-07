<template v-cloak>
    <div class="main-bg"  v-if="ifNotLogged">
        <el-row class="row-bg" justify="center" align="middle">
        <div class="form-wrapper" style="{ boxShadow: `var(--el-box-shadow-base)` }">
            <h3>{{$t('common.signIn')}}</h3>
            <el-form :model="form">
                <el-form-item>
                    <el-input
                        v-model="emailInput"
                        class="w-50 m-2"
                        :placeholder="$t('common.email')"
                        :prefix-icon="Message"
                    />
                </el-form-item>
                <el-form-item>
                <el-input
                    v-model="passwordInput"
                    type="password"
                    :placeholder="$t('common.password')"
                    show-password
                    :prefix-icon="Lock"
                    v-on:keyup.enter="onSubmit"
                />
                </el-form-item>
                <div>
                    <!-- <el-checkbox v-model="keepSignedIn" class="keep-signed" :label="$t('common.keepSignedIN')" size="large"></el-checkbox> -->
                </div>
                <el-button type="primary" @click="onSubmit" class="submit" style="{ boxShadow: `var(--el-box-shadow-base)` }">{{$t('common.signIn')}}</el-button>

                <!-- <el-link type="primary" class="forget-password">Forgot your Password?</el-link> -->
            </el-form>

            <p v-if="wrongLogin" class="red-text">{{$t('common.tryAgain')}}</p>
        </div>
         </el-row>
         
    </div>
</template>

<script setup>
    import i18n from '@/i18n.js';
    import axios from 'axios'
    import { useStore } from 'vuex'
    import { useCookies } from "vue3-cookies";
    import { onMounted } from 'vue';

    import { useRouter } from 'vue-router'
    import { Message, Lock } from '@element-plus/icons';
    import { ref } from 'vue'
    const emailInput = ref("");
    const passwordInput = ref("");
    const store = useStore()
     i18n.global.locale.value = store.state.main.currentLocale
    let wrongLogin = ref(false);
    let keepSignedIn = ref(false);
    let ifNotLogged = ref(false);
    ifNotLogged.value = false
    const router = useRouter()

    const { cookies } = useCookies();
    onMounted(() => {
        if (cookies.get("token")) {
            router.push({
                name: store.state.main.homeLink
            });
        }
        else{
            ifNotLogged.value = true;
        }
    })
    function onSubmit(){
        axios
            .post('Account/token', {
                "email": emailInput.value,
                "password": passwordInput.value
            }).catch((error)=> {
                    console.log('error', error)
                    wrongLogin.value = true;
            })
            .then(res => {
                store.commit('main/setToken', res);
                if (keepSignedIn.value) {
                    // cookies.set("token", `bearer ${res}`)
                }
            }).then(() => {
                axios.get('Account/Profile')
                .then(res => {
                    store.commit('main/setLoggedUser', res);
                    if (res.authorities == "Administrator"){ // Kitchen //Room
                        store.commit('main/setHomeLink', "system");
                        router.push({
                            path: 'system',
                        });
                    }
                    else if (res.authorities == "Kitchen"){
                        store.commit('main/setHomeLink', "kitchen");
                        router.push({
                            path: 'kitchen',
                        });
                    }
                    else if (res.authorities == "Room"){
                        store.commit('main/setHomeLink', "order");
                        router.push({
                            path: 'order',
                        });
                    }
                    console.log('fffffffffffff')
                }).catch((error)=> {
                    console.log('error', error)
                    wrongLogin.value = true;
                })
            }).then(()=> {
                axios.get(`ThemeConfiguration/GetThemeConfiguration`).then(res => {
                    console.log(res)
                })
            })
    }

</script>

<style lang="scss">
    [v-cloak] {
        display: none;
    }
    .form-wrapper{
        background-color: #fff;
        padding: 24px 84px;
        margin-top: 5%;
        width: 30%;
        border-radius: 8px;
        h3 {
            margin-top: 0;
            text-align: center;
            font-size: 30px;
        }
        input{
            border-radius: 8px;
        }
        .el-input__icon{
            color: #1f1f1f;
            padding-right: 20px;
        }
        .keep-signed{
            color: #1f1f1f;
             .el-checkbox__label {
                 margin-right: 10px;
             }
        }
        .red-text{
            color: red;
            font-weight: 900;
        }
        .submit{
            margin-top: 10px;
            width: 100%;
            background-color: #0000ff;
            border-radius: 8px;
            height: 35px;
            font-size:17px ;
            font-weight: 600;
        }
        .forget-password{
            margin-top: 10px;
            text-align: center;
            display: block;
        }
        @media (max-width: 767px) { 
            width: 60%;
        }
        @media (max-width: 600px) { 
            background-color:transparent;
        }
    }
</style>
