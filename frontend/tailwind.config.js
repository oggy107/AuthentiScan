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
            boxShadow: {
                button: "0px 0px 4px 0px #0F31F2",
            },
        },
    },
    plugins: [],
};
