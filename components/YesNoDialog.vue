<template>
  <v-dialog
    v-model="dialog"
    persistent
    :retain-focus="false"
    :max-width="width">
    <v-card>
      <v-card-title>
        {{ title || 'Message' }}
      </v-card-title>
      <v-card-text>
        <slot name="default"></slot>
        {{ description }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text :loading="loading" @click="yes">
          Yes
        </v-btn>
        <v-btn text :disabled="loading" @click="no"> No </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'YesNoDialog',
  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    open: {
      type: Boolean,
    },
    width: {
      type: Number,
      default: 400,
    },
    loading: Boolean,
  },
  computed: {
    dialog: {
      get() {
        return this.open
      },
      set() {
        this.$emit('close')
      },
    },
  },
  methods: {
    yes() {
      this.$emit('yes')
    },
    no() {
      this.$emit('no')
    },
  },
}
</script>

<style></style>
