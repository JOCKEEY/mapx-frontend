<template>
  <v-dialog v-model="dialog" max-width="1200" scrollable :fullscreen="isMobile">
    <v-card>
      <v-card-title>
        {{ title || 'PDF Viewer' }}
        <v-spacer />
        <v-icon color="red" @click="close">mdi-close</v-icon>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-5">
        <iframe v-if="!loading" frameborder="0" :src="pdf"></iframe>
        <v-row
          v-else
          class="fill-height mt-0"
          align-content="center"
          justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            Fetching document...
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              color="teal accent-4"
              indeterminate
              rounded
              height="6" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import globalMixin from '@/mixins/global'
export default {
  name: 'NativePdfViewer',
  mixins: [globalMixin],
  props: {
    title: {
      type: String,
      default: '',
    },
    open: {
      type: Boolean,
      default: false,
    },
    pdf: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dialog: {
      set() {
        this.$emit('toggle')
      },
      get() {
        return this.open
      },
    },
  },

  methods: {
    close() {
      this.$emit('toggle')
    },
  },
}
</script>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 70vh;
}
</style>
