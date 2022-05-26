<template>
  <b-form class="my-4" autocomplete="off">
    <b-row>
      <b-col sm="12" class="pt-2">
        <input
          id="auto-complete-search"
          type="text"
          class="form-control"
          placeholder="Enter your keyword"
        />
        <b-button
          class="btn-clear"
          variant="link"
          size="sm"
          @click="clearTextSearch"
        >
          <b-icon icon="x-lg"></b-icon>
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";
export default {
  name: "SearchForm",
  computed: {
    ...mapGetters({
      tokenCSRF: "getIsToken",
    }),
  },
  mounted() {
    this.token = this.tokenCSRF;
    // console.log('document.cookie',document.cookie)
    this.tambon = require("../assets/tambon.json");
    this.clearTextSearch();
  },
  data() {
    return {
      token: "",
      tambon: [],
      typeSearch:""
    };
  },
  methods: {
    // get current position (latitude, longitude)
    locatorButtonPressd() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        console.log("not support");
      }
    },
    // clear textbox search
    clearTextSearch() {
      document.getElementById("auto-complete-search").value = "";
      document.getElementById("auto-complete-search").focus();
    },
  },
};
</script>

<style scoped>
.locator-btn {
  border-radius: 50%;
  height: 20px;
  width: 20px;
  padding: 0;
}
.bg-locator-btn {
  background: #fe7555;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.area-locator-btn {
  display: flex;
  height: 100%;
  align-items: center;
}
.btn-clear {
  position: absolute;
  right: 17px;
  top: 10px;
  box-shadow: none;
}
.btn-clear:hover {
  color: red;
}
.area-list-tambon {
  display: block;
}
.box-list-tambon {
}
</style>
