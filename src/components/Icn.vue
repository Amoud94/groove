<template>
  <div v-html="svg" class="flex items-center justify-center"  ></div>
</template>

<script>
import _ from "lodash";
import icons from '../assets/icon.js'
export default {
    props:['name'],
    name:'icn-svg',
    computed: {
        svg(){
           let name = _.kebabCase(this.name);
           if (icons[name]) return icons[name];
           return null;
        }
    },
}
</script>

<style>

</style>