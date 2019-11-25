
// https://davidburgos.blog/how-to-fix-grunt-contrib-uglify-for-es6/
// https://gruntjs.com/configuring-tasks#building-the-files-object-dynamically

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

	// Project configuration.
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    CONFIG: grunt.file.readJSON('public/app.json'),

	    watch: {
	    	app: {
				files: [
					'src/assets/less/**/*.less',
				],
				tasks: ['less:app', 'postcss:app'],
				options: {
					event: ['changed', 'added', 'deleted'], //all
					spawn: false
				}
			}
		},


	    //Less Files
	    less: {
			options: {
				compress: true,
				optimization: 2,
				sourceMap: false,
				sourceMapFileInline: true,
				modifyVars: {
					'version': '"<%= CONFIG.version %>"'
				},
				banner: '/*! <%= pkg.name %> - v<%= CONFIG.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */' 
			},
			app: { 
				files: { 
					'src/assets/css/app-main.min.css': 'src/assets/less/app-main.less'
				} 
			}
		},


		//Post Process CSS
		postcss: {
			options: {
				map: true, 
				processors: [
					require('pixrem')(), // add fallbacks for rem units
					require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
					require('cssnano')() // minify the result
				]
			},
			app: { src: 'src/assets/css/app-main.min.css' }
		},


	});



	// Load the plugins that provides tasks.
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-postcss');

	// Default task(s).
	grunt.registerTask('default', ['watch:app']);

};