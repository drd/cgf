module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            playground: {
                src: 'src/playground.js',
                dest: 'www/index.js'
            },
            torus: {
                src: 'src/torus.js',
                dest: 'www/torus.js'
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'www',
                    keepalive: true,
                    livereload: true
                }
            }
        },
        watch: {
            js: {
                options: {
                    livereload: true
                },
                files: 'src/**/*.js',
                tasks: ['browserify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['browserify']);
    grunt.registerTask('server', ['browserify', 'connect']);
};
