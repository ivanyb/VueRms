<template>

<div class="catelist">
        <a href="#">point a</a>
    <list tablename="point"></list>
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
      color: greenyellow;
  }
</style>