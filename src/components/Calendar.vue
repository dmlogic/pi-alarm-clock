<script>
import { defineComponent } from "vue"
import indicator from "ordinal/indicator"
export default defineComponent({
    data() {
        return {
            day: "",
            date: "",
            month: "",
            year: "",
            days: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        }
    },
    methods: {
        update(fromDate) {
            this.day = this.days[fromDate.getDay()]
            this.date =
                String(fromDate.getDate()) +
                "<small>" +
                indicator(fromDate.getDate()) +
                "</small>"
            this.month = this.months[fromDate.getMonth()]
            this.year = fromDate.getFullYear().toString()
        },
    },
})
</script>

<style scoped>
.calendar-month {
    padding: 0 0.8vw;
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
    <div
        class="
            calendar
            bg-white bg-opacity-70
            font-display
            text-center text-gray-800
        "
    >
        <p class="calendar-day pt-5 mb-4 font-bold" v-text="day"></p>
        <p class="calendar-date font-semibold">
            <span class="calendar-dom" v-html="date"></span>
            <span class="calendar-month" v-text="month"></span>
            <span class="calendar-year" v-text="year"></span>
        </p>
    </div>
</template>
