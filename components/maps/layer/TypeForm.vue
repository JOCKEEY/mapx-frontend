<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="600"
    persistent
    :fullscreen="$vuetify.breakpoint.mobile">
    <v-form
      ref="form"
      v-model="formValid"
      lazy-validation
      @submit.prevent="onSubmitForm">
      <v-card :loading="isSaving">
        <v-card-title class="teal white--text">
          <h4>Map Layer Type</h4>
          <v-spacer />
          <v-btn icon :disabled="isSaving" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="py-4">
          <v-text-field
            v-model="formData.name"
            label="Layer Type"
            outlined
            hint="The group name of the layer. E.g. Land Use, Rivers, Forests"
            :rules="[v => !!v || 'Field is required']" />

          <table class="w-100 border" cellspacing="0">
            <caption class="text-left">
              <v-alert type="info">
                The attributes below is use to fill-in the information about the
                map layer
              </v-alert>
            </caption>
            <thead class="grey darken-2 white--text">
              <tr>
                <th class="text-left py-2" style="width: 10%">
                  <v-btn
                    icon
                    color="white"
                    class="ml-2"
                    outlined
                    @click="onAddAttribute">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </th>
                <th class="text-left pl-1 pl-sm-0 subtitle-1">Attributes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(attribute, i) in formData.attributes" :key="i">
                <td>
                  <v-btn icon class="ml-2" @click="onRemoveAttribute(i)">
                    <v-icon color="red"> mdi-close </v-icon>
                  </v-btn>
                </td>
                <td class="py-2 pr-2">
                  <v-text-field
                    v-model="attribute.name"
                    outlined
                    dense
                    hide-details
                    placeholder="Attribute name here..." />
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
        <v-divider />
        <v-card-actions class="justify-space-between">
          <v-sheet>
            <v-btn
              color="primary"
              type="submit"
              :loading="isSaving"
              :disabled="isDeleting">
              <v-icon>mdi-content-save</v-icon>
              {{ isEditMode ? 'Update' : 'Save' }}
            </v-btn>
            <v-btn text :disabled="isSaving || isDeleting" @click="close">
              Cancel
            </v-btn>
          </v-sheet>
          <v-btn
            v-if="isEditMode"
            text
            color="red"
            :loading="isDeleting"
            @click="showDeleteFormPrompt = true">
            <v-icon>mdi-delete</v-icon>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <YesNoDialog
      description="Are you sure you want to delete this layer? The associated map will also be deleted."
      title="Alert"
      :width="400"
      :open="showDeleteFormPrompt"
      @yes="onDeleteForm"
      @no="showDeleteFormPrompt = false" />
  </v-dialog>
</template>

<script>
import globalMixin from '~/mixins/global.js'
export default {
  name: 'MapsLayerTypeForm',
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
  data: () => ({
    formData: {
      name: '',
      attributes: [
        {
          name: '',
        },
      ],
    },
    formValid: null,
    defaultForm: null,
    isSaving: false,
    isDeleting: false,

    showDeleteFormPrompt: false,
  }),
  computed: {
    dialog: {
      get() {
        return this.open
      },
      set() {
        this.$emit('toggle')
      },
    },
    isEditMode() {
      return !!this.formData.id
    },
  },
  watch: {
    open(isTrue) {
      if (!isTrue) {
        this.$refs.form.resetValidation()
        this.formData = JSON.parse(JSON.stringify(this.defaultForm))
      }
    },
    formValue(form) {
      if (form && this.open) {
        this.formData = {
          id: form.id,
          name: form.name,
          attributes: [...form.attributes],
        }
      }
    },
  },
  mounted() {
    this.defaultForm = JSON.parse(JSON.stringify(this.formData))
  },
  methods: {
    close() {
      this.$emit('toggle')
    },
    onAddAttribute() {
      this.formData.attributes.push({ name: '' })
    },
    onRemoveAttribute(i) {
      this.formData.attributes.splice(i, 1)
    },
    async onSubmitForm() {
      if (this.isSaving) {
        return
      }
      const validated = this.$refs.form.validate()
      if (validated) {
        this.isSaving = true
        try {
          const formData = JSON.parse(JSON.stringify(this.formData))
          formData.attributes = formData.attributes.filter(attr => !!attr.name)
          const { data } = this.isEditMode
            ? await this.$axios.patch(
                `/api/maplayer/type/update/${formData.id}`,
                formData,
              )
            : await this.$axios.post('/api/maplayer/type/create', formData)
          this.$emit('saved', data)
          this.close()
        } catch (error) {
          this.apiErrorMessage(error)
        } finally {
          this.isSaving = false
        }
      }
    },

    async onDeleteForm() {
      if (this.isDeleting) {
        return
      }
      this.isDeleting = true
      try {
        const { data } = await this.$axios.delete(
          `/api/maplayer/type/delete/${this.formData.id}`,
        )
        this.$emit('deleted', data)
        this.close()
      } catch (error) {
        this.apiErrorMessage(error)
      } finally {
        this.isDeleting = false
        this.showDeleteFormPrompt = false
      }
    },
  },
}
</script>

<style></style>
