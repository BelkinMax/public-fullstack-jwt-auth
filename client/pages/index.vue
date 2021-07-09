<template>
  <div
    class="w-full h-full grid grid-flow-row grid-cols-4 grid-rows-6 gap-4 p-4"
  >
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";

export default {
  components: { UserCard },
  data() {
    return {
      users: [
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
  }
};
</script>
