module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/img");
    eleventyConfig.addWatchTarget("./src/img/");
    eleventyConfig.addPassthroughCopy("./src/js");
    eleventyConfig.addWatchTarget("./src/js/");

    return {
        dir: {
            input: "src",
            output: "public",
        }
    };
};