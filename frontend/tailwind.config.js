/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            gradientColorStops: {
                sky: "#001589",
                rose: ", #F32786",
            },
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [],
};
