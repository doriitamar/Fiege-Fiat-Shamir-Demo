<template>
  <section class="hero is-fullheight is-medium is-primary is-bold">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <article class="card is-rounded">
                <div class="card-content">
                  <h1 class="title">         
                    Fiat-Fiege-Shamir Demo!
                  </h1>
                  <p class="control has-icon">
                    <input class="input" type="text" placeholder="Username" v-model='username'>
                    <i class="fa fa-envelope"></i>
                  </p>
                  <p class="control has-icon">
                    <input class="input" type="password" placeholder="Password" v-model='password'>
                    <i class="fa fa-lock"></i>
                  </p>
                  <br/>
                  <p class="control">
                    <button class="button is-primary is-medium is-fullwidth" @click="login()">
                      <i class="fa fa-user"></i>
                      Login
                    </button>
                  </p>
                  <p class="control">
                    {{msg}}
                  </p>
                </div>
              </article>
            </div>
          </div>
    </div>
  </section>
</template>

<script>
import mathjs from 'mathjs';
import axios from 'axios';

export default {
  name: 'Login',
  data () {
    return {
      username: "",
      password: "",
      msg: "",
    }
  },
  computed: {
    privateKey() {
      let privateKey =new TextEncoder("utf-8").encode(this.password);
                let publicKey = [];
          privateKey.forEach(el => {
              el = parseInt(el);
              publicKey.push(el);
          });

          return publicKey;
      },
      n() {
        return this.$parent.$data.n
      }
  },
  methods: {
    login() {
      // Send proof
      const r = mathjs.randomInt(this.n);
      const x = mathjs.mod(Math.pow(r,2), this.n);

      axios.post('http://localhost:3000/proof', {username: this.username, x}).then(({data: a}) => {
       // Verification
       let y = r;
        this.privateKey.forEach((el,index) => {
          y = y * Math.pow(el, a[index])
        });
        y = mathjs.mod(y, this.n);

        axios.post('http://localhost:3000/verify', {username: this.username, y}).then(({data}) => {
          this.msg = "Authenticated!"
        }).catch(() => this.msg = "Error verifying!");
      })    
    }
  }
}
</script>

<style>
  .title {
    color: black!important;
  }
</style>
