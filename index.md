---
layout: default
---
A jQuery plugin that let's you lay a crosshair over a dom element (for whatever reason) and receive its relative position onclick.

## why
I needed a simple way of letting the user choose the most important part of an image as part of an app.

## demo
<div id="demo"><img id="demo-img" src="http://eschmar.github.io/crosshair.js/images/minions-ymca.jpg" alt="YMCA Minions - copyright universal pictures"></div>

## usage
```JavaScript
$('#demo-img').crosshair({
    callback: function(crosshair) {
        console.log("Pixel coordinates: ("+crosshair.coords.x+"|"+crosshair.coords.y+")");
        console.log("Relative position: X: "+crosshair.pct.x+"%, Y: "+crosshair.pct.y+"%");
    }
});
```

## options
key|value (default)|description
---|---|---
legend|boolean (true)|Show the current position of your mouse if hovering the element
marker|string ('<div class="crosshair-marker"></div>')|Marker HTML template.
callback|function(crosshair){}|This method will be triggered after you've clicked and the marker has been set. Access coordinates through `crosshair.coords` and  `crosshair.pct`.
wrap|boolean (true)|Experimental switch to apply the crosshair directly on the chosen element if set to false.

## notes
This is a first version and has only been tested on the latest version of Firefox (hence v0.1), as this was the only requirement for my use case. Hopefully it will be of use to somebody.

## license
MIT License
