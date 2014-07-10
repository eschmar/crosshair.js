/*
 *  crosshair.js - v0.1.0
 *  Crosshair any dom element.
 *  https://github.com/eschmar/crosshair
 *
 *  @author:   Marcel Eschmann, @eschmar
 *  @license:  MIT License
 */
 
;(function ( $, window, document, undefined ) {
    // set default config
    var coords, pct, legend, marker, defaults = {
        wrap: true,
        legend: true,
        marker: '<div class="crosshair-marker"></div>',
        callback: function(crosshair) { console.log(crosshair.pct); }
    };

    // constructor
    function Plugin(element, options){
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        if (this.options.wrap) {
            $(element).wrap('<div class="crosshair"></div>');
            this.element = $(element).parent();
        }else {
            this.element = $(element).addClass('crosshair');
        }
        this.coords = {x: null, y: null};
        this.pct = {x: null, y: null};
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            this.spawnCrosshair();
        },

        spawnCrosshair: function() {
            var app = this;
            this.element.append('<div class="hair hair-vertical"></div>');
            this.element.append('<div class="hair hair-horizontal"></div>');

            // hide crosshair onmouseleave
            this.element.hover(function() {
                app.element.find('.hair').show();
            }, function() {
                app.element.find('.hair').hide();
            });

            this.initCrosshair();
        },

        initCrosshair: function() {
            var app = this;
            $(this.element).on('mousemove touchmove', function(event) {
                // calculate relative position
                var offset, left, top;
                offset = app.element.offset();
                left = event.clientX - offset.left;
                top = event.clientY - offset.top;

                // update position
                app.coords.x = left;
                app.coords.y = top;
                app.element.find('.hair.hair-horizontal').css('top', top);
                app.element.find('.hair.hair-vertical').css('left', left);

                // convert to percentages
                app.pct.x = ((100 / app.element.width())*app.coords.x).toFixed(2);
                app.pct.y = ((100 / app.element.height())*app.coords.y).toFixed(2);

                app.updateLegend();
                event.stopPropagation();
            });

            this.element.click(function(event) {
                app.setMarker();
                event.stopPropagation();
            });
        },

        updateLegend: function() {
            if (!this.options.legend) {
                this.element.find('.crosshair-legend').remove();
                this.legend = null;
                return;
            };

            if (!this.legend) {
                this.element.append('<div class="crosshair-legend"></div>');
                this.legend = this.element.find('.crosshair-legend');
            };

            this.legend.html('X: '+this.pct.x+'%, Y: '+this.pct.y+'%');
        },

        setMarker: function() {
            if (!this.marker) {
                this.element.append(this.options.marker);
                this.marker = this.element.find('.crosshair-marker');
            };
    
            var dimension = this.marker.width();
            this.marker.css('left', this.coords.x-(dimension/2));
            this.marker.css('top', this.coords.y-(dimension/2));

            // trigger callback
            this.options.callback(this);
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