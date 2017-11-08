<template>

<comp tablename="common" :categoryid="categoryid" :sortid="sort_id" :classlayer="class_layer"></comp>

</template>

<script>
    import comp from '../subcom/cateadd.vue';


    export default{
        components:{
            comp
        },
        data(){
            return {
                categoryid:'0',
                sort_id:1,
                class_layer:1
            }
        },
        created(){
            this.categoryid = this.$route.params.cateid;
            this.sort_id = this.$route.params.sortid;
            this.class_layer = this.$route.params.classlayer;
        }
    }

</script>

<style scoped>

</style>