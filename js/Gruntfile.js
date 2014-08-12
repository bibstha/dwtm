(function() {
  module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    return grunt.initConfig({
      watch: {
        coffee: {
          files: 'src/*.coffee',
          tasks: ['coffee:compile']
        }
      },
      coffee: {
        compile: {
          expand: true,
          flatten: true,
          cwd: "" + __dirname + "/src/",
          src: ['*.coffee'],
          dest: 'js/',
          ext: '.js'
        }
      }
    });
  };

}).call(this);
