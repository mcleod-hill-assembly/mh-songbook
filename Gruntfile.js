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
      options: {
        accessKeyId: s3.accessKeyId,
        secretAccessKey: s3.secretAccessKey,
        bucket: env.s3.bucket,
        region: env.s3.region,
        sslEnabled: false
      },
      release: {
        files: [
          { 
            expand: true, 
            dest: '.', 
            cwd: '<%= releaseDirectory %>/', 
            src: ['**'], 
            action: 'upload', 
            differential: true 
          }
        ]
      },
      release_cleanup: {
        files: [
          {
            dest: '/',
            cwd: '<%= releaseDirectory %>/',
            action: 'delete',
            differential: true
          }
        ]
      },
      restore_songs: {
        files: [
          {
            cwd: 'src/songs/',
            dest: 'songs/',
            action: 'download'
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
  
  grunt.registerTask('deploy', ['sass','clean:release','copy:release','htmlmin:songs','aws_s3:release']);
  grunt.registerTask('deploy_cleanup', ['aws_s3:release_cleanup']);
  grunt.registerTask('restore_songs', ['aws_s3:restore_songs']);
  grunt.registerTask('css',['sass']);
};
