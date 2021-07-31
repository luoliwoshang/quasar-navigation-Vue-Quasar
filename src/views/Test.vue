<template>
  <vuedraggable class="wrapper" v-model="list">
    <transition-group class="transition-group">
      <div v-for="item in list" :key="item" class="item">
        <p>{{ item }}</p>
      </div>
    </transition-group>
  </vuedraggable>
</template>

<script>
// import vuedraggable from "vuedraggable";
// import axios from "axios";
// import Post from "../api/express";
// export default {
//   name: "HelloWorld",
//   components: { vuedraggable },
//   props: {},
//   data() {
//     return {
//       list: [1, 2, 3, 4, 5, 6],
//     };
//   },
//   updated() {
//     console.log(this.list);
//   },
//   mounted() {

//   },
//   methods: {},
// };
</script>
<style scoped>
/* .transition-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20%;
}
.item {
  width: 30%;
  height: 50px;
  background-color: #42b983;
  color: #ffffff;
  border: 1px solid black;
  margin: 20px 0;
} */
</style>