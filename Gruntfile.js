module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            www: {
                src: 'src/playground.js',
                dest: 'www/index.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify']);
};
