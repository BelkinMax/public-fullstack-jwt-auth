<template>
  <main class="flex-col-center pb-25per animated-gradient-back p-4">
    <form @submit.prevent="getFormData" class="card_main w-10/12 mb-4">
      <transition name="slide-fade">
        <input
          v-model="form.username"
          v-if="isCreateAccount"
          class="input_main placeholder-gray-900 mb-4 p-2 w-full"
          type="text"
          placeholder="Username"
          required
          :minlength="4"
          :maxlength="12"
        />
      </transition>

      <input
        v-model="form.email"
        class="input_main placeholder-gray-900 mb-4 p-2 w-full"
        type="email"
        placeholder="Email"
        required
      />
      <input
        v-model="form.password"
        class="input_main placeholder-gray-900 mb-4 p-2 w-full"
        type="password"
        placeholder="Password"
        required
        :minlength="4"
        :maxlength="32"
      />

      <div class="cta_primary">
        <div class="w-full sm:w-1/2 flex items-center">
          <input
            v-model="form.isRemember"
            id="remember-me"
            type="checkbox"
            class="mr-2"
          />
          <label for="remember-me">Remember me!</label>
        </div>
        <button
          class="btn_main ml-auto w-full sm:w-1/2 mb-4 sm:mb-0"
          type="submit"
        >
          {{ isCreateAccount ? "Submit" : "Log In" }}
        </button>
      </div>
    </form>

    <section class="card_main w-10/12">
      <div
        class="cta_secondary text-center flex flex-col-reverse sm:flex-row items-center w-full justify-between"
      >
        <a
          @click="switchIsCreateAccount"
          class="btn_secondary text-center"
          >{{ isCreateAccount ? "Log in" : "Create an accout" }}</a
        >
        <a class="btn_secondary mb-4 sm:mb-0">Forgot your password?</a>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isCreateAccount: false,

      form: {
        username: "",
        email: "",
        password: "",
        isRemember: true
      }
    };
  },
  methods: {
    switchIsCreateAccount() {
      this.isCreateAccount = !this.isCreateAccount;
    },

    getFormData() {
      console.log(this.form);
    }
  }
};
</script>

<style lang="postcss">
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

.flex-col-center {
  @apply flex flex-col items-center justify-end;
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
