<template>
  <div class="container-fluid">
    <div class="auth-content">
      <div class="row">
        <div class="col-md-8">
          <div class="auth-content__left">
            <div class="auth-content__center">
              <div class="auth-content__header">
                <h1 class="welcome__title">Discover a new path to your success</h1>
                <h4 class="welcome__subtitle">Getting started is only a few clicks away. Create your own account for free without any charges</h4>

                <div class="buttons">
                  <button
                    type="button"
                    class="btn"
                  >Learn more
                  </button>
                  <button
                    type="button"
                    class="btn btn-solid"
                  >Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="auth-content__right">
            <div class="auth-content__center">
              <div class="auth-content__form">
                <h2 class="form__title">Login to your account</h2>
                <p>login: demo@demo.com / password: demo</p>
                <form v-on:submit.prevent="loginFormSubmit()">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter your username"
                      v-model="credentials.username"
                    >
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Enter your password"
                      v-model="credentials.password"
                    >
                  </div>
                  <div class="form__buttons">
                  <button
                    class="btn btn-solid btn-login"
                    :class="{ 'btn-loading' : isLoading }"
                    type="submit"
                  >
                    <img
                      src="../../assets/preloader.svg"
                      class="loader"
                      v-if="isLoading"
                    >
                    <span v-else>Login</span>
                  </button>
                    <a href="#" class="form__forgot">Forgot password?</a>
                  </div>
                </form>
                <div
                  class="alert alert-danger"
                  v-if="isError"
                >
                  <span>{{ errorFeedback }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { clientId, clientSecret } from '@/../env'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'LoginView',
    data () {
      return {
        credentials: {
          username: 'mati.798@hotmail.com',
          password: 'password'
        }
      }
    },
    computed: {
      ...mapState(['isLoading', 'isError', 'errorFeedback'])
    },
    methods: {
      ...mapActions(['setLoading']),
      ...mapActions('auth', ['getAuthUser']),
      loginFormSubmit () {
        this.setLoading(true)
        const postData = {
          grant_type: 'password',
          client_id: clientId,
          client_secret: clientSecret,
          username: this.credentials.username,
          password: this.credentials.password,
          scope: ''
        }
        this.getAuthUser(postData)
      }
    }
  }
</script>

