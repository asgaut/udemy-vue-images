<template>
<div class="ui secondary pointing menu">
    <router-link to="/" class="active item">
         My Imgur Image Storage
    </router-link>
    <div class="right menu">
        <a v-if="!isLoggedIn" class="ui item" @click="login">
            Login
        </a>
        <div v-else class="horizontal">
            <router-link class="item" to="/">
                Galleries
            </router-link>
            <router-link class="item" to="/upload">
                Upload
            </router-link>
            <a class="ui item" @click="logout">
                Logout
            </a>
        </div>
    </div>
    <!--<div class="ui segment">
    </div>-->
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'AppHeader',
    methods: {
        ...mapActions(['login', 'logout']),
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
    },
}
</script>

<style scoped>
.horizontal {
    display: flex;
    flex-direction: row;
}
</style>