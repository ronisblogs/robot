/**
*
*
*/

CuberServer = function(colorsF,colorsB) {
	var useLockedControls = true,
		controls = useLockedControls ? ERNO.Locked : ERNO.Freeform;

	var ua = navigator.userAgent,
		isIe = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1;

	var container = document.getElementById( 'container' );
	if (2==container.childNodes.length)
	{
		container.removeChild(cube.domElement);
		cube=null;
	}
	
	cube = new ERNO.Cube({
		hideInvisibleFaces: true,
		controls: controls,
		renderer: isIe ? ERNO.renderers.IeCSS3D : null,
		cubelets: CuberServer.getCube(colorsF,colorsB)
	});
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
}

CuberServer.prototype.twist = function(cmd) {
	cube.twist(cmd);
}

CuberServer.convertColors = function(colors) {
	colorsErno = []

	for(c of colors) {
		switch (c)
		{
		case 'w':
		case 'W':
			colorsErno.push(ERNO.WHITE);
			break;
		case 'o':
		case 'O':
			colorsErno.push(ERNO.ORANGE);
			break;
		case 'b':
		case 'B':
			colorsErno.push(ERNO.BLUE);
			break;
		case 'r':
		case 'R':
			colorsErno.push(ERNO.RED);
			break;
		case 'g':
		case 'G':
			colorsErno.push(ERNO.GREEN);
			break;
		case 'y':
		case 'Y':
			colorsErno.push(ERNO.YELLOW);
			break;
		default:
			break;
		}	
	}
	return colorsErno
}

CuberServer.getCube = function(colorsF,colorsB) {
	colorsFront = CuberServer.convertColors(colorsF)
	colorsBack = CuberServer.convertColors(colorsB)

	return cubelets = [
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
}