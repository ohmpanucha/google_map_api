<template>
  <section class="min-vh-100">
    <b-container>
      <SearchForm />
      <TheBoxMap />
    </b-container>
  </section>
</template>

<script>
import SearchForm from "../components/SearchForm.vue";
import TheBoxMap from "../components/TheBoxMap.vue";
export default {
  name: "IndexPage",
  layout: "app",
  components: {
    SearchForm,
    TheBoxMap,
  },

  head: {
    __dangerouslyDisabledSanitizers: ["script"],
    script: [
      {
        src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDg1hbcSjgrfbbNBS393_S3bjY11rGXwjg&libraries=places&callback=initMap&v=weekly",
        defer: true,
        async: true,
      },
    ],
  },
  mounted() {
    this.initToken();
  },
  methods: {
    // get token
    initToken() {
      this.$store.dispatch("getToken");
    },
  },
};
</script>
