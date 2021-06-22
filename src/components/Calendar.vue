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

<script lang="ts">

export default {
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
            this.date = now.getDate().toString() + this.ordinal( now.getDate() )
            this.month = this.months[ now.getMonth() ]
            this.year = now.getFullYear().toString()
        },
        ordinal(i:number) {
            i = Math.abs(i)
            var cent = i % 100
            if (cent >= 10 && cent <= 20) return 'th'
            var dec = i % 10
            if (dec === 1) return 'st'
            if (dec === 2) return 'nd'
            if (dec === 3) return 'rd'
            return 'th'
        }
    },
    mounted() {
        const timer = setInterval(this.updateCalendar, 60000)
        this.updateCalendar()
    }
}
</script>

<style scoped>
</style>
