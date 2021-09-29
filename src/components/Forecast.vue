<script>
import { defineComponent } from 'vue';
import { padTime } from '../functions.js';

const temperatureColours = {
    tm10: [127,141,184],
    tm9: [139,152,191],
    tm8: [152,164,198],
    tm7: [162,172,203],
    tm6: [175,184,211],
    tm5: [187,194,217],
    tm4: [198,204,223],
    tm3: [211,215,230],
    tm2: [222,226,237],
    tm1: [234,237,243],
     t0: [245,246,250],
     t1: [255,249,232],
     t2: [255,245,217],
     t3: [255,241,202],
     t4: [255,237,186],
     t5: [255,234,172],
     t6: [255,229,155],
     t7: [255,226,141],
     t8: [255,222,125],
     t9: [255,218,109],
    t10: [255,215,101],
    t11: [255,210,98],
    t12: [255,204,95],
    t13: [255,199,92],
    t14: [255,194,89],
    t15: [255,189,86],
    t16: [255,184,83],
    t17: [255,179,80],
    t18: [255,173,77],
    t19: [255,168,74],
    t20: [255,164,71],
    t21: [255,158,68],
    t22: [255,153,66],
    t23: [255,148,62],
    t24: [255,143,59],
    t25: [255,138,57],
    t26: [255,131,53],
    t27: [254,125,51],
    t28: [250,116,51],
    t29: [248,109,51],
    t30: [243,98,51],
    t31: [239,87,51],
    t32: [235,78,51],
    t33: [231,68,51],
    t34: [227,58,51],
    t35: [222,46,51],
    t36: [218,36,51],
    t37: [214,25,51],
    t38: [209,13,51],
    t39: [205,3,51],
    t40: [195,0,49],
}

export default defineComponent({
    props: [
        'src',
    ],
    computed: {
        rainColour() {
            if(typeof this.src.rain === 'undefined' || this.src.rain < 30) {
                return '';
            }
            return 'color: rgba(28,116,153)';
        },
        theTime() {
            if(typeof this.src.time === 'undefined') {
                return ''
            }
            return padTime(this.src.time)+':00'
        },
        theRain() {
            if(typeof this.src.rain === 'undefined') {
                return ''
            }
            return this.src.rain+'%';
        },
        theTemp() {
            if(typeof this.src.temperature === 'undefined') {
                return ''
            }
            return this.src.temperature+'°';
        },
        theIcon() {
            if(typeof this.src.type === 'undefined') {
                return '';
            }
            return `<img class="inline-block" src="/weather_icons/${this.src.type}.svg">`;

        },
        tempColour() {
            if(typeof this.src.temperature === 'undefined') {
                return '';
            }
            let index;
            if(this.src.temperature < -10) {
                index = 'tm10';
            } else if (this.src.temperature > 40) {
                index = 't40';
            } else {
                index = 't'+String(this.src.temperature).replace('-', 'm')
            }
            return `background: rgb(${temperatureColours[index][0]},${temperatureColours[index][1]},${temperatureColours[index][2]})`;
        }
    },
});
</script>

<style>
.type img {
    height: 70px;
}
</style>

<template>
    <li class="forecast bg-white bg-opacity-70 text-center mt-12 font-semibold text-xl">
        <div class="rain p-2" :style="rainColour">{{theRain}}</div>
        <div class="type align-center" v-html="theIcon"></div>
        <div class="temperature mx-5" :style="tempColour">{{theTemp}}</div>
        <div class="time py-3">{{theTime}}</div>
    </li>
</template>
