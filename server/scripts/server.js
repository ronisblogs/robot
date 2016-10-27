/**
*
             |************|
             |*U1**U2**U3*|
             |************|
             |*U4**U5**U6*|
             |************|
             |*U7**U8**U9*|
             |************|
 ************|************|************|************
 *L1**L2**L3*|*F1**F2**F3*|*R1**R2**R3*|*B1**B2**B3*
 ************|************|************|************
 *L4**L5**L6*|*F4**F5**F6*|*R4**R5**R6*|*B4**B5**B6*
 ************|************|************|************
 *L7**L8**L9*|*F7**F8**F9*|*R7**R8**R9*|*B7**B8**B9*
 ************|************|************|************
             |************|
             |*D1**D2**D3*|
             |************|
             |*D4**D5**D6*|
             |************|
             |*D7**D8**D9*|
             |************|
*
*	U1U2U3U4U5U6U7U8U9R1R2R3R4R5R6R7R8R9F1F2F3F4F5F6F7F8F9D1D2D3D4D5D6D7D8D9L1L2L3L4L5L6L7L8L9B1B2B3B4B5B6B7B8B9
*
*/

CuberServer = function(colors) {
	//var useLockedControls = true,
	//	controls = useLockedControls ? ERNO.Locked : ERNO.Freeform;

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
		controls: ERNO.Locked,
		renderer: isIe ? ERNO.renderers.IeCSS3D : null,
		cubelets: CuberServer.getCube(colors)
	});
	container.appendChild(cube.domElement );
	

	var fixedOrientation = new THREE.Euler(  Math.PI * 0.1, Math.PI * -0.25, 0 );
	cube.object3D.lookAt( cube.camera.position );
	cube.rotation.x += fixedOrientation.x;
	cube.rotation.y += fixedOrientation.y;
	cube.rotation.z += fixedOrientation.z;
	

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

CuberServer.getCube = function(colorsStr) {
	// 0~8		U
	// 9~17		R
	// 18~26	F
	// 27~35	D
	// 36~44	L
	// 45~53	B
	colors = CuberServer.convertColors(colorsStr)

	U=-1
	R=8
	F=17
	D=26
	L=35
	B=44
	return cubelets = [
		//	front, up, right, down, left, back
		[colors[F+1], colors[U+7], , , colors[L+3]],		// 1 = F1+U7+L3
		[colors[F+2], colors[U+8], , , ,],					// 2 = F2+U8
		[colors[F+3], colors[U+9], colors[R+1], , ,],		// 3 = F3+U9+R1
		[colors[F+4], , , ,colors[L+6] ,],					// 4 = F4+L6
		[colors[F+5], , , , ,],								// 5 = F5
		[colors[F+6], , colors[R+4], , ,],					// 6 = F6+R4
		[colors[F+7], , , colors[D+1], colors[L+9]],		// 7 = F7+D1+L9
		[colors[F+8], , , colors[D+2], , ],					// 8 = F8+D2
		[colors[F+9], , colors[R+7], colors[D+3], , ],		// 9 = F9+R7+D3
		[, colors[U+4], , , colors[L+2]],					// 10 = U4+L2
		[,colors[U+5], , , ,],								// 11 = U5
		[, colors[U+6], colors[R+2], , , ],					// 12 = U6+R2
		[, , , , colors[L+5]],								// 13 = L5
		[, , , , , ], 										// 14 =
		[, , colors[R+5], , , ], 							// 15 = R5
		[, , ,colors[D+4] , colors[L+8]],					// 16 = D4+L8
		[, , , colors[D+5], , ],							// 17 = D5
		[, , colors[R+8], colors[D+6], , ],					// 18 = R8+D6
		[, colors[U+1], , , colors[L+1], colors[B+3]],		// 19 = U1+L1+B3
		[, colors[U+2], , , , colors[B+2]],					// 20 = U2+B2
		[, colors[U+3], colors[R+3], , , colors[B+1]],		// 21 = U3+R3+B1
		[, , , , colors[L+4], colors[B+6]],					// 22 = L4+B6
		[, , , , , colors[B+5]],							// 23 = B5
		[, , colors[R+6], , , colors[B+4]],					// 24 = R6+B4
		[, , , colors[D+7], colors[L+7], colors[B+9]],		// 25 = D7+L7+B9
		[, , , colors[D+8], , colors[B+8]],					// 26 = D8+B8
		[, , colors[R+9], colors[D+9], , colors[B+7]]		// 27 = R9+D9+B7
	];
}