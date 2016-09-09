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
*	U	R	F	D	L	B
*	B	R	W	G	O	Y	
*/

$(document).ready( function(){
	//server = null
	//server = new CuberServer("OOYBYYOGYGOBYRYRRRYORYBRBBBWWWWWWWWWGRBGOGOOORBYBGRGGG");
	//console.log(CuberServer.convertFaces("BBBBBBBBBRRRRRRRRRWWWWWWWWWGGGGGGGGGOOOOOOOOOYYYYYYYYY"))

	server = null
	function loadCmd() {
		 $.get("?cmd",function(data,status){
			if ("success"==status)
			{
				console.log(data)
				if(54==data.length){
					server = new CuberServer(data);
				}
				else if (1==data.length)
				{
					if ("XxRrMmLlYyUuEeDdZzFfSsBb".indexOf(data)>-1)
					{
						server.twist(data);
					}
				}
				setTimeout(loadCmd,100);
			}
		});
	}

	setTimeout(loadCmd,100); 
});
