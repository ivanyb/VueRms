<template>
<div>

<comp tablename="question" :categoryid="categoryid"></comp>
</div>
</template>

<script>
    import comp from '../subcom/cateedit.vue';


    export default{
        components:{
            comp
        },
        data(){
            return {
                categoryid:'0'               
            }
        },
        created(){
            this.categoryid = this.$route.params.cateid;           
        }
    }

</script>

<style scoped>
    
</style>