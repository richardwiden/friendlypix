/**
 * @author Richard Widén
 */
module.exports = function (grunt) {
  grunt.initConfig({
    wiredep: {
      task: {
        src: [
          'index.html',
        ],
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'lib/routing.js': 'scripts/routing.js',
          'lib/experiences.js': 'scripts/experiences.js',
          'lib/experience.js': 'scripts/experience.js',
          'lib/firebase.js': 'scripts/firebase.js',
          'lib/import.js': 'scripts/import.js',
          'lib/auth.js': 'scripts/auth.js'
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ['styles']
        },
        files: {
          'styles/main.css': 'styles/main.less'
        }
      },
      production: {
        options: {
          paths: ['styles']
        },
        files: {
          'styles/main.css': 'styles/main.less'
        }
      }
    },
    watch: {
      scripts: {
        files: ['scripts/*.js'],
        tasks: ["babel"]
      },
      html: {
        files: ['bower.json'],
        tasks: ["wiredep"]
      },
      css: {
        files: ["styles/main.less"],
        tasks: ["less:development"]
      },
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask("watchFiles", ["babel", "wiredep", "less:development", "watch"]);
};
