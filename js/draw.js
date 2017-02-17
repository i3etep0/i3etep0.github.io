window.onload = function() {
		var tintCanvas = document.createElement('canvas');
	var tintCtx = tintCanvas.getContext('2d');
	var currentColor = {} ;
	var currentInstrument = 'marker';
	var instruments = {
		brush:1,
		eraser:0,
		marker:0
	};
	var brushSizeScale = .5;


	var brushImg = new Image();
	brushImg.onload = tintBrush(tintCanvas,brushImg);
	brushImg.src = './img/brush0.png';
	// function Instrument(name,size,state){
	// 	this.name = name;
	// 	this.size = size;
	// 	this.state = state;
	// 	this.toggleState = function() {
	// 	    this.state = (this.state + 1) % 2;
	// 	    console.log(this.state);
	// 	};
	// };
	// var pencil = new Instrument('pencil',4,1);
	// var brush  = new Instrument('brush',4,0);
	// var eraser = new Instrument('eraser',4,0);
	// var marker = new Instrument('marker',4,0);
	
	// var instruments = [];
	// instruments.push(pencil,brush,eraser,marker);
	// console.log(instruments);
	// var currentInstrument = "brush";
	



	var CNV = {};
	CNV.width = 0;
	CNV.height = 0;


	var svgGroupWidth = $('#ggg')[0].getBoundingClientRect().width,
		svgGroupHeight = $('#ggg')[0].getBoundingClientRect().height;
	$('.instruments__element__pencil').on( "click", function() {
		currentInstrument = 'pencil';
		//$(this).removeClass("active");
		$(".instruments__element ").removeClass("active_instrument");
		 if ($(this).hasClass('active_instrument')) {
          //$('#blah').addClass('blah2'); 
      } else {
          $(this).addClass('active_instrument'); 
      }
		
	});
	$('.instruments__element__eraser').on( "click", function() {
		currentInstrument = 'eraser';
		$(".instruments__element ").removeClass("active_instrument");
		 if ($(this).hasClass('active_instrument')) {
          //$('#blah').addClass('blah2'); 
      } else {
          $(this).addClass('active_instrument'); 
      }
	});
	$('.instruments__element__marker').on( "click", function() {
	currentInstrument = 'marker';
		$(".instruments__element ").removeClass("active_instrument");
		 if ($(this).hasClass('active_instrument')) {
          //$('#blah').addClass('blah2'); 
      } else {
          $(this).addClass('active_instrument'); 
      }
	});
	$('.instruments__element__brush').on( "click", function() {
	currentInstrument = 'brush';
		$(".instruments__element ").removeClass("active_instrument");
		 if ($(this).hasClass('active_instrument')) {
          //$('#blah').addClass('blah2'); 
      } else {
          $(this).addClass('active_instrument'); 
      }
	tintBrush(tintCanvas,brushImg);
	});
	
	$('.sizes__element__large').on( "click", function() {
		brushSizeScale = 1;
		setbrushSize(brushSizeScale);
		tintBrush(tintCanvas,brushImg);
		$(".sizes__element ").removeClass("active_instrument");
		 if ($(this).hasClass('active_instrument')) {
          //$('#blah').addClass('blah2'); 
      } else {
          $(this).addClass('active_instrument'); 
      }
	});
	$('.sizes__element__medium').on( "click", function() {
		brushSizeScale = .5;
		setbrushSize(brushSizeScale);
		tintBrush(tintCanvas,brushImg);
		$(".sizes__element ").removeClass("active_instrument");
		 if ($(this).hasClass('active_instrument')) {
          //$('#blah').addClass('blah2'); 
      } else {
          $(this).addClass('active_instrument'); 
      }
	});
	$('.sizes__element__small').on( "click", function() {
		brushSizeScale = .3;
		setbrushSize(brushSizeScale);
		tintBrush(tintCanvas,brushImg);
		$(".sizes__element ").removeClass("active_instrument");
		 if ($(this).hasClass('active_instrument')) {
          //$('#blah').addClass('blah2'); 
      } else {
          $(this).addClass('active_instrument'); 
      }
	});

	$('.controls__element__clear').on( "click", function() {
		clearCanvas();
	});

	$('.controls__element__save').on( "click", function() {
		saveCanvasToPNG(canvas,ctx);
	});
	


	$(window).resize(function() {
			var resizeTimer;

	    if (resizeTimer) {
	        clearTimeout(resizeTimer); 
	    }
	  
	    resizeTimer = setTimeout(function() {
	        resizeTimer = null;

			var bufferSketch = copyCanvasRegionToBuffer( canvas, 0, 0, canvas.width,canvas.height);
	  		
	  		var svgGroupNewWidth = $('#ggg')[0].getBoundingClientRect().width,
	  			svgGroupNewHeight = $('#ggg')[0].getBoundingClientRect().height;

	  		ctx.canvas.width = $('#mainImage').width();
	  		ctx.canvas.height = $('#mainImage').height();
	  		
	  		var scaleX = svgGroupNewWidth / svgGroupWidth,
	  			scaleY = svgGroupNewHeight / svgGroupHeight;;
		
			ctx.save();
			ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
			ctx.translate(-CNV.width/2 * scaleX , -CNV.height/2 * scaleY);
			ctx.drawImage(bufferSketch, 0, 0, CNV.width * scaleX, CNV.height * scaleY);

			ctx.restore();

			CNV.width = ctx.canvas.width;
			CNV.height = ctx.canvas.height;
			svgGroupWidth = svgGroupNewWidth,
			svgGroupHeight =svgGroupNewHeight;
			setbrushSize(brushSizeScale);
		}, 300);  
	});

	function saveCanvasToPNG(cv,ct){
		var svg = document.querySelector('svg'); 
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d'); //create new canvas 
		//canvas.id = "CursorLayer";
		canvas.width = $('#mainImage').width();
		canvas.height = $('#mainImage').height();

		canvg(canvas, svg.parentNode.innerHTML.trim().replace(/<canvas.*?<\/canvas>/g,'')); //svg to canvas
		
		var bufferSvg = copyCanvasRegionToBuffer( canvas, 0, 0, canvas.width,canvas.height); //svg
		var bufferSketch = copyCanvasRegionToBuffer( cv, 0, 0, cv.width,cv.height); // sketch

		ctx.save();
		ctx.globalCompositeOperation="multiply";
		ctx.fillStyle = "rgba(255, 255, 255, 1)";	
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.drawImage(bufferSvg, 0, 0);
		ctx.drawImage(bufferSketch, 0, 0);
		ctx.restore();

		//var image = canvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
		//window.location.href=image; // it will save locally


		var dataURL = canvas.toDataURL('image/png');
		var data = atob(dataURL.substring('data:image/png;base64,'.length)),
		asArray = new Uint8Array(data.length);

		for (var i = 0, len = data.length; i < len; ++i) {
			asArray[i] = data.charCodeAt(i);
		}

		var blob = new Blob([asArray.buffer], {type: 'image/png'});
		saveAs(blob, 'export_' + Date.now() + '.png');
	};

	currentColor.color = "hsl(120, 100%, 50%)";
	//var img = new Image();
	
	

	
	// CONTROLS
	$( ".reload" ).on( "click", function() {
		location.reload();
	});

	$( ".next_div" ).on( "click", function() {
		$( ".more" ).toggleClass( "visible" );
		$('.next_div').toggleClass('special');
	});
	// END CONTROLS

	var standartColors = $('.standart_color');//document.getElementsByClassName("standart_color");
	var lightColors = $('.slight_color');//document.getElementsByClassName("slight_color");
	var darkColors = $('.sdark_color');//document.getElementsByClassName("sdark_color");

	addEventListenersToStandartColor();
	addEventListenersToClrDivs();

	$('div.clr.standart_color.green').trigger('click');
	
	var canvasPadding = 10;

	var mainWidth = $('#mainImage').width();
	var mainHeight = $('#mainImage').height();

	var svg = document.querySelector('#mainImage');

	jQuery('#mainImage').after('<canvas id="c"> </canvas>') ; 

	var svgString = new XMLSerializer().serializeToString(document.querySelector('#mainImage'));

	// var canvasMain = document.getElementById('c');
	// var ctx = canvasMain.getContext('2d');
	var canvas = document.getElementById('c');
	var ctx = canvas.getContext('2d');

	ctx.lineJoin = ctx.lineCap = 'round';
	ctx.globalAlpha = 1;
	var brushSize;
	var isDrawing, lastPoint,data,imageData;

	resizeCanvasesToXY(canvas,mainWidth,mainHeight);
	setbrushSize(brushSizeScale);
	//debugger;
	function setbrushSize(scale){
		brushSize = Math.floor( Math.max(canvas.width, canvas.height) / (50*(1/scale)) );
	};

	function resizeCanvasesToXY(c,x,y){
		//console.log(div.width());
		c.width  = CNV.width = x;
		c.height = CNV.height = y;
	};

	function addPaddingToCanvases(c,p){
		resizeCanvasesToXY(c,c.width-2*p,c.height-2*p);
		c.style.padding = p+"px";
	}


	$('#mainImage').css(    {"pointer-events": "none"});
	$('#mainImage .st0').css(    {"fill": "rgba(0, 0, 0, 0)"})
	
	var image = new Image();

	makePNG(canvas);
	
	function makePNG(canvas){
		var DOMURL = self.URL || self.webkitURL || self;
		var image = new Image();
		var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
		var url = DOMURL.createObjectURL(svg);
		var png = canvas.toDataURL("image/png");
		document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
		DOMURL.revokeObjectURL(png);
		image.src = url;
	};
	
	//var image = new Image();
	
	image.onload = function(){
		//ctx.drawImage(image, 0, 0);
    	
    	//var png = canvas.toDataURL("image/png");
   		//document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
   		//DOMURL.revokeObjectURL(png);



		//var size = resizeImageToCanvas(canvasMain,image);
		

		//console.log(size.w+";"+size.h);
		//resizeCanvasesToXY(canvasMain,size.w-2*canvasPadding,size.h-2*canvasPadding);
		
		// if (mainWidth!=canvasMain.width){
		// 	//$('#mainDiv').width(canvasMain.width);
		// 	console.log($('#mainCanvasDiv').height());
		// 	console.log(canvasMain.height);
		// 	$('#mainCanvasDiv').width(canvasMain.width+2*canvasPadding);
		// 	$('#mainCanvasDiv').height(canvasMain.height+2*canvasPadding);
		// }
		//	ctxTemp.drawImage(image,0,0,size.w,size.h);
		//imageData = ctxTemp.getImageData(0,0,canvasMain.width, canvasMain.height);
		//data = imageData.data;
		//removeWhite(data);
		//ctxUpper.putImageData(imageData, 0, 0);
	}
	

	// Set up mouse events for drawing
	var drawing = false;
	var mousePos = { x:0, y:0 };
	var lastPos = mousePos;

	canvas.addEventListener("mousedown", function (e) {
		drawing = true;
		lastPos = getMousePos(canvas, e);
	}, false);

	canvas.addEventListener("mouseup", function (e) {
	  drawing = false;
	}, false);

	canvas.addEventListener("mousemove", function (e) {
	  mousePos = getMousePos(canvas, e);
	}, false);

	// Get the position of the mouse relative to the canvas
	function getMousePos(canvasDom, mouseEvent) {
	  var rect = canvasDom.getBoundingClientRect();
	  return {
	    x: mouseEvent.clientX - rect.left,
	    y: mouseEvent.clientY - rect.top
	  };
	}

	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame || 
			   window.webkitRequestAnimationFrame ||
			   window.mozRequestAnimationFrame ||
			   window.oRequestAnimationFrame ||
			   window.msRequestAnimaitonFrame ||
			   function (callback) {
				   window.setTimeout(callback, 1000/60);
			   };
	})();
	// Draw to the canvas










	function tintBrush(tintCanvas,brushImg) {
		
		tintCanvas.width = brushImg.width*brushSize/5;
		tintCanvas.height = brushImg.height*brushSize/5;
		
		var x=0;
		var y=0;
		tintCtx.save();
	    tintCtx.fillStyle = currentColor.color;
	    tintCtx.fillRect(x,y,brushImg.width*brushSize/5,brushImg.height*brushSize/5);
	    tintCtx.globalCompositeOperation = "destination-atop";
	    tintCtx.globalAlpha = 0.1;
	    tintCtx.drawImage(brushImg, x, y,tintCanvas.width,tintCanvas.height);
	    tintCtx.restore();
	    //ctx.drawImage(brushImg, x, y);
	    //ctx.globalAlpha = 0.5;
	    
	}




	function renderCanvas() {

	  if (drawing) {
	  	var dist = distanceBetween(lastPos, mousePos);
		var angle = angleBetween(lastPos, mousePos);
		ctx.fillStyle = currentColor.color;
	  	switch (currentInstrument) {
	  		case 'pencil':
				for (var i = 0; i < dist || i == 0; i+=1) {
					x = lastPos.x + (Math.sin(angle) * i - brushSize);
					y = lastPos.y + (Math.cos(angle) * i - brushSize);
					for (var n = 0; n < brushSize; n++) {
						var p = getRandomOffset(brushSize);
						var d = x + p.x + brushSize;
						var v = y + p.y + brushSize;
						ctx.save();
						ctx.translate(d,v);
						ctx.fillRect(0, 0, 1, 1)
						ctx.restore();
					}
				}
				lastPos = mousePos;
		    	break;
			case 'marker':
				for (var i = 0; i <= dist; i+=1) {
				    x = lastPos.x + (Math.sin(angle) * i);
				    y = lastPos.y + (Math.cos(angle) * i);
				    ctx.beginPath();
     				ctx.arc(x, y, brushSize, 0, 2 * Math.PI, false);
     				ctx.fill();
				  }
				  lastPos = mousePos;
				break;
			case 'eraser':
			for (var i = 0; i <= dist; i+=1) {
				    x = lastPos.x + (Math.sin(angle) * i);
				    y = lastPos.y + (Math.cos(angle) * i);
				    var radgrad = ctx.createRadialGradient(x,y,0,x,y,brushSize);
				    radgrad.addColorStop(0, '#fff');
				    radgrad.addColorStop(0.7, 'rgba(255,255,255, 0.5)');
				    radgrad.addColorStop(1, 'rgba(255,255,255, 0)');
				    //console.log(currentColor.color);
				    ctx.fillStyle = radgrad;
				    ctx.fillRect(x-brushSize, y-brushSize, brushSize*2, brushSize*2);
				  }
				  lastPos = mousePos;
				break;
			case 'brush':
			for (var i = 0; i <= dist; i+=1) {
				    x = lastPos.x + (Math.sin(angle) * i);
				    y = lastPos.y + (Math.cos(angle) * i);
				       ctx.save();
				       ctx.translate(-brushImg.width/2,-brushImg.height/2);
				       ctx.drawImage(tintCanvas, x,y);
				       ctx.restore();
				  	
				  }
				  lastPos = mousePos;
				
				break;
			default:
				console.log( 'Я таких значений не знаю' );
				break;
		}
	  }
	}

	// Allow for animation
	(function drawLoop () {
	  requestAnimFrame(drawLoop);
	  renderCanvas();
	})();
// Set up touch events for mobile, etc
	canvas.addEventListener("touchstart", function (e) {
		mousePos = getTouchPos(canvas, e);
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchend", function (e) {
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchmove", function (e) {
		 if (e.targetTouches.length > 1) {
    		
    		e.stopPropagation();
    	
  		}else{



		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}
	}, false);

	// Get the position of a touch relative to the canvas
	function getTouchPos(canvasDom, touchEvent) {
	  var rect = canvasDom.getBoundingClientRect();
	  return {
	    x: touchEvent.touches[0].clientX - rect.left,
	    y: touchEvent.touches[0].clientY - rect.top
	  };
	}
	// Prevent scrolling when touching the canvas
	// document.body.addEventListener("touchstart", function (e) {
	//   if (e.target == canvas) {
	//     e.preventDefault();
	//   }
	// }, false);
	// document.body.addEventListener("touchend", function (e) {
	//   if (e.target == canvas) {
	//     e.preventDefault();
	//   }
	// }, false);
	// document.body.addEventListener("touchmove", function (e) {
	//   if (e.target == canvas) {
	//     e.preventDefault();
	//   }
	// }, false);


	var dataUrl = canvas.toDataURL();


	function clearCanvas() {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    console.log('clear');
	}


	//ADDITIONAL FUNCTIONS
	function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
	function clearCircle(context,x,y,radius) {
		context.save();
		context.beginPath();
		context.arc(x, y, radius, 0, 2*Math.PI, true);
		context.clip();
		context.clearRect(x-radius,y-radius,radius*2,radius*2);
		context.restore();
	}

	function copyCanvasRegionToBuffer( canvas, x, y, w, h, bufferCanvas ){
		if (!bufferCanvas) bufferCanvas = document.createElement('canvas');
		bufferCanvas.width  = w;
		bufferCanvas.height = h;
		bufferCanvas.getContext('2d').drawImage( canvas, x, y, w, h, 0, 0, w, h );
		return bufferCanvas;
	};


	var removeWhite = function(data) {
		for (var i = 0; i < data.length; i += 4) {
			var alpha = 255-(0.21*data[i] + 0.72*data[i +1] + 0.07*data[i +2]);
			data[i]     = 0; // red
			data[i + 1] = 0; // green
			data[i + 2] = 0; // blue
			data[i + 3] = alpha; 
		};

	};

	function RGBtoHSL(r, g, b){
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if(max == min){
	        h = s = 0; // achromatic
	    }else{
	    	var d = max - min;
	    	s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	    	switch(max){
	    		case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	    		case g: h = (b - r) / d + 2; break;
	    		case b: h = (r - g) / d + 4; break;
	    	}
	    	h /= 6;
	    }
	    return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
	}

	function getRandomOffset(e) {
		var t = Math.random() * 2 * Math.PI;
		var n = Math.random() * e;
		return {
			x: Math.cos(t) * n,
			y: Math.sin(t) * n
		}
	};

	function distanceBetween(point1, point2) {
		return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	};
	function angleBetween(point1, point2) {
		return Math.atan2( point2.x - point1.x, point2.y - point1.y );
	};
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	
	function addEventListenersToClrDivs(){
		var clrDivs = document.getElementsByClassName("clr");
		for (var i = 0; i < clrDivs.length; i++) {
			clrDivs[i].addEventListener('click', function(e){
				changeCurrentColor(e.target);
				changeBrushColor();
			}, false);
		};
	};

	function addEventListenersToStandartColor(){
		for (var i = 0; i < standartColors.length; i++) {
			standartColors[i].addEventListener('click', function(e){
				changeColors(e);
			}, false);
		};
	};

	function changeColors(e){
		var color = e.target.style.color;
		var rgb = color.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',');
		var hsv = RGBtoHSL(rgb[0], rgb[1], rgb[2]);
		for (var i = 0; i < lightColors.length; i++) {
			var result =  "hsl("+hsv[0]+","+hsv[1]+"%,"+(hsv[2]+Math.round(i*3.6))+"%)";
			var element = lightColors[i];
			var element0 = lightColors[i].children[0];
			element.style.color = result;
			element0.style.fill = result;
			element0.style.color = result;

		}
		for (var i = 0; i < darkColors.length; i++) {
			var result =  "hsl("+hsv[0]+","+hsv[1]+"%,"+(hsv[2]-Math.round(i*3.6))+"%)";
			var element = darkColors[i];
			var element0 = darkColors[i].children[0];
			element.style.color = result;
			element0.style.fill = result;
			element0.style.color = result;
		}
		
	};

	function changeCurrentColor(target){
		currentColor.color = target.style.color;
		tintBrush(tintCanvas,brushImg);
	};

	function changeBrushColor(){
		//$('#brush').css({backgroundColor:currentColor.color});
	};
	
};