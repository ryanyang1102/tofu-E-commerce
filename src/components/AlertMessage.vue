<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      <span v-html="item.message"></span>
      <button type="button" class="btn ms-2" @click="removeMessage(i)" aria-label="Close">
        <i class="fas fa-times text-third"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AlertMessage',
  methods: {
    updateMessage (message, status) {
      this.$store.dispatch('updateMessage', { message, status })
    },
    removeMessage (num) {
      this.$store.dispatch('removeMessage', num)
    }
  },
  computed: {
    ...mapGetters(['messages'])
  },
  created () {
    // const vm = this;

    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    // vm.$bus.$on('message:push', (message, status = 'warning') => {
    //   vm.updateMessage(message, status);
    // });
    // vm.$bus.$emit('message:push');
  }
}
</script>
