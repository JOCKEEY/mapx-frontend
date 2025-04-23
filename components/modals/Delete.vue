<template>
  <v-dialog v-model="dialog" :max-width="width" :persistent="loading">
    <v-card>
      <v-toolbar outlined flat color="red" dark>
        <v-toolbar-title>{{ title || 'Delete' }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon :disabled="loading" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="pt-4">
        <v-alert type="error" outlined>
          {{ message }}
          <slot name="message"></slot>
        </v-alert>
      </v-card-text>
      <v-divider />
      <v-card-actions class="mx-2">
        <v-spacer />
        <v-btn text :disabled="loading" @click="close"> Cancel </v-btn>
        <v-btn color="red" dark :loading="loading" @click="onDelete">
          <v-icon left>mdi-delete</v-icon>
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteModal',
  props: {
    title: {
      type: String,
      default: '',
    },
    open: {
      type: Boolean,
    },
    message: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 600,
    },
    loading: {
      type: Boolean,
    },
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
  },
  methods: {
    close() {
      this.$emit('toggle')
    },
    onDelete() {
      this.$emit('delete')
    },
  },
}
</script>
