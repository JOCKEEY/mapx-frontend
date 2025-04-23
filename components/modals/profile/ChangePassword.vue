<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="480"
    persistent
    :fullscreen="$vuetify.breakpoint.mobile">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card :loading="isSaving">
        <v-card-title class="teal white--text">
          <h4>Change Password</h4>
          <v-spacer />
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="py-4">
          <v-text-field
            v-model="formData.currentPassword"
            :rules="[v => !!v || 'Password is required']"
            label="Current Password"
            required
            outlined
            type="password" />

          <v-text-field
            v-model="formData.newPassword"
            :rules="passwordRules"
            label="New Password"
            required
            outlined
            type="password" />

          <v-text-field
            v-model="formData.reTypePassword"
            :rules="passwordRules"
            label="Re-type Password"
            required
            outlined
            type="password" />

          <v-progress-linear
            :value="passwordProgress"
            :color="passwordProgressColor"
            height="7"
            class="mb-1" />
        </v-card-text>
        <v-divider />
        <v-card-actions class="mx-2">
          <v-btn color="primary" :loading="isSaving" @click="onChangePassword">
            <v-icon left>mdi-content-save</v-icon>
            Save
          </v-btn>
          <v-btn text @click="close"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import globalMixin from '@/mixins/global'

export default {
  name: 'ProfileChangePassword',
  mixins: [globalMixin],
  props: {
    open: {
      type: Boolean,
    },
    formValue: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      valid: false,
      isSaving: false,
      isFormError: false,
      errorMessage: null,
      passwordLength: 6,
      currentPassword: '',
      newPassword: '',
      passwordVerify: '',
      formData: {
        currentPassword: '',
        newPassword: '',
        reTypePassword: '',
      },
      defaultFormData: {},
    }
  },

  computed: {
    dialog: {
      get() {
        return this.open
      },
      set() {
        this.$emit('toggle')
      },
    },

    passwordRules() {
      return [
        v => !!v || 'Password is required',
        v =>
          (v && v.length >= 6) || 'Password must be greater than 5 characters',
        v =>
          this.formData.newPassword === this.formData.reTypePassword ||
          'Password does not match',
      ]
    },

    passwordProgress() {
      return Math.min(
        100,
        Math.ceil((this.newPassword.length / this.passwordLength) * 100),
      )
    },

    passwordProgressColor() {
      return ['error', 'warning', 'success'][
        Math.floor(this.passwordProgress / 40)
      ]
    },
  },

  watch: {
    formValue(data) {
      if (data && this.open) {
        this.formData = {
          id: data.id,
          name: data.name,
          email: data.email,
          password: '',
          isActive: data.isActive,
        }
      }
    },
    open(isOpen) {
      if (!isOpen) {
        this.formData = JSON.parse(this.defaultFormData)
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      }
    },
  },

  created() {
    this.defaultFormData = JSON.stringify(this.formData)
  },

  methods: {
    close() {
      this.$emit('toggle')
    },

    // async onChangePassword() {
    async onChangePassword() {
      if (this.isSaving) {
        return
      }
      const validated = this.$refs.form.validate()
      if (validated) {
        this.isSaving = true
        try {
          await this.$axios.patch('/api/user/change-password', this.formData)
          this.$emit('success', '')
          this.close()
          this.systemInfoMessage('Password was changed.', 'mdi-check')
        } catch (error) {
          this.isFormError = true
          this.apiErrorMessage(error)
        } finally {
          this.isSaving = false
        }
      }
    },
  },
}
</script>

<style></style>
