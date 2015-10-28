//Need to add environment-Test task in all new registerTask. Its mantatory for execute this test cases only in test environment
module.exports = function(grunt) {
  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
      env: {
          admin: {
              INTERNAL: true,
              EXTERNAL: false
          },
          external: {
              INTERNAL: false,
              EXTERNAL: true
          }
      },
    // Configure a mochaTest task
    mochaTest: {
        environmentTest: {
          options: {
              reporter: 'spec'
          },
          src: ['test/config/EnvironmentValidationTest.js']
        },
        adminTest: {
          options: {
              reporter: 'spec'
          },
          src: ['test/internal/**/*Test.js']
        },
        externalTest: {
          options: {
              reporter: 'spec'
          },
          src: ['test/external/**/*Test.js']
        }
    },
    jshint: {
        all: [
            "!*.js",
            "test/**/*.js",
            "test/**/**/*.js",
            "app/**/*V2.js",
            "app/**/**/*V2.js"
        ]
      , options: {
          jshintrc: '.jshintrc'
        },
      }

  });

  grunt.registerTask('default', ['test']);

  grunt.registerTask('test', ['external-test']);

  grunt.registerTask('jshint-test', [
      'jshint'
  ]);

  /*
   * Don't remove below environment-Test from admin-test and external-test task.
   * It ensures destructive Unit test cases execute ONLY on the test database.
   * WARNING: Until all documents are removed from database.
   */
  grunt.registerTask('environment-test', [
      'mochaTest:environmentTest'
  ]);

  grunt.registerTask('admin-test', [
      'env:admin', 'mochaTest:adminTest'
  ]);

  grunt.registerTask('external-test', [
      'env:external', 'mochaTest:externalTest'
  ]);
};
