<template>
  <div class="card_main flex flex-col items-center justify-center">
    <h2 class="font-bold text-xl mb-2">{{ user.name }}</h2>
    <p class="text-gray-600 text-base">
      {{ user.email }}
    </p>
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
