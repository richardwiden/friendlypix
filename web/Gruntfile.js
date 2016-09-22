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
          'lib/routing.js': 'scripts/routing.js'
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
        files: ['scripts/*.js',"index.html","styles/main.less"],
        tasks: ["babel", "wiredep","less:development"]
      },
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask("watchFiles", ["babel", "wiredep","less:development", "watch"]);
};
