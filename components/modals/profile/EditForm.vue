<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="480"
    persistent
    :fullscreen="$vuetify.breakpoint.mobile">
    <v-form ref="form" v-model="valid" @submit.prevent="onChangeUserInfo">
      <v-card :loading="isSaving">
        <v-card-title class="teal white--text">
          <h4>Update</h4>
          <v-spacer />
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="py-4">
          <v-text-field
            v-model="formData.name"
            :rules="nameRules"
            label="Name"
            required
            outlined />
        </v-card-text>
        <v-divider />
        <v-card-actions class="mx-2">
          <v-btn color="primary" :loading="isSaving" @click="onChangeUserInfo">
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
import globalMixin from '~/mixins/global.js';

export default {
  name: 'ProfileEditForm',
  mixins: [globalMixin],
  props: {
    open: {
      type: Boolean,
    },
  },

  data() {
    return {
      valid: false,
      isSaving: false,
      isFormError: false,
      errorMessage: null,
      newName: '',
      newEmail: '',
      formData: {
        name: '',
      },
      defaultFormData: {},
    };
  },

  computed: {
    dialog: {
      get() {
        return this.open;
      },
      set() {
        this.$emit('toggle');
      },
    },

    nameRules: () => [v => !!v || 'Name is required'],

    emailRules: () => [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  },

  created() {
    this.defaultFormData = JSON.parse(JSON.stringify(this.formData));
  },

  methods: {
    close() {
      this.$emit('toggle');
      this.$refs.form.resetValidation();
      this.formData = JSON.parse(JSON.stringify(this.defaultFormData));
    },

    async onChangeUserInfo() {
      if (this.isSaving) {
        return;
      }
      const validated = this.$refs.form.validate();
      if (validated) {
        this.isSaving = true;
        try {
          const formData = this.formData;
          await this.$axios.patch('api/user/change-name', {
            id: this.$auth.user.id,
            name: formData.name,
          });
          this.$emit('success', '');
          this.close();
          this.systemInfoMessage('User Info was changed.', 'mdi-check');
        } catch (error) {
          this.isFormError = true;
          this.apiErrorMessage(error);
        } finally {
          this.isSaving = false;
        }
      }
    },
  },
};
</script>

<style></style>
