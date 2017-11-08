<template>
<div class="catelist">
    <a href="#">quest a</a>
    <list tablename="question"></list>
</div>
</template>

<script>
    import list from '../subcom/catelist.vue';


    export default{
        components:{
            list
        },
        data(){
            return {

            }
        }
    }

</script>

<style scoped>
  .catelist a{
      color:orange;
  }
</style>