<template>
  <div
    class="w-full h-full grid grid-flow-row grid-cols-4 grid-rows-6 gap-4 p-4"
  >
    <UserCard v-for="user in usersList" :key="user.id" :user="user" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UserCard from "@/components/UserCard.vue";

export default {
  components: { UserCard },
  data() {
    return {
      usersList: [
        {
          id: 1,
          name: "Lorem Ipsum",
          email: "test@test.com"
        },
        {
          id: 2,
          name: "Hello World",
          email: "hello@world.com"
        },
        {
          id: 3,
          name: "User Name",
          email: "user@name.com"
        }
      ]
    };
  },
  mounted() {
    this.checkUserAuth();
  },
  computed: {
    ...mapGetters("user", ["isAuth"])
  },
  methods: {
    ...mapActions("user", ["checkAuth"]),

    async checkUserAuth() {
      if (localStorage.getItem("token")) {
        await this.checkAuth();
      }

      if (!this.isAuth) {
        this.$router.push("/login");
      }
    }
  }
};
</script>
