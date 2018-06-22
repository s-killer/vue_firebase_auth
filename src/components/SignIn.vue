<template>
  <section class="section">
    <h1 class="title has-text-centered">Sign-in</h1>
    <div class="columns">
      <div id="form" class="column is-one-third">

        <div class="card">
          <div class="card-header is-centered">
            <h2 class="card-header-title is-centered">Sign in to Your Account</h2>
          </div>
          <div class="card-content">
            <form v-on:submit.prevent>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="email" placeholder="Username" v-model="email">
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input" type="password" v-model="password">
                </div>
              </div>
              <button type="submit" class="button is-primary" v-on:click="signIn">Sign-in</button>
            </form>
          </div>

        </div>
     </div>
    </div>
    <div>
      <div id-signin style="margin-left: 410px;"> 
         
          <button type="button" class="button is-danger" @click="signInWithGoogle">Sign in with Google</button>
          <button type="button" class="button is-link" @click="signInWithfacebook">Sign in with Facebook</button>
        
      </div>
    </div>
  </section>

</template>


<script>
import Firebase from "firebase";

import * as firebase from 'firebase'





export default {
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn: function() {
      Firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace('dashboard');
          },
          error => {
            alert(error.message);
          }
        )
        .catch(function(error) {
    // Handle failure of creation of user 
  });
    },

      signInWithGoogle: function() {

          var provider = new firebase.auth.GoogleAuthProvider();

         var provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider)
           .then(
          user => {
            this.$router.replace('dashboard');
          },
          error => {
            alert(error.message);
          }
        )
        .catch(function(error) {
    // Handle failure of creation of user 
  })

    /*
    .then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
         var user = result.user;
          // ...


          
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    */

        
      },

      signInWithfacebook: function() {

          var provider = new firebase.auth.FacebookAuthProvider();
          firebase.auth().signInWithPopup(provider)
          .then(
          user => {
            this.$router.replace('dashboard');
          },
          error => {
            alert(error.message);
          }
        )
        .catch(function(error) {
    // Handle failure of creation of user 
  })

        },

      signOut: function() {
        firebase.auth().signOut().then(() => {
          this.user = null
        }).catch(err => console.log(error))
      },

      addItem: function() {
        this.$firebaseRefs.items.push({
          name: this.item
        }).then(() => {
          this.item = ''
        })
      },

      removeItem: function(item) {
        this.$firebaseRefs.items.child(item['.key']).remove()
      }

  }
}

</script>

<style >
    #form{
    margin-left: 400px !important;
  }
</style>
