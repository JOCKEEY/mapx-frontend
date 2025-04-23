<template>
  <v-dialog
    v-model="dialog"
    persistent
    no-click-animation
    scrollable
    :max-width="width">
    <v-card>
      <v-card-title class="text-h6">
        {{ title || 'Message' }}
      </v-card-title>
      <v-card-text class="pb-0">
        <slot name="default"></slot>
        <v-alert v-if="!hasSlot" :type="type" outlined>
          {{ description }}
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text :disabled="loading" @click="close">
          Close
        </v-btn>
        <v-spacer />
        <v-btn color="primary" text :loading="loading" @click="ok"> Ok </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'InformationDialog',
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
      default: 300,
    },
    loading: Boolean,
    type: {
      type: String,
      default: null,
    },
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
    hasSlot() {
      return !this.description
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    ok() {
      this.$emit('ok')
    },
  },
}
</script>

<style></style>
