function px2rem(options) {
    // Setup the plugin instance with options...
}

px2rem.prototype.apply = function(compiler) {
    compiler.plugin("normal-module-factory", function(nmf) {
        nmf.plugin("after-resolve", function(data) {
            console.log(data);
            // data.loaders.unshift(path.join(__dirname, "postloader.js"));
        });
    });
};

module.exports = px2rem;
