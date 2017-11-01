<template>
  <div class="task-view" v-if="!isLoading">
    <section class="task-view__header" :class="{ 'task-view__header--done' : task.done }">
      <div class="task-view__status" @click="markDone()">
        <i class="material-icons">done</i>
      </div>
      <div class="header__details">
        <h2>{{ task.name }}</h2>
        <div class="details__container">
          <div class="details__item">
            <i class="material-icons">person_outline</i> Assigned to:
            <strong>{{ task.assigned_to }}</strong>
          </div>
          <div class="details__item">
            <i class="material-icons">date_range</i> Deadline:
            <strong v-if="task.deadline === ''">{{ task.deadline }}</strong>
            <strong v-else>none</strong>
          </div>
        </div>
      </div>
    </section>
    <section class="task-view__content">
      <div class="content__comments">
comments
      </div>
      <div class="content__write-comment">
        <div class="write-comment__container">
        <img src="../assets/noavatar.png" class="avatar">
        <textarea class="write-comment__textarea" placeholder="Write a comment"></textarea>
        </div>
      </div>
    </section>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TaskView',
  data () {
    return {
      task: []
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('auth', ['authUser']),
    ...mapState('task', ['tasks'])
  },
  methods: {
    ...mapActions(['setLoading']),
    ...mapActions('task', ['getUserTasks', 'setTaskDone']),

    markDone () {
      const task = {
        uuid: this.task.uuid,
        done: this.task.done
      }
      this.setTaskDone(task)
    }
  },
  async created () {
    this.setLoading(true)
    const USER_ID = this.authUser.id
    const uuid = this.$route.params.uuid
    if (!this.tasks.length) {
      await this.getUserTasks(USER_ID)
    }
    this.task = this.tasks.find(item => item.uuid === uuid)
    this.setLoading(false)
  }
}
</script>
