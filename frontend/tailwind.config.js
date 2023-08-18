/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            gradientColorStops: {
                sky: "#001589",
                rose: ", #F32786",
            },
        },
    },
    plugins: [],
};
