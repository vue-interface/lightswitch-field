module.exports = {
    content: [
        "./index.html"
    ],
    theme: {
        extend: {
            variations: {
                primary: 'red'
            }
        },
    },
    plugins: [
        ...require('@vue-interface/form-control/tailwindcss')
    ],
    safelist: [
        ...require('@vue-interface/form-control/tailwindcss/safelist')()
    ]
};