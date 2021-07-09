<template>
  <section class="animated-gradient-back flex justify-center">
    <main class="container h-screen w-screen">
      <Nuxt />
    </main>
  </section>
</template>

<style lang="postcss">
.animated-gradient-back {
  @apply bg-gradient-to-r from-blue-400 to-orange-500 via-purple-500 animate-gradient-x;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.pb-25per {
  padding-bottom: 25%;
}

.card_main {
  @apply bg-gray-100 p-6 rounded-xl shadow-lg w-full;
}

.input_main {
  @apply appearance-none block bg-gray-200 rounded border mb-4 p-2 w-full;
}
.input_main:focus {
  @apply border-teal-500 outline-none;
}

.btn_main {
  @apply bg-gray-800 text-white p-2 rounded font-semibold;
}
.btn_main:hover {
  @apply bg-gray-900;
}

.btn_secondary {
  @apply text-sm font-bold text-teal-500 cursor-pointer;
}
.btn_secondary:hover {
  @apply underline;
}
</style>
