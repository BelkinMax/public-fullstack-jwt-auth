<template>
  <div class="card_main flex flex-col items-center justify-center space-y-2">
    <h2 class="font-bold text-xl">{{ user.username }}</h2>
    <p class="text-gray-600 text-base">
      {{ user.email }}
    </p>
    <div
      :class="user.isActivated ? 'bg-green-600' : 'bg-yellow-600'"
      class="flex justify-center items-center text-xs px-3 text-white rounded-full"
    >
      {{ user.isActivated ? "Verified user" : "Not verified" }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>
