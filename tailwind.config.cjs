module.exports = {
    content: [
        './index.html'
    ],
    theme: {
        extend: {
            variations: {
                primary: 'purple'
            }
        },
    },
    presets: [
        require('@vue-interface/form-control/tailwindcss')
    ]
};