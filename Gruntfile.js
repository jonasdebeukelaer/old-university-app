'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt); 

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app/static',
      dist: 'app/static'
    },
    sync: {
      dist: {
        files: [{
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: '**'
        }]
      }
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
        ],
        //tasks: ['sync:dist']
      }
    },
    connect: {
      proxies: [
        {
          context: '/unisalad',
          host: 'localhost',
          port: 5000,
          https: false,
          changeOrigin: false
        }
      ],
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= yeoman.app %>'
          ],
          middleware: function (connect) {
            return [
              proxySnippet,
              connect.static(require('path').resolve('app/static'))
            ];
          }
        }
      },
      /*
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
      */
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: '**'
        }]
      },
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'test/config/karma.conf.js',
        singleRun: true
      }
    },
    bowercopy: {
      options: {
        destPrefix: '<%= yeoman.app %>'
      },
      test: {
        files: {
          'test/lib/angular-mocks': 'angular-mocks',
          'test/lib/angular-scenario': 'angular-scenario'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'app/static/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/static/css',
          ext: '.min.css'
        }]
      }
    },
    htmlmin: {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: [{
         expand: true,
         cwd: 'app/static',
         src: '**/*.html',
         dest: 'build/static/'
      }]
    },
    dev: {
      files: {
        'build/static/index.html': 'src/index.html'
      }
    }
    },
    imagemin: {
       dist: {
          options: {
            optimizationLevel: 5
          },
          files: [{
             expand: true,
             cwd: 'app/static/images',
             src: ['**/*.{png,jpg,gif,svg}'],
             dest: 'build/static/images'
          }]
       }
    },
    uncss: {
      inBuild: {
        files: {
          'build/static/css/all.clean.css': ['build/static/css/*.css']
        }
      }
    },
    copy: {
      stuff: {
        files: [{
            expand: true,
            cwd: 'app/static/lib',
            src: '**/*',
            dest: 'build/static/lib'  
          },
          {
            expand: true,
            cwd: 'app/static/',
            src: 'data/*',
            dest: 'build/static/'  
          },
          {
            expand: true,
            cwd: 'app/',
            src: 'models/*',
            dest: 'build/'
          },
          {
            expand: true,
            cwd: 'app/',
            src: 'routes/*',
            dest: 'build/'
          },
          {
            expand: true,
            cwd: 'app/',
            src: '*.py',
            dest: 'build/'
          },
          {
            expand: true,
            cwd: 'app/',
            src: '*.pyc',
            dest: 'build/'
          }
        ]
      }
    },
    replace: {
      script: {
        src: ['build/static/index.html'],
        dest: 'build/static/index.html',
        replacements: [ 
          {
            from: /<script src="js\/\w+\/\w+.+.js"><\/script>/g,
            to: ''
          },
          {
            from: '<script src="js/app.js"></script>',
            to: ''
          },
          {
            from: "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||",
              to: '<script src="all.min.annotate.js"></script><script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||'
          },
          {
            from: '<link href="css/main.css" rel="stylesheet">',
            to:   '<link href="css/main.min.css" rel="stylesheet">'
          }]
      }
    },
    ng_html2js: {
      this: {
        files: [{
            expand: true,
            cwd: 'app/static/',
            src: ['js/**/*.html'],
            dest: 'build_temp/',
            ext: '.js'
        }]
      }
    },
    ngAnnotate: {
      min: {
        files: [{
          "build_temp/all.annotate.js": ["build_temp/**/*.js", "app/static/js/**/*.js", "!app/static/js/directives/**/*.js"]
        }] 
      },
    },
    uglify: {
      options: {
          mangle: false,
        compress: {
          drop_console: true
        }
      },
      my_target: {
        files: [{
          'build/static/all.min.annotate.js': ['build_temp/all.annotate.js']
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('server', function (target) {
    grunt.task.run([
      'configureProxies',
      'connect:livereload',
      'watch'
    ]);
  });
  grunt.registerTask('build', [
      'copy:stuff',
      'htmlmin:dist',
      'cssmin',
      'imagemin:dist',
      'replace:script',
      'ng_html2js:this',
      'ngAnnotate:min',
      'uglify'
  ]);
};
