module.exports = {
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: 'style!css!less',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json',
                exclude: /node_modules/
            },
            {
                test: /\.ttf/,
                loader: 'file',
                exclude: /node_modules/
            }
        ]
    },
    vue: {
        postcss: [
            require('autoprefixer')({
                browsers: ['Android >= 4', 'Explorer >= 10', 'iOS >= 6'], cascade: false
            })
        ]
    }
};
