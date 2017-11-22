<template>
  <div
    class="task-view"
    v-if="!isLoading"
  >
    <section
      class="task-view__header"
      :class="{ 'task-view__header--done' : task.done }"
    >
      <div
        class="task-view__status"
        @click="markDone()"
      >
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
      <div class="content__description">
        {{ task.description }}
      </div>
      <div class="content__comments">
        <ul class="comments__list">
          <li
            v-for="item in comments"
            :key="item.message"
            class="comments__item"
            >
            <img
              src="../assets/noavatar.png"
              class="avatar"
            >
            <div class="item__container">
              <div
                class="author"
                v-text="item.author"
              >
              </div>
              <div
                class="comment"
                v-text="item.message"
              ></div>
            </div>
            <div class="item__actions">
              <i
                class="material-icons"
                @click="fireDeleteComment(item.uuid)"
              >close</i>
            </div>
          </li>
        </ul>
      </div>
      <div class="content__write-comment">
        <div class="write-comment__container">
          <img
            src="../assets/noavatar.png"
            class="avatar"
          >
          <textarea
            class="write-comment__textarea"
            placeholder="Write a comment"
            v-model="commentText"
          ></textarea>
          <button
            type="button"
            class="btn btn-primary"
            @click="sendComment()"
          >Send
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'TaskView',
    data () {
      return {
        task: [],
        commentText: ''
      }
    },
    sockets: {
      task_comment: function (data) {
        this.comments.push({message: data.message, authorId: data.authorId, author: data.author})
      }
    },
    computed: {
      ...mapState([
        'isLoading'
      ]),
      ...mapState('auth', [
        'authUser'
      ]),
      ...mapState('task', [
        'tasks',
        'comments'
      ])
    },
    methods: {
      ...mapActions([
        'setLoading'
      ]),
      ...mapActions('task', [
        'getUserTasks',
        'setTaskDone',
        'getComments',
        'addComment',
        'deleteComment'
      ]),

      markDone () {
        const task = {
          uuid: this.task.uuid,
          done: this.task.done
        }
        this.setTaskDone(task)
      },
      async sendComment () {
        if (this.commentText !== '') {
          const data = {
            message: this.commentText,
            authorId: this.authUser.id,
            author: this.authUser.name,
            task_uuid: this.task.uuid
          }
          await this.addComment(data)
          this.commentText = ''
        }
      },
      async fireDeleteComment (commentUuid) {
        await this.deleteComment({
          uuid: commentUuid,
          task_uuid: this.$route.params.uuid
        })
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
      await this.getComments(uuid);
      this.setLoading(false)
    }
  }
</script>
