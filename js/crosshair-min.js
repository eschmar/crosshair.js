/*
 *  crosshair.js - v0.1.0
 *  Crosshair any dom element.
 *  https://github.com/eschmar/crosshair
 *
 *  @author:   Marcel Eschmann, @eschmar
 *  @license:  MIT License
 */
;(function(e,i,t,s){var r,n,h,a,o={wrap:true,legend:true,marker:'<div class="crosshair-marker"></div>',callback:function(e){console.log(e.pct)}};function l(i,t){this.options=e.extend({},o,t);this._defaults=o;if(this.options.wrap){e(i).wrap('<div class="crosshair"></div>');this.element=e(i).parent()}else{this.element=e(i).addClass("crosshair")}this.coords={x:null,y:null};this.pct={x:null,y:null};this.init()}l.prototype={init:function(){var e=this;this.spawnCrosshair();this.element.hover(function(){e.element.find(".hair, .crosshair-legend").show()},function(){e.element.find(".hair, .crosshair-legend").hide()})},spawnCrosshair:function(){this.element.append('<div class="hair hair-vertical"></div>');this.element.append('<div class="hair hair-horizontal"></div>');this.initCrosshair()},initCrosshair:function(){var i=this;e(this.element).on("mousemove touchmove",function(e){var t,s,r;t=i.element.offset();s=e.clientX-t.left;r=e.clientY-t.top;i.coords.x=s;i.coords.y=r;i.element.find(".hair.hair-horizontal").css("top",r);i.element.find(".hair.hair-vertical").css("left",s);i.pct.x=(100/i.element.width()*i.coords.x).toFixed(2);i.pct.y=(100/i.element.height()*i.coords.y).toFixed(2);i.updateLegend();e.stopPropagation()});this.element.click(function(e){i.setMarker();e.stopPropagation()})},updateLegend:function(){if(!this.options.legend){this.element.find(".crosshair-legend").remove();this.legend=null;return}if(!this.legend){this.element.append('<div class="crosshair-legend"></div>');this.legend=this.element.find(".crosshair-legend")}this.legend.html("X: "+this.pct.x+"%, Y: "+this.pct.y+"%")},setMarker:function(){if(this.element.find(".crosshair-marker").length>1){this.element.find(".crosshair-marker").remove();this.marker=null}else if(!this.marker&&this.element.find(".crosshair-marker").length===1){this.marker=this.element.find(".crosshair-marker")}if(!this.marker){this.element.append(this.options.marker);this.marker=this.element.find(".crosshair-marker")}var e=this.marker.width();var i=this.marker.height();this.marker.css("left",this.coords.y-e/2);this.marker.css("top",this.coords.y-i/2);this.options.callback(this)}};e.fn["crosshair"]=function(i){return this.each(function(){if(!e.data(this,"crosshair")){e.data(this,"crosshair",new l(this,i))}})}})(jQuery,window,document);