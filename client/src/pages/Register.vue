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
                  <p class="sub-title"> Your public key is {{publicKey.toString()}} </p>
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
                    <button class="button is-primary is-medium is-fullwidth" @click="register()">
                      <i class="fa fa-user"></i>
                      Send public key!
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
import mathjs from 'mathjs'
import  modInverse  from '../utils.js'
import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      username: "",
      password: "",
      msg: "",
    }
  },
  computed: {
      publicKey() {
          const privateKey = new TextEncoder("utf-8").encode(this.password);
          let publicKey = [];
          privateKey.forEach(el => {
              el = parseInt(el);
              publicKey.push(mathjs.mod((el*el), this.n));
          });

          return publicKey;
      },
      n() {
        return this.$parent.$data.n
      }
  },
  methods: {
      register() {
          axios.post("http://localhost:3000/register", {username: this.username, key: this.publicKey}).then(({data}) => this.msg = "Registered!")
                                                                                                      .catch(({err}) => this.msg = "error");
      }
  }
}
</script>

<style>
  .title {
    color: black!important;
    margin-bottom: 0rem!important;
  }

  .sub-title {
      margin-bottom: 1.5rem;
  }
</style>
