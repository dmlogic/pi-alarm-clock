<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: [
        'config'
    ],
    data() {
        return {
            
        }
    },
    methods: {
        httpCall() {

            // this works in browser without CORS grief
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist/?key='+this.config.key, false);
                console.log("about to send");
            xhr.send();


            if (xhr.readyState == 4 && xhr.status == 200) {
                var call_response = JSON.parse(xhr.responseText);
                console.log("got response");
                console.log(call_response);
            } else if (xhr.status <= 599 && xhr.status >= 400) {
                console.log("API request failed - Code " + xhr.status);
                console.log(xhr.responseText);
            }

        }
    },
    mounted() {
        this.httpCall();
    }
});
</script>

<style scoped>
</style>

<template>
    Weather
</template>