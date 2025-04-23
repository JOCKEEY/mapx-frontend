export const state = () => ({
    reportCategory: null,
    scoreCardIndex: null,
    showRegionPicker: false,
    showProvincePicker: false,
    showMunicipalityPicker: false,
    showBarangayPicker: false,
    selectedRegion: null,
    selectedProvince: null,
    selectedMunicipality: null,
    selectedBarangay: null,
  })
  
  export const getters = {
  }
  
  export const mutations = {
    setReportCategory(state, value) {
      state.reportCategory = value
    },
    setScorecardIndex(state, value) {
      state.scoreCardIndex = value
    },
    setShowRegionPicker(state, value) {
      state.showRegionPicker = value
    },
    setShowProvincePicker(state, value) {
      state.showProvincePicker = value
    },
    setShowMunicipalityPicker(state, value) {
      state.showMunicipalityPicker = value
    },
    setShowBarangayPicker(state, value) {
      state.showMunicipalityPicker = value
    },
    setSelectedRegion(state, value) {
      state.selectedRegion = value
    },
    setSelectedProvince(state, value) {
      state.selectedProvince = value
    },
    setSelectedMunicipality(state, value) {
      state.selectedMunicipality = value
    },
    setSelectedBarangay(state, value) {
      state.selectedBarangay = value
    },
    
  }
  
  export const actions = {
  }
  