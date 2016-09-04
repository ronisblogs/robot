/*              ·~=≠≠x#≠≠=-                         ·=≈≠xxx≠≈~-·              
            ·~≠#%&$$$$&%x≈~·                        ~=≠#%$$$$$&%x≈-           
          ~x&$$$$$$$x~·  -%~                        #≈   -≈&$$$$$$$#≈·        
        =%$$$$$$$$$$-  -≠$$-                        x$%=·  x$$$$$$$$$&≠-      
      -%$$$$$$$$$$$$$%%$$$≈                         ·&$$&%&$$$$$$$$$$$$&≠     
     ·&$$$$$$$$$$$$$$$$$&=                           ·#$$$$$$$$$$$$$$$$$$≈    
     ≈$$$$$$$$$$$$$$$$$#-                              ≈&$$$$$$$$$$$$$$$$$    
     ≈$$$$$$$$$$$$$$$$$                                 ≈$$$$$$$$$$$$$$$$$    
     ·%$$$$$$$$$$$$$$$≈                                  &$$$$$$$$$$$$$$$=    
      ~#$$$$$$$$$$$$&≈                                   ·#$$$$$$$$$$$$&x     
      #%%%&&$$$$$&%≈-     =-   ·-=≈≈xxxxxx≠≠=~-·  -=       =x%$$$$$$&&%%&-    
      ≈$$&&%###≠~-       ·$&≈x%&$$$$$$$$$$$$$$$%#≠&$-        ·-≈###%&&$$%     
       #$$$$$$$x        ·≈$$$$$$$$$$$$$$$$$$$$$$$$$$%≈-        -$$$$$$$$~     
       ·x&$$&&%##≈-   ~x&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$#=·  ·=x#%&&&$&%=      
         -%&$$$$$$$≠=%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&x≈%$$$$$$$&≈        
           -=≠x#%&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%#≠=~·         
             ·~≠%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%≠=-·          
≈====≈≠≠≠xx#%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&%%#xx≠≠≈=≈
%&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&%
 ··-=x%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%x=-·· 
       -≈#&$$$$$$$$$$$$$$$$$$$$&$$$$$$$$$$$$$$&$$$$$$$$$$$$$$$$$$$$&#≈-       
          ·=%$$$$$$$$$$$$$$$$$$%=x%$$$$$$$$%≠~%$$$$$$$$$$$$$$$$$$%=·          
     ·-~≈≠x#%$$$$$$$$$$$$$$$$$$$x  -x$$$$≠·  x$$$$$$$$$$$$$$$$$$$%#x≠≈~-·     
   =≠&$$$$$%%%&$&%$$$$$$$$$$$$$$$%≠≠%$$$$%≠≠&$$$$$$$$$$$$$$$%&$&%%%$$$$$&≠~   
  -$&$&#≠==x&$$%%$$~~≠#&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&#≠~~$$%%$$&x==≠#%$%$=  
  ≈$$$~  ≈%$$#x&$$~    ·-=≠#%&&$$$$$$$$$$$$$$$$&%%#≠=-·    ~$$&x#$$%≈  -$$$x  
  ≠$$≠  #$$%-~%$#~           ··-~~==========~~-··           ~#$%~·%$$#  =$$#  
  ≠$%  ·$$#·-$&≈                                              ≠&$-·#$$·  #$#  
  ≈$=  ~$%  -$&                                                &$·  %$~  -$x  
  -&   ~$~   &≠                                                #%   ~$~   #=*/

/*
	TWIST NOTATION

	UPPERCASE = Clockwise to next 90 degree peg
	lowercase = Anticlockwise to next 90 degree peg

	FACE & SLICE ROTATION COMMANDS

	F	Front
	S 	Standing (rotate according to Front Face's orientation)
	B 	Back
	
	L 	Left
	M 	Middle (rotate according to Left Face's orientation)
	R 	Right
	
	U 	Up
	E 	Equator (rotate according to Up Face's orientation)
	D 	Down

	ENTIRE CUBE ROTATION COMMANDS
	
	X   Rotate entire cube according to Right Face's orientation
	Y   Rotate entire cube according to Up Face's orientation
	Z   Rotate entire cube according to Front Face's orientation

	NOTATION REFERENCES

	http://en.wikipedia.org/wiki/Rubik's_Cube#Move_notation
	http://en.wikibooks.org/wiki/Template:Rubik's_cube_notation
*/

$(document).ready( function(){
	var useLockedControls = true,
		controls = useLockedControls ? ERNO.Locked : ERNO.Freeform;

	var ua = navigator.userAgent,
		isIe = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1;

	var W, O, B, R, G, Y, COLOURLESS;
	W = ERNO.WHITE = new ERNO.Color("white", "W", "#FFF", "font-weight: bold; color: #888", "background-color: #F3F3F3; color: rgba( 0, 0, 0, 0.5 )");
	O = ERNO.ORANGE = new ERNO.Color("orange", "O", "#F60", "font-weight: bold; color: #F60", "background-color: #F60; color: rgba( 255, 255, 255, 0.9 )");
	B = ERNO.BLUE = new ERNO.Color("blue", "B", "#00D", "font-weight: bold; color: #00D", "background-color: #00D; color: rgba( 255, 255, 255, 0.9 )");
	R = ERNO.RED = new ERNO.Color("red", "R", "#F00", "font-weight: bold; color: #F00", "background-color: #F00; color: rgba( 255, 255, 255, 0.9 )");
	G = ERNO.GREEN = new ERNO.Color("green", "G", "#0A0", "font-weight: bold; color: #0A0", "background-color: #0A0; color: rgba( 255, 255, 255, 0.9 )");
	Y = ERNO.YELLOW = new ERNO.Color("yellow", "Y", "#FE0", "font-weight: bold; color: #ED0", "background-color: #FE0; color: rgba( 0, 0, 0, 0.5 )");
	ERNO.COLORLESS = new ERNO.Color("NA", "X", "#DDD", "color: #EEE", "color: #DDD");

	//colorsFront = [Y,G,B,R,Y,W,G,R,R,G,Y,Y,O,O,W,R,R,O,O,W,Y,W,B,O,G,Y,B]
	//colorsBack = [G,B,G,Y,R,B,O,W,B,W,O,G,B,O,Y,O,B,R,W,R,R,B,G,W,G,Y,W]
	//colorsFront = [R,R,R,G,G,G,R,R,R,G,G,G,R,R,R,G,G,G,Y,Y,Y,Y,Y,Y,Y,Y,Y]
	//colorsBack = [O,O,O,B,B,B,O,O,O,B,B,B,O,O,O,B,B,B,W,W,W,W,W,W,W,W,W]
	colorsFront = [W,W,W,G,G,G,W,W,W,G,G,G,W,W,W,G,G,G,R,R,R,R,R,R,R,R,R]
	colorsBack = [Y,Y,Y,B,B,B,Y,Y,Y,B,B,B,Y,Y,Y,B,B,B,O,O,O,O,O,O,O,O,O]

	cubelets = [
		//	front, up, right, down, left, back
		[colorsFront[0], colorsFront[18], , , colorsBack[12]],		// 1
		[colorsFront[1], colorsFront[19], , , ,],					// 2
		[colorsFront[2], colorsFront[20], colorsFront[3], , ,],		// 3 
		[colorsFront[6], , , ,colorsBack[6] ,],						// 4
		[colorsFront[7], , , , ,],									// 5
		[colorsFront[8], , colorsFront[9], , ,],					// 6
		[colorsFront[12], , , colorsBack[18], colorsBack[0]],		// 7
		[colorsFront[13], , , colorsBack[21], , ],					// 8
		[colorsFront[14], , colorsFront[15], colorsBack[24], , ],	// 9
		[, colorsFront[21], , , colorsBack[13]],					// 10
		[,colorsFront[22], , , ,],									// 11
		[, colorsFront[23], colorsFront[4], , , ],					// 12
		[, , , , colorsBack[7]],									// 13
		[, , , , , ], 												// 14
		[, , colorsFront[10], , , ], 								// 15
		[, , ,colorsBack[19] , colorsBack[1]],						// 16
		[, , , colorsBack[22], , ],									// 17
		[, , colorsFront[16], colorsBack[25], , ],					// 18
		[, colorsFront[24], , , colorsBack[14], colorsBack[15]],	// 19
		[, colorsFront[25], , , , colorsBack[16]],					// 20
		[, colorsFront[26], colorsFront[5], , , colorsBack[17]],	// 21
		[, , , , colorsBack[8], colorsBack[9]],						// 22
		[, , , , , colorsBack[10]],									// 23
		[, , colorsFront[11], , , colorsBack[11]],					// 24
		[, , , colorsBack[20], colorsBack[2], colorsBack[3]],		// 25
		[, , , colorsBack[23], , colorsBack[4]],					// 26
		[, , colorsFront[17], colorsBack[26], , colorsBack[5]]		// 27
	];

	cube = new ERNO.Cube({
		hideInvisibleFaces: true,
		controls: controls,
		renderer: isIe ? ERNO.renderers.IeCSS3D : null,
		cubelets: cubelets
	});

	var container = document.getElementById( 'container' );
	container.appendChild( cube.domElement );

	if( controls === ERNO.Locked ){
		var fixedOrientation = new THREE.Euler(  Math.PI * 0.1, Math.PI * -0.25, 0 );
		cube.object3D.lookAt( cube.camera.position );
		cube.rotation.x += fixedOrientation.x;
		cube.rotation.y += fixedOrientation.y;
		cube.rotation.z += fixedOrientation.z;
	}

	// The deviceMotion function provide some subtle mouse based motion
	// The effect can be used with the Freeform and Locked controls.
	// This could also integrate device orientation on mobile

	// var motion = deviceMotion( cube, container );

	// motion.decay = 0.1; 				// The drag effect
	// motion.range.x = Math.PI * 0.06;	// The range of rotation 
	// motion.range.y = Math.PI * 0.06;
	// motion.range.z = 0;
	// motion.paused = false;				// disables the effect
})
