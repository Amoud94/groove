<template>
  <div id="app h-[20rem] w-[100vw]">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {},
  data() {
    return {}
  },
  methods: {},
  beforeMount() {
  },
};
</script>
<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 680px;
}
</style>
