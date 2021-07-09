<template>
  <div class="w-11/12 xl:w-4/12 lg:w-5/12 md:w-7/12 sm:w-8/12">
    <form @submit.prevent="getFormData" class="card_main mb-4">
      <transition name="slide-fade">
        <input
          v-model="form.username"
          v-if="isCreateAccount"
          class="input_main placeholder-gray-600"
          type="text"
          placeholder="Username"
          required
          :minlength="4"
          :maxlength="12"
        />
      </transition>

      <input
        v-model="form.email"
        class="input_main placeholder-gray-600"
        type="email"
        placeholder="Email"
        required
      />
      <input
        v-model="form.password"
        class="input_main placeholder-gray-600"
        type="password"
        placeholder="Password"
        required
        :minlength="4"
        :maxlength="32"
      />

      <div class="flex justify-between items-center">
        <div class="w-1/2 flex items-center text-sm">
          <input
            v-model="form.isRemember"
            id="remember-me"
            type="checkbox"
            class="mr-2"
          />
          <label for="remember-me">Remember me!</label>
        </div>

        <button class="btn_main w-1/2" type="submit">
          {{ isCreateAccount ? "Submit" : "Log In" }}
        </button>
      </div>
    </form>

    <section class="card_main">
      <div
        class="w-full flex items-center justify-between flex-col sm:flex-row space-y-6 sm:space-x-12 sm:space-y-0"
      >
        <a @click="switchIsCreateAccount" class="btn_secondary">{{
          isCreateAccount ? "Log in" : "Create an accout"
        }}</a>
        <a class="btn_secondary mb-4 sm:mb-0">Forgot your password?</a>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
    ...mapActions("user", ["login", "registration"]),

    switchIsCreateAccount() {
      this.isCreateAccount = !this.isCreateAccount;
    },

    async getFormData() {
      const { username, email, password, isRemember } = this.form;

      if (this.isCreateAccount) {
        // call register action
        await this.registration({ username, email, password, isRemember }).then(
          () => {
            this.$router.push("/");
          }
        );
      } else {
        // call login action
        await this.login({ email, password, isRemember }).then(() => {
          this.$router.push("/");
        });
      }
    }
  }
};
</script>
