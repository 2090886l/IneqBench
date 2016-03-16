module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: ['angular/*.js', '!angular/angular*.js'],
      options: { 
        eqeqeq: true ,
        smarttabs:true , 
        laxcomma:true , 
        laxbreak:true ,
        reporter:'checkstyle' ,
        reporterOutput: 'jshint-results.xml' ,

        force:true   
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
};
