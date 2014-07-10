/*
 *  crosshair.js - v0.0.1
 *  Crosshair any dom element.
 *  https://github.com/eschmar/crosshair
 *
 *  Made by Marcel Eschmann
 *  Under MIT License
 */
 
;(function ( $, window, document, undefined ) {
	// set default config
	var defaults = {};

	// constructor
	function Plugin(element, options){
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this.init();
	}

	Plugin.prototype = {
		init: function() {
			// code here
		}
	}

	// lightweight plugin wrapper, preventing against multiple instantiations
	$.fn["crosshair"] = function (options) {
		return this.each(function() {
			if (!$.data(this, "crosshair")) {
				$.data(this, "crosshair", new Plugin(this, options))
			};
		});
	};
})( jQuery, window, document );