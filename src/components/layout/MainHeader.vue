<template>
  <div class="header">
    <div class="row">
      <div class="col-md-8">
        <div class="header__date">
          <i class="material-icons">date_range</i>
          {{ selectedDate }}
        </div>
      </div>
      <div class="col-md-4">
        <div class="header__functions">
          <i class="material-icons">notifications_none</i>
          <a
            href="#"
            class="btn btn-primary"
            v-on:click="fireAddRow()"
          >Add task</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from '../../eventbus'
  import { mapActions } from 'vuex'

  export default {
    name: 'MainHeader',
    data () {
      return {
        selectedDate: 'Today, 29 July, 2017',
        months: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ]
      }
    },
    methods: {
      ...mapActions('task', ['addRow']),
      fireAddRow () {
        this.addRow()
        this.resetSearchInput()
      },
      removeTask () {
        this.$emit('removeTask')
      },
      resetSearchInput () {
        bus.$emit('resetSearchInput')
      }
    },
    mounted: function () {
      let d = new Date()
      let day = d.getDate()
      let month = d.getMonth()
      let year = d.getFullYear()
      this.selectedDate = 'Today, ' + day + ' ' + this.months[month] + ' ' + year
    }
  }
</script>
