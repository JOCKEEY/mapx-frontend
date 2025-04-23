<template>
  <v-card :loading="isFetching">
    <v-card-title>Manage System API end-point and Navigation</v-card-title>
    <v-card-text class="d-flex align-center">
      <v-sheet max-width="200">
        <v-text-field
          v-model.trim="search"
          placeholder="Search..."
          outlined
          append-icon="mdi-magnify"
          hide-details
          dense
          @keyup.enter="fetchData" />
      </v-sheet>
      <v-menu v-if="isMobile" offset-y left>
        <template #activator="{ on, attrs }">
          <v-btn outlined class="ml-2" v-bind="attrs" v-on="on">
            <v-icon color="primary">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="fetchData"> Refresh </v-list-item>
          <v-list-item @click="onToggleFormModal"> Add </v-list-item>
        </v-list>
      </v-menu>
      <v-sheet v-else>
        <v-btn
          color="primary"
          class="mx-2"
          :loading="isFetching"
          @click="fetchData">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn color="primary" @click="onToggleFormModal">
          <v-icon left>mdi-plus</v-icon> Add
        </v-btn>
      </v-sheet>
      <v-spacer />
      <v-sheet max-width="100">
        <v-select
          v-model="showMenuFilter"
          label="Show"
          dense
          hide-details
          outlined
          :items="['All', 'api', 'menu']" />
      </v-sheet>
    </v-card-text>
    <v-divider />
    <v-card-text>
      <v-sheet
        v-for="group in Object.keys(systemMenuGroupModule)"
        :key="`module-${group}`"
        outlined
        class="mb-5"
        elevation="1">
        <v-subheader class="font-weight-bold orange--text">
          <v-icon left>mdi-view-module</v-icon> {{ group }}
          <v-spacer />
          <span>Module</span>
        </v-subheader>
        <v-simple-table>
          <thead>
            <tr>
              <th class="teal--text">Title</th>
              <th class="teal--text">Path</th>
              <th class="teal--text">Type</th>
              <th class="teal--text">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="menu in systemMenuGroupModule[group]">
              <tr :key="`menu-${menu.id}`">
                <td class="py-2">
                  <v-icon left>
                    {{ menu.isUserMenu ? menu.icon : 'mdi-web' }}
                  </v-icon>
                  <span
                    class="font-weight-bold"
                    :class="
                      menu.isUserMenu
                        ? 'primary--text'
                        : 'blue--text font-weight-bold'
                    ">
                    {{ menu.title }}
                  </span>
                  <div class="grey--text pl-8 text-truncate">
                    {{ menu.description }}
                  </div>
                </td>
                <td>
                  {{ menu.path }}
                </td>
                <td :class="menu.isUserMenu ? 'primary--text' : 'blue--text'">
                  {{ menu.isUserMenu ? 'Navigation' : 'API' }}
                </td>
                <td>
                  <v-icon color="blue" @click="onSelectMenu(menu)">
                    mdi-pencil
                  </v-icon>
                  <v-icon color="red" @click="onToggleDeleteMenu(menu)">
                    mdi-delete
                  </v-icon>
                  <v-icon
                    v-if="menu.isUserMenu"
                    color="teal"
                    @click="onAddSubMenu(menu)">
                    mdi-plus
                  </v-icon>
                </td>
              </tr>
              <template v-if="menu.subMenus.length">
                <tr
                  v-for="subMenu in menu.subMenus"
                  :key="`menu-sub-${subMenu.id}`">
                  <td class="pl-10 py-2">
                    <v-icon left>
                      {{ subMenu.icon || 'mdi-arrow-right-bottom' }}
                    </v-icon>
                    {{ subMenu.title }}
                    <div class="grey--text pl-8">
                      {{ subMenu.description }}
                    </div>
                  </td>
                  <td>
                    {{ subMenu.path }}
                  </td>
                  <td class="teal--text">Sub-Menu</td>
                  <td>
                    <v-icon color="blue" @click="onSelectMenu(subMenu)">
                      mdi-pencil
                    </v-icon>
                    <v-icon color="red" @click="onToggleDeleteMenu(subMenu)">
                      mdi-delete
                    </v-icon>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </v-simple-table>
      </v-sheet>
    </v-card-text>
    <!-- Form Modal -->
    <v-dialog
      v-model="showFormModal"
      scrollable
      max-width="600"
      :fullscreen="isMobile">
      <v-form ref="menuForm">
        <v-card>
          <v-card-title class="primary white--text">
            <span>Pages & API</span>
            <v-spacer />
            <v-icon
              color="white"
              :disabled="isFormSaving"
              @click="onToggleFormModal">
              mdi-close
            </v-icon>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-text-field
              v-model.trim="formData.title"
              label="Title"
              dense
              outlined
              :rules="[formRequired]" />
            <v-text-field
              v-model.trim="formData.path"
              label="Path"
              dense
              outlined
              :rules="[formRequired]" />
            <v-textarea
              v-model.trim="formData.description"
              label="Description"
              dense
              outlined
              auto-grow
              rows="2" />
            <v-checkbox
              v-model="formData.isUserMenu"
              label="User Menu"
              dense
              messages="Check if this menu is for navigation" />
            <v-text-field
              v-model.trim="formData.module"
              class="mt-3"
              label="Module"
              dense
              outlined
              :rules="[formRequired]" />
            <v-text-field
              v-model.trim="formData.icon"
              class="mt-3"
              label="Icon"
              dense
              outlined
              suffix="Preview:"
              :append-icon="formData.icon" />
            <v-autocomplete
              v-model="formData.menuId"
              label="Parent Menu"
              clearable
              item-value="id"
              item-text="title"
              outlined
              dense
              :items="navigationMenuList" />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text :disabled="isFormSaving" @click="onToggleFormModal">
              Cancel
            </v-btn>
            <v-btn color="primary" :loading="isFormSaving" @click="onFormSave">
              <v-icon left>mdi-content-save</v-icon> Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <ModalsDelete
      title="Delete"
      :width="400"
      :open="showDeleteModal"
      :message="`Delete ${selectedMenuName} menu?`"
      :loading="isDeleting"
      @toggle="onToggleDeleteMenu(null)"
      @delete="onDeleteMenu" />
  </v-card>
</template>

<script>
import _ from 'lodash'
import globalMixin from '@/mixins/global'
export default {
  name: 'SystemMenu',
  mixins: [globalMixin],
  data: () => ({
    formData: {
      id: null,
      title: '',
      description: '',
      path: '',
      isUserMenu: false,
      module: '',
      menuId: null,
      icon: null,
    },
    defaultFormData: null,
    showFormModal: false,
    isFormSaving: false,
    systemMenus: [],
    isFetching: false,
    selectedMenu: null,
    showMenuFilter: 'All',
    showDeleteModal: false,
    isDeleting: false,
    search: '',
  }),

  computed: {
    systemMenuGroupModule() {
      const filterMenu = this.showMenuFilter
      const menus = this.systemMenus.filter(record =>
        filterMenu === 'All'
          ? true
          : record.isUserMenu === (filterMenu === 'menu'),
      )
      return _.groupBy(menus, 'module')
    },

    navigationMenuList() {
      return this.systemMenus.filter(record => record.isUserMenu)
    },

    selectedMenuName() {
      return this.selectedMenu?.title || ''
    },
  },

  watch: {
    showFormModal(isTrue) {
      if (!isTrue) {
        this.$refs.menuForm.resetValidation()
        this.formData = JSON.parse(this.defaultFormData)
      }
    },
  },

  created() {
    this.fetchData()
    this.defaultFormData = JSON.stringify(this.formData)
  },

  methods: {
    async fetchData() {
      if (this.isFetching) {
        return
      }
      this.isFetching = true
      try {
        const limit = 1000
        const search = this.search
        const { data } = await this.$axios.get(
          `/api/system/menu/list?limit=${limit}&search=${search}`,
        )
        this.systemMenus = data.data
      } catch (error) {
        this.apiErrorMessage(error)
      } finally {
        this.isFetching = false
      }
    },

    onToggleFormModal() {
      this.showFormModal = !this.showFormModal
    },

    formRequired(v) {
      return !!v || 'Field required'
    },

    async onFormSave() {
      if (this.isFormSaving) {
        return
      }
      const validated = this.$refs.menuForm.validate()
      if (!validated) {
        return
      }
      this.isFormSaving = true
      try {
        const form = this.formData
        if (form.id) {
          await this.$axios.patch(`/api/system/menu/update/${form.id}`, form)
        } else {
          await this.$axios.post('/api/system/menu/create', form)
        }
        this.onToggleFormModal()
        this.systemInfoMessage('Record was successfully saved.')
        this.fetchData()
      } catch (error) {
        this.apiErrorMessage(error)
      } finally {
        this.isFormSaving = false
      }
    },

    onSelectMenu(menu) {
      this.formData = {
        id: menu.id,
        title: menu.title,
        description: menu.description,
        path: menu.path,
        isUserMenu: menu.isUserMenu,
        module: menu.module,
        menuId: menu.menuId || null,
        icon: menu.icon,
      }
      this.onToggleFormModal()
    },

    onAddSubMenu(menu) {
      this.formData = {
        id: null,
        title: 'Sub Menu',
        description: `A submenu of ${menu.title}`,
        path: menu.path + '/',
        isUserMenu: true,
        module: menu.module,
        menuId: menu.id,
        icon: 'mdi-chevron-right',
      }
      this.onToggleFormModal()
    },

    onToggleDeleteMenu(menu = null) {
      this.selectedMenu = menu
      this.showDeleteModal = !this.showDeleteModal
    },

    async onDeleteMenu() {
      if (this.isDeleting) {
        return
      }
      this.isDeleting = true
      try {
        const menu = this.selectedMenu
        await this.$axios.delete(`/api/system/menu/delete/${menu.id}`)
        this.systemInfoMessage(`${menu.title} menu was deleted.`)
        this.onToggleDeleteMenu()
        this.fetchData()
      } catch (error) {
        this.apiErrorMessage(error)
      } finally {
        this.isDeleting = false
      }
    },
  },
}
</script>

<style>
</style>
