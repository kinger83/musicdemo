<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal"
  :class="{ hidden: !authModalShow }">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center
      sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="toggleAuthModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition " href="#" @click.prevent="tab = 'login'"
                :class="{
                    'hover:text-white text-white bg-blue-600': tab ==='login',
                    'hover:text-blue-600': tab === 'register',
                }">
                Login</a>
            </li>
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition"
                href="#" @click.prevent="tab = 'register'"
                :class="{
                    'hover:text-white text-white bg-blue-600': tab ==='register',
                    'hover:text-blue-600': tab === 'login',
                }"
                >Register</a>
            </li>
          </ul>

          <!-- Login Form -->
          <vee-form :validation-schema="loginSchema" v-show="tab=== 'login'"
          @submit="login" >
          <div class="text-white text-center font-bold p-4 mb-4" v-if="login_show_alert"
          :class="login_alert_variant">
            {{login_alert_massage}}
          </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field type="email" name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
                <ErrorMessage class="text-red-600" name="email" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field type="password" name="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password" />
                 <ErrorMessage class="text-red-600" name="password" />
            </div>
            <button type="submit" :disabled="login_in_submission"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
            hover:bg-purple-700">
              Submit
            </button>
          </vee-form>
          <!-- Registration Form -->
          <vee-form v-show="tab === 'register'" :validation-schema="schema"
          @submit="register" :initial-values="userData" >
          <div class="text-white text-center font-bold p-5 mb-4" v-if="reg_show_alert"
          :class="reg_alert_variant">
            {{reg_alert_massage}}
          </div>
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <vee-field type="text" name="name"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name" />
                <ErrorMessage class="text-red-600" name="name" />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field type="email" name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
                <ErrorMessage class="text-red-600" name="email" />
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <vee-field type="number" name="age"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded" />
                  <ErrorMessage class="text-red-600" name="age" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Passsword</label>
              <vee-field name="password" :bails="false" v-slot="{ field, errors}">
                <input class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                transition duration-500 focus:outline-none focus:border-black rounded"
                type="password" placeholder="Password" v-bind="field"/>
                <div class="text-red-600" v-for="error in errors" :key="error">
                  {{error}}
                </div>
                </vee-field>
                 <ErrorMessage class="text-red-600" name="password"  />
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <vee-field type="password" name="confirm_password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password" />
                 <ErrorMessage class="text-red-600" name="confirm_password" />
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <vee-field as="select" name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded">
                <option value="Australia">Australia</option>
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Antartica">Antartica</option>
              </vee-field>
              <ErrorMessage class="text-red-600" name="country" />
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <vee-field type="checkbox" name="tos" value="1"
              class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
              <label class="inline-block">Accept terms of service</label> <br>
              <ErrorMessage class="text-red-600" name="tos" />
            </div>
            <button type="submit" :disabled="reg_in_submission"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default {
  name: 'Auth',
  data() {
    return {
      tab: 'login',
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:4|max:100|email',
        age: 'required|min_value:18|max_value:125',
        password: 'required|min_pass:6|max:100',
        confirm_password: 'password_missmatch:@password',
        country: 'required|country_excluded:Antartica',
        tos: 'tos_required',
      },
      loginSchema: {
        email: 'required|min:4|max:100|email',
        password: 'required|min:6|max:32',
      },
      userData: {
        country: 'Australia',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_massage: 'Please Wait. Your account is being created!',

      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_massage: 'Please wait, you are being logged in.',

    };
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),

    async register(values) {
      let userCred = null;
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_massage = 'Please wait, your account is being created. ';

      try {
        userCred = await auth.createUserWithEmailAndPassword(
          values.email, values.password,
        );
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_massage = 'An unexpected error occured. PLease try again later.';
        return;
      }

      try {
        await usersCollection.add({
          name: values.name,
          email: values.email,
          age: values.age,
          country: values.country,
        });
      } catch (error) {
        console.log(error);
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_massage = 'An unexpected error occured. PLllease try again later.';
        return;
      }
      this.reg_alert_variant = 'bg-green-500';
      this.$store.commit('toggleAuth');
      this.reg_alert_massage = 'Success!  Your account has been created.';

      console.log(userCred);
    },
    login(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_massage = 'Please wait, you are being logged in.';

      this.login_alert_variant = 'bg-green-500';
      this.login_alert_massage = 'Success! You are logged in!!.';

      console.log(values);
    },
  },
  computed: {
    ...mapGetters(['authModalShow']),
  },
};
</script>
