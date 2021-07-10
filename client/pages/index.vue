<template>
  <div class="w-full h-full p-4">
    <div class="card_main w-full flex justify-between items-center mb-4">
      <div class="flex space-x-4">
        <h1 class="text-xl font-bold">{{ user.username }}</h1>
        <div
          v-if="!user.isActivated"
          class="flex justify-center items-center text-xs px-3 bg-yellow-600 text-white rounded-full"
        >
          Not verified
        </div>
      </div>
      <button class="btn_main" @click="userLogout">
        Logout
      </button>
    </div>
    <div
      v-if="isUsersFetched"
      class="w-full h-full grid grid-flow-row grid-cols-4 grid-rows-6 gap-4"
    >
      <UserCard v-for="user in users" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UserCard from "@/components/UserCard.vue";

export default {
  components: { UserCard },
  data() {
    return {
      isUsersFetched: false
    };
  },
  async mounted() {
    await this.checkUserAuth();

    if (this.isAuth) {
      await this.fetchUsers();
      this.isUsersFetched = true;
    }

    console.log(this.users);
  },
  computed: {
    ...mapGetters("user", ["isAuth", "user"]),
    ...mapGetters("users", ["users"])
  },
  methods: {
    ...mapActions("user", ["checkAuth", "logout"]),
    ...mapActions("users", ["fetchUsers"]),

    async checkUserAuth() {
      if (localStorage.getItem("token")) {
        await this.checkAuth();
      }

      if (!this.isAuth) {
        this.$router.push("/login");
      }
    },

    async userLogout() {
      await this.logout();

      this.$router.push("/login");
    }
  }
};
</script>
