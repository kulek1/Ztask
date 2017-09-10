<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="text-center mt-5">
          <h2>Log In</h2>
          <p>login: demo@demo.com / password: demo</p>
          <div class="alert alert-danger" v-if="isError">
            <span>{{ errorFeedback }}</span>
          </div>
          <form v-on:submit.prevent="loginFormSubmit()">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Enter your username" v-model="credentials.username">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
            </div>
            <button class="btn btn-primary" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUrl, getHeader, userUrl } from '../auth/config'
import { clientId, clientSecret } from '../../env'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      credentials: {
        username: 'mati.798@hotmail.com',
        password: 'password'
      },
      isError: false,
      errorFeedback: '',
      errorTypes: {
        serverError: 'Internal Server Error',
        connectionError: 'Server is shutdown',
        loginError: 'Your username or password may be incorrect'
      }
    }
  },
  methods: {
    loginFormSubmit () {
      const postData = {
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        username: this.credentials.username,
        password: this.credentials.password,
        scope: ''
      }
      const authUser = {}
      this.$http.post(loginUrl, postData).then(response => {
        if (response.status === 200) {
          authUser.access_token = response.data.access_token
          authUser.refresh_token = response.data.refresh_token
          window.localStorage.setItem('authUser', JSON.stringify(authUser))
          this.$http.get(userUrl, { headers: getHeader() }).then(response => {
            authUser.id = response.body.id
            authUser.email = response.body.email
            authUser.name = response.body.name
            authUser.profession = response.body.profession
            window.localStorage.setItem('authUser', JSON.stringify(authUser))
            this.$store.dispatch('setUserObject', authUser)
            this.$router.push({ name: 'Dashboard' })
          })
        }
      }, function (response) {
        this.isError = true
        if (response.status === 500) {
          this.errorFeedback = this.errorTypes.serverError
        } else if (response.status === 404 || response.status === 0) {
          this.errorFeedback = this.errorTypes.connectionError
        } else {
          this.errorFeedback = this.errorTypes.loginError
        }
      })
    }
  },
  computed: {
    ...mapState({
      userStore: state => state.userStore
    })
  }
}
</script>

