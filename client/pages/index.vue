<template>
  <main class="flex-col-center animated-gradient-back p-4 pb-20">
    <section class="card_main w-10/12 mb-4">
      <input
        v-if="isCreateAccount"
        class="input_main placeholder-gray-900 mb-4 p-2 w-full"
        type="text"
        placeholder="Username"
      />
      <input
        class="input_main placeholder-gray-900 mb-4 p-2 w-full"
        type="email"
        placeholder="Email"
      />
      <input
        class="input_main placeholder-gray-900 mb-4 p-2 w-full"
        type="password"
        placeholder="Password"
      />

      <div class="cta_primary">
        <div class="w-full sm:w-1/2 flex items-center">
          <input id="remember-me" type="checkbox" class="mr-2" />
          <label for="remember-me">Remember me!</label>
        </div>
        <button
          class="btn_main ml-auto w-full sm:w-1/2 mb-4 sm:mb-0"
          type="submit"
        >
          {{ isCreateAccount ? "Submit" : "Log In" }}
        </button>
      </div>
    </section>

    <section class="card_main w-10/12">
      <div
      :class="isCreateAccount ? 'justify-center' : 'justify-between'"
        class="cta_secondary text-center flex flex-col sm:flex-row items-center w-full"
      >
        <a
          @click="switchIsCreateAccount"
          class="btn_secondary text-center sm:mb-0"
          :class="isCreateAccount ? 'mb-0' : 'mb-4'"
          >{{ isCreateAccount ? "Log in" : "Create an accout" }}</a
        >
        <a v-if="!isCreateAccount" class="btn_secondary"
          >Forgot your password?</a
        >
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isCreateAccount: false
    };
  },
  methods: {
    switchIsCreateAccount() {
      this.isCreateAccount = !this.isCreateAccount;
    }
  }
};
</script>

<style lang="postcss">
.flex-col-center {
  @apply flex flex-col items-center justify-center;
}

.animated-gradient-back {
  @apply h-screen mx-auto bg-gradient-to-r from-blue-400 to-orange-500 via-purple-500 animate-gradient-x text-gray-700;
}

.card_main {
  @apply bg-gray-100 p-6 rounded-xl shadow-lg;
}

.cta_primary {
  @apply flex flex-col-reverse items-center;
}

.input_main {
  @apply appearance-none block bg-gray-200 rounded border;
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

@screen sm {
  .card_main {
    @apply w-8/12;
  }

  .cta_primary {
    @apply flex-row;
  }
}
@screen md {
  .card_main {
    @apply w-6/12;
  }
}
@screen lg {
  .card_main {
    @apply w-5/12;
  }
}
@screen xl {
  .card_main {
    @apply w-4/12;
  }
}
</style>
