<template>
  <div id="app">
    <div class="container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'
import axios from 'axios'

export default {
    name: 'layout',
    data () {
        return {
            n: '',
            k: ''
        }
    },
    created() {
        axios.get("http://localhost:3000/props").then(({data}) => {
            this.n = data.n
            this.k = data.k
        })
    },
    computed: {
    }
}
</script>