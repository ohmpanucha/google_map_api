// state
export const state = () => ({
    tokenCSRF: "",
    address: []
})

// mutations
export const mutations = {
    SET_TOKEN(state, payload) {
        state.tokenCSRF = payload;
    },
    SET_ADDRESS() {
        state.address.push(payload);
    }
}

// actions
export const actions = {

    // get csrf token form laravel
    async getToken({ commit }, payload) {
        const { token } = await this.$axios.$get('/gettoken');
        commit("SET_TOKEN", token);
    },

    // hit api get address form laravel
    async getAddress({ commit }, payload) {

        const latitude = payload.latitude;
        const longitude = payload.longitude;
        const _token = payload._token;

        await this.$axios.$post(`/getaddress`, {
            _token: _token,
            latitude: latitude,
            longitude: longitude
        }).then((response) => {
            console.log(response)
            // commit("SET_ADDRESS", address);
        }).catch((error) => {
            console.log('dd',error)
        });
    }
}

// getters
export const getters = {
    getIsToken: (state) => { return state.tokenCSRF }
}
