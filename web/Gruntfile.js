module.exports = function (grunt) {
  grunt.initConfig({
    wiredep: {
      task: {
        src: [
          'index.html',
        ],
      }
    },
    "babel": {
      "options": {
        "sourceMap": true,
        "experimental": true
      },
      dist: {
        files: [{
          "expand": true,
          "cwd": "src/",
          "src": ["**/*.js"],
          "dest": "build/",
          "ext": ".js"
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
          "expand": true,
          "cwd": "src/",
          "src": ["**/*.html"],
          "dest": "build/",
          "ext": ".html"
        }]
      }
    },
    watch: {
      scripts: {
        files: 'src/*.js',
        tasks: ["babel"]
      },

    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask("default", ["babel"]);
};
