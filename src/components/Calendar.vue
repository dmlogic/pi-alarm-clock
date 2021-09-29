<script>
import { defineComponent } from 'vue';
import ordinal from "ordinal"
export default defineComponent({
    data() {
        return {
            day: '',
            date: '',
            month: '',
            year: '',
            days:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

        }
    },
    methods: {
        updateCalendar() {
            let now = new Date;
            this.day = this.days[ now.getDay() ]
            this.date = ordinal(now.getDate())
            this.month = this.months[ now.getMonth() ]
            this.year = now.getFullYear().toString()
        }
    },
    mounted() {
        const timer = setInterval(this.updateCalendar, 60000)
        this.updateCalendar()
    }
});
</script>

<style scoped>
.calendar-month {
    padding:0 1vw;
}
.calendar-day,
.calendar-date {
    font-size: 2.6rem;
    line-height: 1;
}
.calendar-date {
    font-size: 2.1rem;
}
</style>

<template>
    <div class="calendar bg-white bg-opacity-70 font-display text-center text-gray-800">
        <p class="calendar-day pt-5 mb-4 font-bold" v-text="day"></p>
        <p class="calendar-date font-semibold">
            <span class="calendar-dom" v-text="date"></span>
            <span class="calendar-month" v-text="month"></span>
            <span class="calendar-year" v-text="year"></span>
        </p>
    </div>
</template>
