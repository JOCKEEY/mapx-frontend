export const defaultState = () =>({
    
    years_covered: '',
    date_assessed: '',
    reviewers: [
        {
            id: Math.floor(Math.random() * 1000000).toString(),
            name: '',
            designation: '',
            contact: '',
        },
    ],
    respondents: [
        {
            id: Math.floor(Math.random() * 1000000).toString(),
            name: '',
            designation: '',
            contact: '',
        },
    ],
    bdrrm_plans: [],
    ref_documents: [],
    a1_criteria: [],
    a1_e: [],
    a1_remarks: '',
    a1_score: 0,
    a2_criteria: [],
    a2_remarks: '',
    a2_score: 0,
    b1_criteria: [],
    b1_a: [],
    b1_b: [],
    b1_remarks: '',
    b1_score: 0,
    b2_criteria: [],
    b2_c: [],
    b2_d: [],
    b2_remarks: '',
    b2_score: 0,
    c1_criteria: [],
    c1_a: [],
    c1_b: [],
    c1_c: [],
    c1_remarks: '',
    c1_score: 0,
    d1_criteria: [],
    d1_a: [],
    d1_b: [],
    d1_remarks: '',
    d1_score: 0,
    e1_criteria: [],
    e1_a: [],
    e1_a_others: '',
    e1_a_has_addtional_cap_building: '',
    e1_a_capacity_building: [
        {
            id:  Math.floor(Math.random() * 1000000).toString(),
            title: '',
            duration: '',
            provider: '',
        },
    ],
    e1_b: [],
    e1_b_other_procurement: '',
    e1_remarks: '',
    e1_score: 0,
    f1_criteria: [],
    f1_c: [],
    f1_remarks: '',
    f1_score: 0,
    g1_criteria: [],
    g1_a: [],
    g1_b: [],
    g1_remarks: '',
    g1_score: 0,
    h1_criteria: [],
    h1_remarks: '',
    h1_score: 0,
    h1_local_policies: [{
        id: Math.floor(Math.random() * 1000000),
        title: '',
        eo_ord_reso: '',
        date: '',
    }],
    i1_criteria: [],
    i1_c: [],
    i1_remarks: '',
    i1_score: 0,
    i2_criteria: [],
    i2_d: [],
    i2_remarks: '',
    i2_score: 0,
    drrm_innovations: '',
    bdrrm_budgeting: [
        {
            budget_before: '',
            budget_after_bdrrmp: '',
            budget_utilization_before: '',
        },
    ],
    major_findings_review: [
        { 
            element: 'A1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'A2',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'B1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
         { 
            element: 'B2',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'C1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'D1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'E1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'F1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'G1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'H1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'I1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'I2',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
    ],
    total_score: 0,
    location_code: '',
    barangay_id: 0,
    reg: '',
    prov: '',
    mun: '',
    brgy: '',
    createdBy: null,
});
export const state = () => ({
    
    regions: [],
    provinces: [],
    municipalities: [],
    barangays: [],

    years_covered: '',
    date_assessed: '',
    reviewers: [
        {
            id: Math.floor(Math.random() * 1000000).toString(),
            name: '',
            designation: '',
            contact: '',
        },
    ],
    respondents: [
        {
            id: Math.floor(Math.random() * 1000000).toString(),
            name: '',
            designation: '',
            contact: '',
        },
    ],
    bdrrm_plans: [],
    ref_documents: [],
    a1_criteria: [],
    a1_e: [],
    a1_remarks: '',
    a1_score: 0,
    a2_criteria: [],
    a2_remarks: '',
    a2_score: 0,
    b1_criteria: [],
    b1_a: [],
    b1_b: [],
    b1_remarks: '',
    b1_score: 0,
    b2_criteria: [],
    b2_c: [],
    b2_d: [],
    b2_remarks: '',
    b2_score: 0,
    c1_criteria: [],
    c1_a: [],
    c1_b: [],
    c1_c: [],
    c1_remarks: '',
    c1_score: 0,
    d1_criteria: [],
    d1_a: [],
    d1_b: [],
    d1_remarks: '',
    d1_score: 0,
    e1_criteria: [],
    e1_a: [],
    e1_a_others: '',
    e1_a_has_addtional_cap_building: '',
    e1_a_capacity_building: [
        {
            id:  Math.floor(Math.random() * 1000000).toString(),
            title: '',
            duration: '',
            provider: '',
        },
    ],
    e1_b: [],
    e1_b_other_procurement: '',
    e1_remarks: '',
    e1_score: 0,
    f1_criteria: [],
    f1_c: [],
    f1_remarks: '',
    f1_score: 0,
    g1_criteria: [],
    g1_a: [],
    g1_b: [],
    g1_remarks: '',
    g1_score: 0,
    h1_criteria: [],
    h1_remarks: '',
    h1_score: 0,
    h1_local_policies: [{
        id: Math.floor(Math.random() * 1000000),
        title: '',
        eo_ord_reso: '',
        date: '',
    }],
    i1_criteria: [],
    i1_c: [],
    i1_remarks: '',
    i1_score: 0,
    i2_criteria: [],
    i2_d: [],
    i2_remarks: '',
    i2_score: 0,
    drrm_innovations: '',
    bdrrm_budgeting: [
        {
            budget_before: '',
            budget_after_bdrrmp: '',
            budget_utilization_before: '',
        },
    ],
    major_findings_review: [
        { 
            element: 'A1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'A2',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'B1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
         { 
            element: 'B2',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'C1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'D1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'E1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'F1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'G1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'H1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'I1',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
        { 
            element: 'I2',
            timeframe: '',
            recommendation_actions: '',
            technical_assistance_need: '',
            technical_assistance_provider: '',
        },
    ],
    total_score: 0,
    location_code: '',
    barangay_id: 0,
    reg: '',
    prov: '',
    mun: '',
    brgy: '',
    createdBy: null,
  });
  
  export const getters = {
    regions(state) {
        return state.regions;
    },
    provinces(state) {
        return state.provinces;
    },
    municipalities(state) {
        return state.municipalities;
    },
    barangays(state) {
        return state.barangays;
    },
    years_covered(state) {
        return state.years_covered;
    },
    date_assessed(state) {
        return state.date_assessed;
    },
    reviewers(state){
        return state.reviewers;
    },
    respondents(state) {
        return state.respondents;
    },
    bdrrm_plans(state) {
        return state.bdrrm_plans;
    },
    ref_documents(state) {
        return state.ref_documents;
    },
    a1_criteria(state){
        return state.a1_criteria;
    },
    a1_e(state) {
        return state.a1_e;
    },
    a1_remarks(state){
        return state.a1_remarks;
    },
    a1_score(state) {
        return state.a1_score;
    },
    a2_criteria(state){
        return state.a2_criteria;
    },
    a2_remarks(state) {
        return state.a2_remarks;
    },
    a2_score(state) {
        return state.a2_score;
    },
    b1_criteria(state) {
        return state.b1_criteria;
    },
    b1_a(state) {
        return state.b1_a;
    },
    b1_b(state) {
        return state.b1_b;
    },
    b1_remarks(state){
        return state.b1_remarks;
    },
    b1_score(state){
        return state.b1_score;
    },
    b2_criteria(state) {
        return state.b2_criteria;
    },
    b2_c(state) {
        return state.b2_c;
    },
    b2_d(state) {
        return state.b2_d;
    },
    b2_remarks(state) {
        return state.b2_remarks;
    },
    b2_score(state) {
        return state.b2_score;
    },
    c1_criteria(state) {
        return state.c1_criteria;
    },
    c1_a(state) {
        return state.c1_a;
    },
    c1_b(state) {
        return state.c1_b;
    },
    c1_c(state) {
        return state.c1_c;
    },
    c1_remarks(state) {
        return state.c1_remarks;
    },
    c1_score(state) {
        return state.c1_score;
    },
    d1_criteria(state) {
        return state.d1_criteria;
    },
    d1_a(state) {
        return state.d1_a;
    },
    d1_b(state) {
        return state.d1_b;
    },
    d1_remarks(state) {
        return state.d1_remarks;
    },
    d1_score(state) {
        return state.d1_score;
    },
    e1_criteria(state) {
        return state.e1_criteria;
    },
    e1_a(state) {
        return state.e1_a;
    },
    e1_a_others(state) {
        return state.e1_a_others;
    },
    e1_a_has_addtional_cap_building(state) {
        return state.e1_a_has_addtional_cap_building;
    },
    e1_a_capacity_building(state) {
        return state.e1_a_capacity_building;
    },
    e1_b(state) {
        return state.e1_b;
    },
    e1_b_other_procurement(state) {
        return state.e1_b_other_procurement;
    },
    e1_remarks(state) {
        return state.e1_remarks;
    },
    e1_score(state) {
        return state.e1_score;
    },
    f1_criteria(state) {
        return state.f1_criteria;
    },
    f1_c(state) {
        return state.f1_c;
    },
    f1_remarks(state) {
        return state.f1_remarks;
    },
    f1_score(state) {
        return state.f1_score;
    },
    g1_criteria(state) {
        return state.g1_criteria;
    },
    g1_a(state) {
        return state.g1_a;
    },
    g1_b(state) {
        return state.g1_b;
    },
    g1_remarks(state) {
        return state.g1_remarks;
    },
    g1_score(state) {
        return state.g1_score;
    },
    h1_criteria(state) {
        return state.h1_criteria;
    },
    h1_remarks(state) {
        return state.h1_remarks;
    },
    h1_score(state) {
        return state.h1_score;
    },
    h1_local_policies(state) {
        return state.h1_local_policies;
    },
    i1_criteria(state) {
        return state.i1_criteria;
    },
    i1_c(state) {
        return state.i1_c;
    },
    i1_remarks(state) {
        return state.i1_remarks;
    },
    i1_score(state) {
        return state.i1_score;
    },
    i2_criteria(state) {
        return state.i2_criteria;
    },
    i2_d(state) {
        return state.i2_d;
    },
    i2_remarks(state) {
        return state.i2_remarks;
    },
    i2_score(state) {
        return state.i2_score;
    },
    drrm_innovations(state) {
        return state.drrm_innovations;
    },
    bdrrm_budgeting(state) {
        return state.bdrrm_budgeting;
    },
    major_findings_review(state) {
        return state.major_findings_review;
    },
    total_score(state) {
        const _totalScore =
        state.a1_score +
        state.a2_score +
        state.b1_score +
        state.b2_score +
        state.c1_score +
        state.d1_score +
        state.e1_score +
        state.f1_score +
        state.g1_score +
        state.h1_score +
        state.i1_score +
        state.i2_score;
        return _totalScore;
    },
    location_code(state) {
        return state.location_code;
    },
    barangay_id(state) {
        return state.barangay_id;
    },
    reg(state) {
        return state.reg;
    },
    prov(state) {
        return state.prov;
    },
    mun(state) {
        return state.mun;
    },
    brgy(state) {
        return state.brgy;
    },
  }
  
  export const mutations = {
    setRegion(state, value) {
        state.regions = value;
    },
    setProvince(state, value) {
        state.provinces = value;
    },
    setMunicipality(state, value) {
        state.municipalities = value;
    },
    setBarangay(state, value){
        state.barangays = value;
    },
    setYearsCovered(state, value) {
        state.years_covered = value;
    },
    setDateAssessed(state, value) {
        state.date_assessed = value;
    },
    setReviewers(state, value) {
        state.reviewers = value;
    },
    ADD_REVIEWER(state, reviewer){
        state.reviewers.push(reviewer)
    },
    UPDATE_REVIEWER(state, { index, updatedReviewer }) {
        state.reviewers.splice(index, 1, updatedReviewer);
    },
    REMOVE_REVIEWER(state, index) {
        state.reviewers.splice(index, 1);
    },
    setRespondents(state, value) {
        state.respondents = value;
    },
    ADD_RESPONDENT(state, respondent){
        state.respondents.push(respondent)
    },
    UPDATE_RESPONDENT(state, { index, updatedRespondent }) {
        state.respondents.splice(index, 1, updatedRespondent);
    },
    REMOVE_RESPONDENT(state, index) {
        state.respondents.splice(index, 1);
    },
    setBdrrmPlans(state, value) {
        state.bdrrm_plans = value;
    },
    ADD_BDRRMPLANS(state, refdoc){
        state.bdrrm_plans.push(refdoc);
    },
    REMOVE_BDRRMPLANS(state, index){
        state.bdrrm_plans.splice(index, 1)
    },
    setRefDocuments(state, value) {
        state.ref_documents = value;
    },
    ADD_REFDOC(state, refdoc){
        state.ref_documents.push(refdoc);
    },
    REMOVE_REFDOC(state, index){
        state.ref_documents.splice(index, 1);
    },
    setA1Criteria(state, value) {
        state.a1_criteria = value;
    },
    ADD_A1_CRITERIA(state, value){
        state.a1_criteria.push(value)
    },
    REMOVE_A1_CRITERIA(state, index){
        state.a1_criteria.splice(index, 1);
    },
    setA1E(state, value) {
        state.a1_e = value;
    },
    ADD_A1E(state, value){
        state.a1_e.push(value)
    },
    REMOVE_A1E(state, index){
        state.a1_e.splice(index, 1);
    },
    setA1Remarks(state, value) {
        state.a1_remarks = value;
    },
    setA1Score(state, value) {
        state.a1_score = value;
    },
    setA2Criteria(state, value) {
        state.a2_criteria = value;
    },
    ADD_A2CRITERIA(state, value){
        state.a2_criteria.push(value)
    },
    REMOVE_A2CRITERIA(state, index){
        state.a2_criteria.splice(index, 1);
    },
    setA2Remarks(state, value) {
        state.a2_remarks = value;
    },
    setA2Score(state, value) {
        state.a2_score = value;
    },
    setB1Criteria(state, value) {
        state.b1_criteria = value;
    },
    ADD_B1CRITERIA(state, value){
        state.b1_criteria.push(value);
    },
    REMOVE_B1CRITERIA(state, index){
        state.b1_criteria.splice(index, 1);
    },
    setB1A(state, value) {
        state.b1_a = value;
    },
    ADD_B1A(state, value){
        state.b1_a.push(value);
    },
    REMOVE_B1A(state, index){
        state.b1_a.splice(index, 1);
    },
    setB1B(state, value) {
        state.b1_b = value;
    },
    ADD_B1B(state, value){
        state.b1_b.push(value);
    },
    REMOVE_B1B(state, index){
        state.b1_b.splice(index, 1);
    },
    setB1Remarks(state, value) {
        state.b1_remarks = value;
    },
    setB1Score(state, value) {
        state.b1_score = value;
    },
    setB2Criteria(state, value) {
        state.b2_criteria = value;
    },
    ADD_B2CRITERIA(state, value){
        state.b2_criteria.push(value);
    },
    REMOVE_B2CRITERIA(state, index){
        state.b2_criteria.splice(index, 1);
    },
    setB2C(state, value) {
        state.b2_c = value;
    },
    ADD_B2C(state, value){
        state.b2_c.push(value);
    },
    REMOVE_B2C(state, index){
        state.b2_c.splice(index, 1);
    },
    setB2D(state, value) {
        state.b2_d = value;
    },
    ADD_B2D(state, value){
        state.b2_d.push(value);
    },
    REMOVE_B2D(state, index){
        state.b2_d.splice(index, 1);
    },
    setB2Remarks(state, value) {
        state.b2_remarks = value;
    },
    setB2Score(state, value) {
        state.b2_score = value;
    },
    setC1Criteria(state, value) {
        state.c1_criteria = value;
    },
    ADD_C1Criteria(state,value){
        state.c1_criteria.push(value);
    },
    REMOVE_C1Criteria(state, index){
        state.c1_criteria.splice(index, 1);
    },
    setC1A(state, value) {
        state.c1_a = value;
    },
    ADD_C1A(state,value){
        state.c1_a.push(value);
    },
    REMOVE_C1A(state, index){
        state.c1_a.splice(index, 1);
    },
    setC1B(state, value) {
        state.c1_b = value;
    },
    ADD_C1B(state,value){
        state.c1_b.push(value);
    },
    REMOVE_C1B(state, index){
        state.c1_b.splice(index, 1);
    },
    setC1C(state, value) {
        state.c1_c = value;
    },
    ADD_C1C(state,value){
        state.c1_c.push(value);
    },
    REMOVE_C1C(state, index){
        state.c1_c.splice(index, 1);
    },
    setC1Remarks(state, value) {
        state.c1_remarks = value;
    },
    setC1Score(state, value) {
        state.c1_score = value;
    },
    setD1Criteria(state, value) {
        state.d1_criteria = value;
    },
    ADD_D1CRITERIA(state, value){
        state.d1_criteria.push(value)
    },
    REMOVE_D1CRITERIA(state, index){
        state.d1_criteria.splice(index, 1);
    },
    setD1A(state, value) {
        state.d1_a = value;
    },
    ADD_D1A(state, value){
        state.d1_a.push(value)
    },
    REMOVE_D1A(state, index){
        state.d1_a.splice(index, 1);
    },
    setD1B(state, value) {
        state.d1_b = value;
    },
    ADD_D1B(state, value){
        state.d1_b.push(value)
    },
    REMOVE_D1B(state, index){
        state.d1_b.splice(index, 1);
    },
    setD1Remarks(state, value) {
        state.d1_remarks = value;
    },
    setD1Score(state, value) {
        state.d1_score = value;
    },
    setE1Criteria(state, value) {
        state.e1_criteria = value;
    },
    ADD_E1CRITERIA(state, value){
        state.e1_criteria.push(value);
    },
    REMOVE_E1CRITERIA(state, index){
        state.e1_criteria.splice(index, 1);
    },
    setE1A(state, value) {
        state.e1_a = value;
    },
    ADD_E1A(state, value){
        state.e1_a.push(value);
    },
    REMOVE_E1A(state, index){
        state.e1_a.splice(index, 1);
    },
    setE1AOthers(state, value) {
        state.e1_a_others = value;
    },
    ADD_E1AOthers(state, value) {
        state.e1_a_others.push(value);
    },
    REMOVE_E1AOthers(state, index) {
        state.e1_a_others.splice(index, 1);
    },
    setE1AHasAdditionalCapBuilding(state, value) {
        state.e1_a_has_addtional_cap_building = value;
    },
    setE1ACapacityBuilding(state, value) {
        state.e1_a_capacity_building = value;
    },
    ADD_E1ACapacityBuilding(state, value) {
        state.e1_a_capacity_building.push(value);
    },
    REMOVE_E1ACapacityBuilding(state, index) {
        state.e1_a_capacity_building.splice(index, 1);
    },
    UPDATE_E1ACapacityBuilding(state, { index, updatedE1ACapacityBuilding }) {
        state.e1_a_capacity_building.splice(index, 1, updatedE1ACapacityBuilding);
    },
    setE1B(state, value) {
        state.e1_b = value;
    },
    ADD_E1B(state, value) {
        state.e1_b.push(value);
    },
    REMOVE_E1B(state, index) {
        state.e1_b.splice(index, 1);
    },
    setE1BOtherProcurement(state, value) {
        state.e1_b_other_procurement = value;
    },
    setE1Remarks(state, value) {
        state.e1_remarks = value;
    },
    setE1Score(state, value) {
        state.e1_score = value;
    },
    setF1Criteria(state, value) {
        state.f1_criteria = value;
    },
    ADD_setF1Criteria(state, value){
        state.f1_criteria.push(value);
    },
    REMOVE_setF1Criteria(state, index){
        state.f1_criteria.splice(index, 1);
    },
    setF1C(state, value) {
        state.f1_c = value;
    },
    ADD_setF1C(state, value) {
        state.f1_c.push(value);
    },
    REMOVE_setF1C(state, index) {
        state.f1_c.splice(index, 1);
    },
    setF1Remarks(state, value) {
        state.f1_remarks = value;
    },
    setF1Score(state, value) {
        state.f1_score = value;
    },
    setG1Criteria(state, value) {
        state.g1_criteria = value;
    },
    ADD_G1Criteria(state, value) {
        state.g1_criteria.push(value);
    },
    REMOVE_G1Criteria(state, index) {
        state.g1_criteria.splice(index, 1);
    },
    setG1A(state, value) {
        state.g1_a = value;
    },
    ADD_G1A(state, value) {
        state.g1_a.push(value);
    },
    REMOVE_G1A(state, index) {
        state.g1_a.splice(index, 1)
    },
    setG1B(state, value) {
        state.g1_b = value;
    },
    ADD_G1B(state, value) {
        state.g1_b.push(value);
    },
    REMOVE_G1B(state, index) {
        state.g1_b.splice(index, 1);
    },
    setG1Remarks(state, value) {
        state.g1_remarks = value;
    },
    setG1Score(state, value) {
        state.g1_score = value;
    },
    setH1Criteria(state, value) {
        state.h1_criteria = value;
    },
    ADD_H1Criteria(state, value) {
        state.h1_criteria.push(value);
    },
    REMOVE_H1Criteria(state, index){
        state.h1_criteria.splice(index, 1);
    },
    setH1Remarks(state, value) {
        state.h1_remarks = value;
    },
    setH1Score(state, value) {
        state.h1_score = value;
    },
    setH1LocalPolicies(state, value) {
        state.h1_local_policies = value;
    },
    ADD_H1LocalPolicies(state, value) {
        state.h1_local_policies.push(value);
    },
    REMOVE_H1LocalPolicies(state, index){
        state.h1_local_policies.splice(index ,1);
    },
    UPDATE_H1LocalPolicies(state, {index, updatedLocalPolicies}){
        state.h1_local_policies.splice(index ,1, updatedLocalPolicies);
    },
    setI1Criteria(state, value) {
        state.i1_criteria = value;
    },
    ADD_I1Criteria(state, value) {
        state.i1_criteria.push(value);
    },
    REMOVE_I1Criteria(state, index) {
        state.i1_criteria.splice(index, 1);
    },
    setI1C(state, value) {
        state.i1_c = value;
    },
    ADD_I1C(state, value) {
        state.i1_c.push(value);
    },
    REMOVE_I1C(state, index) {
        state.i1_c.splice(index, 1);
    },
    setI1Remarks(state, value) {
        state.i1_remarks = value;
    },
    setI1Score(state, value) {
        state.i1_score = value;
    },
    setI2Criteria(state, value) {
        state.i2_criteria = value;
    },
    ADD_I2Criteria(state, value) {
        state.i2_criteria.push(value);
    },
    REMOVE_I2Criteria(state, index) {
        state.i2_criteria.splice(index, 1);
    },
    setI2D(state, value) {
        state.i2_d = value;
    },
    ADD_I2D(state, value) {
        state.i2_d.push(value);
    },
    REMOVE_I2D(state, index) {
        state.i2_d.splice(index, 1);
    },
    setI2Remarks(state, value) {
        state.i2_remarks = value;
    },
    setI2Score(state, value) {
        state.i2_score = value;
    },
    setDrrmInnovations(state, value) {
        state.drrm_innovations = value;
    },
    setBdrrmBudgeting(state, value) {
        state.bdrrm_budgeting = value;
    },
    UPDATE_BdrrmBudgeting(state, { index, updatedBdrrmBudgeting }) {
        state.bdrrm_budgeting.splice(index, 1, updatedBdrrmBudgeting);
    },
    setMajorFindingsReview(state, value) {
        state.major_findings_review = value;
    },
    UPDATE_MajorFindingsReview(state, { index, updatedMajorFindingsReview }) {
        state.major_findings_review.splice(index, 1, updatedMajorFindingsReview);
    },
    setTotalScore(state) {
        const _totalScore =
        state.a1_score +
        state.a2_score +
        state.b1_score +
        state.b2_score +
        state.c1_score +
        state.d1_score +
        state.e1_score +
        state.f1_score +
        state.g1_score +
        state.h1_score +
        state.i1_score +
        state.i2_score;
        
        state.total_score = _totalScore;
    },
    setLocationCode(state, value) {
        state.location_code = value;
    },
    setBarangayId(state, value) {
        state.barangay_id = value;
    },
    setReg(state, value) {
        state.reg = value;
    },
    setProv(state, value) {
        state.prov = value;
    },
    setMun(state, value) {
        state.mun = value;
    },
    setBrgy(state, value) {
        state.brgy = value;
    },
    RESET_STATE(state){
        Object.assign(state, defaultState());
    },
    SET_LOCAL_STORAGE_DATA(state, payload){
        Object.keys(payload).forEach(key => {
            if (key in state) {
                state[key] = payload[key];
            }
        });
    },
  }
  
export const actions = {
    addReviewer({ commit }, reviewer) {
        commit('ADD_REVIEWER', reviewer);
    },
    updateReviewer({ commit }, payload) {
        commit('UPDATE_REVIEWER', payload);
    },
    removeReviewer({ commit }, index) {
        commit('REMOVE_REVIEWER', index);
    },
    addRespondent({ commit }, respondent) {
        commit('ADD_RESPONDENT', respondent);
    },
    updateRespondent({ commit }, payload) {
        commit('UPDATE_RESPONDENT', payload);
    },
    removeRespondent({ commit }, index) {
        commit('REMOVE_RESPONDENT', index);
    },
    addRefDoc({ commit }, refDoc){
        commit('ADD_REFDOC', refDoc)
    },
    removeRefDoc({ commit }, index){
        commit('REMOVE_REFDOC', index)
    },
    addBdrrmPlans({ commit }, plans){
        commit('ADD_BDRRMPLANS', plans)
    },
    removeBdrrmPlans({ commit }, index){
        commit('REMOVE_BDRRMPLANS', index)
    },
    addA1Criteria({ commit }, value){
        commit('ADD_A1_CRITERIA', value)
    },
    removeA1Criteria({ commit }, index){
        commit('REMOVE_A1_CRITERIA', index)
    },
    addA1E({ commit }, value){
        commit('ADD_A1E', value)
    },
    removeA1E({ commit }, index){
        commit('REMOVE_A1E', index)
    },
    addA2Criteria({ commit }, value){
        commit('ADD_A2CRITERIA', value)
    },
    removeA2Criteria({ commit }, index) {
        commit('REMOVE_A2CRITERIA', index)
    },
    addB1Criteria({ commit }, value){
        commit('ADD_B1CRITERIA', value)
    },
    removeB1Criteria({ commit }, index) {
        commit('REMOVE_B1CRITERIA', index)
    },
    addB1A({ commit }, value){
        commit('ADD_B1A', value)
    },
    removeB1A({ commit }, index) {
        commit('REMOVE_B1A', index)
    },
    addB1B({ commit }, value){
        commit('ADD_B1B', value)
    },
    removeB1B({ commit }, index) {
        commit('REMOVE_B1B', index)
    },
    addB2Criteria({ commit }, value){
        commit('ADD_B2CRITERIA', value)
    },
    removeB2Criteria({ commit }, index) {
        commit('REMOVE_B2CRITERIA', index)
    },
    addB2C({ commit }, value){
        commit('ADD_B2C', value)
    },
    removeB2C({ commit }, index) {
        commit('REMOVE_B2C', index)
    },
    addB2D({ commit }, value){
        commit('ADD_B2D', value)
    },
    removeB2D({ commit }, index) {
        commit('REMOVE_B2D', index)
    },
    addC1Criteria({ commit }, value){
        commit('ADD_C1Criteria', value)
    },
    removeC1Criteria({ commit }, index) {
        commit('REMOVE_C1Criteria', index)
    },
    addC1A({ commit }, value){
        commit('ADD_C1A', value)
    },
    removeC1A({ commit }, index) {
        commit('REMOVE_C1A', index)
    },
    addC1B({ commit }, value){
        commit('ADD_C1B', value)
    },
    removeC1B({ commit }, index) {
        commit('REMOVE_C1B', index)
    },
    addC1C({ commit }, value){
        commit('ADD_C1C', value)
    },
    removeC1C({ commit }, index) {
        commit('REMOVE_C1C', index)
    },
    addD1Criteria({ commit }, value){
        commit('ADD_D1CRITERIA', value)
    },
    removeD1Criteria({ commit }, index) {
        commit('REMOVE_D1CRITERIA', index)
    },
    addD1A({ commit }, value){
        commit('ADD_D1A', value)
    },
    removeD1A({ commit }, index) {
        commit('REMOVE_D1A', index)
    },
    addD1B({ commit }, value){
        commit('ADD_D1B', value)
    },
    removeD1B({ commit }, index) {
        commit('REMOVE_D1B', index)
    },
    addE1Criteria({ commit }, value){
        commit('ADD_E1CRITERIA', value)
    },
    removeE1Criteria({ commit }, value){
        commit('REMOVE_E1CRITERIA', value)
    },
    addE1A({ commit }, value){
        commit('ADD_E1A', value)
    },
    removeE1A({ commit }, value){
        commit('REMOVE_E1A', value)
    },
    addE1B({ commit }, value){
        commit('ADD_E1B', value)
    },
    removeE1B({ commit }, value){
        commit('REMOVE_E1B', value)
    },
    addE1ACapacityBuilding({ commit }, value){
        commit('ADD_E1ACapacityBuilding', value)
    },
    removeE1ACapacityBuilding({ commit }, value){
        commit('REMOVE_E1ACapacityBuilding', value)
    },
    updateE1ACapacityBuilding({ commit }, payload) {
        commit('UPDATE_E1ACapacityBuilding', payload);
    },
    addf1Criteria({ commit }, value){
        commit('ADD_setF1Criteria', value);
    },
    removef1Criteria({ commit }, value){
        commit('REMOVE_setF1Criteria', value);
    },
    addf1C({ commit }, value){
        commit('ADD_setF1C', value);
    },
    removef1C({ commit }, value){
        commit('REMOVE_setF1C', value);
    },
    addG1Criteria({ commit }, value){
        commit('ADD_G1Criteria', value);
    },
    removeG1Criteria({ commit }, value){
        commit('REMOVE_G1Criteria', value);
    },
    addG1A({ commit }, value){
        commit('ADD_G1A', value);
    },
    removeG1A({ commit }, value){
        commit('REMOVE_G1A', value);
    },
    addG1B({ commit }, value){
        commit('ADD_G1B', value);
    },
    removeG1B({ commit }, value){
        commit('REMOVE_G1B', value);
    },
    addH1Criteria({ commit }, value){
        commit('ADD_H1Criteria', value);
    },
    removeH1Criteria({ commit }, value){
        commit('REMOVE_H1Criteria', value);
    },
    addH1LocalPolicies({ commit }, value){
        commit('ADD_H1LocalPolicies', value);
    },
    removeH1LocalPolicies({ commit }, value){
        commit('REMOVE_H1LocalPolicies', value);
    },
    updateH1LocalPolicies({ commit }, payload) {
        commit('UPDATE_H1LocalPolicies', payload);
    },
    addI1Criteria({commit}, value){
        commit('ADD_I1Criteria', value);
    },
    removeI1Criteria({commit}, value){
        commit('REMOVE_I1Criteria', value);
    },
    addI2Criteria({commit}, value){
        commit('ADD_I2Criteria', value);
    },
    removeI2Criteria({commit}, value){
        commit('REMOVE_I2Criteria', value);
    },
    addI1C({commit}, value){
        commit('ADD_I1C', value);
    },
    removeI1C({commit}, value){
        commit('REMOVE_I1C', value);
    },
    addI2D({commit}, value){
        commit('ADD_I2D', value);
    },
    removeI2D({commit}, value){
        commit('REMOVE_I2D', value);
    },
    updateBudget({ commit }, payload) {
        commit('UPDATE_BdrrmBudgeting', payload);
    },
    updateMajorFindings({ commit }, payload) {
        commit('UPDATE_MajorFindingsReview', payload);
    },
    resetStore({ commit }) {
        commit('RESET_STATE');
    },
    initializeFromLocalStorage({ commit }, key) {
        const value = localStorage.getItem(key);
        commit('SET_LOCAL_STORAGE_DATA',  JSON.parse(value));
    },
    setQat({ commit }, payload) {
        commit('SET_LOCAL_STORAGE_DATA',payload);
    },
}