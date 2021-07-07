<template>
  <main
    class="h-screen mx-auto p-4 pb-20 bg-gradient-to-r from-blue-400 to-orange-500 via-purple-500 animate-gradient-x flex flex-col items-center justify-center text-gray-700"
  >
    <section
      class="bg-gray-100 p-6 rounded-xl shadow-lg w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12"
    >
      <div class="mb-6">
        <input
          class="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
          type="text"
          placeholder="Email"
        />
        <input
          class="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
          type="text"
          placeholder="Password"
        />

        <div class="flex items-center">
          <div class="w-1/2 flex items-center">
            <input id="remember-me" type="checkbox" class="mr-2" />
            <label for="remember-me">Remember me!</label>
          </div>
          <button
            class="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
            type="submit"
          >
            Log In
          </button>
        </div>
      </div>

      <div class="text-center flex justify-between w-full">
        <a
          class="text-sm font-bold text-teal-500 hover:underline cursor-pointer"
          >Create an accout</a
        >
        <a
          class="text-sm font-bold text-teal-500 hover:underline cursor-pointer"
          >Forgot your password?</a
        >
      </div>
    </section>
  </main>
</template>

<script>
export default {};
</script>
