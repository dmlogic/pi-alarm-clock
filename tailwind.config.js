module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                display: ['"Yaldevi"', "cursive"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
