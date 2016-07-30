'use strict';

var proxyRequest = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt); 

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: {
            app: require('./bower.json').appPath || 'app/static',
            dist: 'app/static'
        },
        watch: {
            options: {
                livereload: 35729
            },
            src: {
                files: [
                    '<%= yeoman.app %>/*.html',
                    '<%= yeoman.app %>/css/**/*',
                    '<%= yeoman.app %>/js/**/*',
                    '<%= yeoman.app %>/views/**/*'
                ]
            }
        },
        connect: {
              livereload: {
                options: {
                  port: 9000,
                  hostname: '0.0.0.0',
                  livereload: 35729,
                  middleware: function (connect) {
                    return [
                      function(req, res, next) {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('Access-Control-Allow-Methods', '*');
                        next();
                      },
                      connect.static(require('path').resolve('app/static'))
                    ];
                  }
              }
            }
        }
    });

grunt.loadNpmTasks('grunt-connect-proxy');
grunt.loadNpmTasks('grunt-contrib-connect');

grunt.registerTask('server', function (target) {
    grunt.task.run([
        'connect',
        'watch'
        ]);
});
};
