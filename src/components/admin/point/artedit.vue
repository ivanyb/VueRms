<template>

<editarticle tablename="point" :artid="artid"></editarticle>

</template>

<script>
    import editarticle from '../subcom/editarticle.vue';


    export default{
        components:{
            editarticle
        },
        data(){
            return {
                artid:0    
            }
        },
        created(){
            this.artid = this.$route.params.artid;
        }
    }

</script>

<style scoped>
    
</style>