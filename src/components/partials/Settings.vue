<template>
    <div class="page__content">
        <div class="page__header">
            <h2>Settings</h2>
            <h4>Feel free to configure it as you like</h4>
        </div>
        <div class="settings">
            <div class="settings__group row">
                <div class="col-md-1">
                    <label>Name:</label>
                </div>
                <div class="col-md-6"> 
                    <input type="text" v-model="changeFullname" maxlength="30">
                </div>
            </div>
            <div class="settings__group row">
                <div class="col-md-1">
                    <label>Profession:</label>
                </div>
                <div class="col-md-6">
                    <input type="text" v-model="changeProfession" maxlength="30">
                </div>
            </div>
            <div class="settings__buttons">
                <router-link to="/"><a href class="btn btn-secondary">Cancel</a></router-link>
                <router-link to="/"><a href class="btn btn-primary">Save</a></router-link>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['fullName', 'profession'],
    methods: {},
    beforeMount () {
      this.$emit('isOpen')
    },
    computed: {
      changeFullname: {
        get: function () {
          return this.fullName
        },
        set: function (value) {
          this.$emit('changeName', value)
        }
      },
      changeProfession: {
        get: function () {
          return this.profession
        },
        set: function (value) {
          this.$emit('changeProfession', value)
        }
      }
    }
  }
</script>
