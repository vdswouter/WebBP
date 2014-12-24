LMR MVC Pattern - Web example
========

Frontend boilerplate/kickstart/utility-belt/... running on [Gulp](http://gulpjs.com/), [Sass](http://sass-lang.com/) & [Compass](http://compass-style.org/).    
Build with love for everyday use at Little Miss Robot, demo: [http://demo.littlemissrobot.com/FLOW](http://demo.littlemissrobot.com/FLOW/)

Dependencies
------------

* backbone (Routing, class setup)
* backbone singleton-extension
* backbone Class extension
* handlebars for templating
* bean.js (event bus)
* Underscore (Backbone dependency, max version 1.4.4)
* Jquery Cookie
* Jquery

Principle
---------
* `development/` contains application code and assets
* `deploy/` contains the built application
* `Gulpfile.js` configures Gulp tasks
* `package.json` contains npm dependencies


Installing
----------
Prerequisites for installing

* [Node](http://nodejs.org) (for gulp build environment)
* [Ruby](http://ruby-lang.org) (for compiling SASS into CSS)

Ruby is present by default on Mac OS X. On most linux distros, it is either installed or
available as a package. Check `ruby -v` to see if it is installed. Once ruby is installed, run the following command to install the dependencies: `gem install bundler && bundle install`


How to get started
------------------
1) If not present on your system (aka install once)

* install [Node](http://nodejs.org)
* `(sudo) gem update --system`: install latest Ruby Gem
* `(sudo) gem install compass`: install Compass Ruby Gem (min. version 1.0.1)
* `(sudo) npm install gulp -g`: install Gulp (global)

2) Navigate to your project folder (aka install for each project)

* `(sudo) npm install gulp --save-dev`: install Gulp (local)
* `(sudo) npm install`: install npm dependencies


Common tasks
------------

* `gulp iconfont` to create an icon font from a set of svg-sources
* `gulp server` to start a web server (including livereload, running on port 9000)
* `gulp build` to build a production-ready application in the deploy/ folder


Changelog (from v0.1 - using Grunt)
-----------------------------------

* Replaced Grunt by Gulp for speed, performance & ease-of-use
* Added create an icon font from a set of svg-sources
* Added .htaccess file and support for custom Window 8 tiles (IE11)
* Revision of metatags, favicons and social sharing assets (now in stored in development/meta)
* Roll your own javascript setup (we no longer enforce Require.js)
* Added boilerplate styleguide.html
* New sass structure, reflecting component-driven design
* Auto-creation of a separate css with all media queries (replacing main-desktop.scss)
* Write media queries inside components
* Write vendor-free css, Autoprefixer takes care of that
* Switched to rems for base typography (utility methods are provided)


Contact
-------

* @gwenvanhee - gwen@littlemissrobot.com    
* @vdswouter - wouter@littlemissrobot.com