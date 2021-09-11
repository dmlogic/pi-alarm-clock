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
</style>

<template>
    <div class="calendar">
        <p class="calendar-part calendar-day" v-text="day"></p>
        <p>
            <span class="calendar-part calendar-date" v-text="date"></span>
            <span class="calendar-part calendar-month" v-text="month"></span>
            <span class="calendar-part calendar-year" v-text="year"></span>
        </p>
    </div>
</template>