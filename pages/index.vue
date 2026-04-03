<template>
  <v-container fluid class="pa-0 fill-height login-container">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" md="7" lg="8" class="d-none d-md-flex align-center justify-center relative"
        style="background: linear-gradient(rgba(0, 20, 50, 0.6), rgba(0, 20, 50, 0.6)), 
               url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80') center center / cover no-repeat;">
        <div class="text-white px-12">
          <h1 class="text-h2 font-weight-bold mb-4">ISO: 9001</h1>
          <h2 class="text-h4 font-weight-light mb-6">Quality Management System</h2>
          <v-divider class="mb-6" color="white" thickness="2" width="100"></v-divider>
          <p class="text-body-1 opacity-80 max-width-600">
            Streamlining excellence through digital compliance. <br>
            Ensuring every standard is met, every time.
          </p>
        </div>
      </v-col>

      <v-col cols="12" md="5" lg="4" class="d-flex align-center justify-center bg-grey-lighten-4">
        <v-card flat class="pa-8 pa-md-12 mx-auto bg-transparent" width="100%" max-width="500">
          <div class="d-md-none text-center mb-8">
            <h2 class="text-h4 font-weight-bold text-primary">ISO: 9001</h2>
            <p class="text-subtitle-1">QMS System</p>
          </div>

          <div class="mb-10">
            <h3 class="text-h4 font-weight-bold mb-2 text-grey-darken-3">Sign In</h3>
            <p class="text-body-2 text-grey-darken-1">Enter your credentials to access your dashboard.</p>
          </div>

          <v-slide-y-transition>
            <v-alert v-if="login_success" type="success" variant="tonal" class="mb-6" rounded="lg">
              Welcome back, <strong>{{ form.username }}</strong>!
            </v-alert>
          </v-slide-y-transition>

          <v-slide-y-transition>
            <v-alert v-if="login_fail" type="error" variant="tonal" class="mb-6" rounded="lg">
              {{ login_error }}
            </v-alert>
          </v-slide-y-transition>

          <v-form v-model="valid" @submit.prevent="login">
            <v-text-field v-model="form.username" label="Username" prepend-inner-icon="mdi-account-outline"
              variant="outlined" color="primary" class="mb-2" rounded="lg" :rules="[$validator.required]"
              @input="clear_error" />

            <v-text-field v-model="form.password" label="Password" prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="show_password ? 'mdi-eye-off' : 'mdi-eye'" :type="show_password ? 'text' : 'password'"
              variant="outlined" color="primary" rounded="lg" class="mb-2" :rules="[$validator.required]"
              @click:append-inner="show_password = !show_password" @input="clear_error" />

            <div class="d-flex align-center justify-space-between mb-6">
              <v-checkbox v-model="session_mode" label="Remember me" hide-details color="primary"
                density="comfortable" />
              <nuxt-link to="/forgot-password" class="text-decoration-none text-primary font-weight-bold text-caption">
                Forgot Password?
              </nuxt-link>
            </div>

            <v-btn block size="x-large" color="primary" elevation="0" class="text-none rounded-lg" type="submit"
              :loading="login_load" :disabled="!valid">
              Sign In
            </v-btn>
          </v-form>

          <footer class="mt-10 text-center">
            <p class="text-caption text-grey">
              By logging in, you agree to our
              <nuxt-link to="/privacy-policy" class="text-primary">Privacy Policy</nuxt-link>
              and
              <nuxt-link to="/cookie-policy" class="text-primary">Cookie Policy</nuxt-link>.
            </p>
          </footer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// Logic remains largely the same as your original script
import useAuth from "~/store/auth";

definePageMeta({ layout: "plain", is_public: true });

const auth = useAuth();
const router = useRouter();

const show_password = ref(false);
const valid = ref(false);
const login_load = ref(false);
const login_success = ref(false);
const login_fail = ref(false);
const login_error = ref("");
const session_mode = ref(true);

const form = ref({ username: "", password: "" });

function login() {
  login_load.value = true;
  auth.login(form.value.username, form.value.password)
    .then(() => {
      login_fail.value = false;
      login_success.value = true;
      setTimeout(() => {
        login_load.value = false;
        router.replace({ name: "account-profile" });
      }, 1500);
    })
    .catch((error: any) => {
      login_load.value = false;
      login_fail.value = true;
      login_error.value = error;
    });
}

function clear_error() {
  login_fail.value = false;
  login_error.value = "";
}
</script>

<style scoped>
.login-container {
  min-height: 90vh;
  overflow: hidden;
}

.opacity-80 {
  opacity: 0.8;
}

.max-width-600 {
  max-width: 600px;
}

/* Subtle hover effect for the button */
.v-btn {
  transition: transform 0.2s ease;
}

.v-btn:hover {
  transform: translateY(-1px);
}
</style>