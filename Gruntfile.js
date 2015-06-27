module.exports = function(grunt) {
 
  var envToUse = grunt.option('env') || 'staging';
  var env = require('./environments/' + envToUse + '.js');
  var s3 = require('./config/s3.js');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    releaseDirectory: 'releases/<%= pkg.version %>-' + envToUse,
    htmlmin: {
        songs: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            expand: true,
            cwd: '<%= releaseDirectory %>/',
            src: ['songs/*.html'],
            dest: '<%= releaseDirectory %>/'
        }
    },
    clean: {
      release : [
        '<%= releaseDirectory %>/'
      ]
    },    
    copy: {      
      release:{
        files: [
          {
            expand: true, 
            cwd: 'src/', 
            src:['**','!**/*.scss'], 
            dest: '<%= releaseDirectory %>/'
          }
        ]
      }
    },    
    aws_s3: {
      release: {
        options: {
          accessKeyId: s3.accessKeyId,          
          secretAccessKey: s3.secretAccessKey,
          bucket: env.s3.bucket,    
          region: env.s3.region,        
          sslEnabled: false
        },
        files: [
          { 
            expand: true, 
            dest: '.', 
            cwd: '<%= releaseDirectory %>/', 
            src: ['**'], 
            action: 'upload', 
            differential: true 
          },          
          { 
            dest: '/', 
            cwd: '<%= releaseDirectory %>/', 
            action: 'delete', 
            differential: true 
          }
        ]
      }
    },
    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                './src/css/main.css': './src/sass/main.scss'
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-aws-s3');  
  grunt.loadNpmTasks('grunt-sass');
  
  grunt.registerTask('deploy', ['sass','clean:release','copy:release','htmlmin:songs','aws_s3']);
  grunt.registerTask('css',['sass']);
};
