<template>
    <div>
      <h1>{{ task.name }}</h1>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TaskView',
  data () {
    return {
      task: []
    };
  },
  computed: {
    ...mapState('auth', ['authUser']),
    ...mapState('task', ['tasks'])
  },
  methods: {
    ...mapActions('task', ['getUserTasks'])
  },
  async created () {
    const USER_ID = this.authUser.id;
    const uuid = this.$route.params.uuid;
    if (!this.tasks.length) {
      await this.getUserTasks(USER_ID);
    }
    this.task = this.tasks.find(item => item.uuid === uuid);
  }
};
</script>
