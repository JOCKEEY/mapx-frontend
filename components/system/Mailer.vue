<template>
  <v-sheet class="pa-3">
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>Mail Tester</v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.sender"
                  label="Sender"
                  placeholder="E.g. &quot;Juan Dela Cruz&quot; <juan@mail.com>"
                  outlined
                  dense
                  hide-details />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.recipient"
                  label="Recipient"
                  placeholder="List of valid email address seperated by comma."
                  outlined
                  dense
                  hide-details />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="formData.subject" label="Subject" outlined dense hide-details />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="formData.text" label="Text" outlined dense hide-details />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="formData.html"
                  label="HTML Body"
                  auto-grow
                  dense
                  outlined
                  hide-details
                  rows="4" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text :loading="isSending" @click="onSendMail">
              Send Mail
              <v-icon right>mdi-email-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        Result:
        <v-sheet outlined class="pa-3">
          {{ result }}
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import globalMixin from '@/mixins/global'
export default {
  name: 'SystemMailer',
  mixins: [globalMixin],
  data: () => ({
    isSending: false,
    formData: {
      sender: '',
      recipient: '',
      subject: '',
      text: '',
      html: '',
    },
    result: '',
  }),

  computed: {
  },

  methods: {
    async onSendMail() {
      if (this.isSending) {
        return
      }
      this.isSending = true
      this.result = ''
      try {
        const { data } = await this.$axios.post('/api/mailer/create', this.formData)
        this.result = JSON.stringify(data)
      } catch (error) {
        this.apiErrorMessage(error)
      } finally {
        this.isSending = false
      }
    },
  },
}
</script>

<style>

</style>
