/*
*
*/

$(document).ready( function(){
	//server = new CuberServer("YGBRYWGRRGYYOOWRROOWYWBOGYB","GBGYRBOWBWOGBOYOBRWRRBGWGYW");
	//server.twist('b');
	//server.twist('f');
	//server.twist('l');
	server = null
	function loadCmd() {
		 $.get("?cmd",function(data,status){
			if ("success"==status)
			{
				console.log(data)
				if(54==data.length){
					colors1=data.substring(0,27);
					colors2=data.substring(27);
				
					server = new CuberServer(colors1,colors2);
				}
				else if (1==data.length)
				{
					server.twist(data);
				}
			}
		});
	}

	setTimeout(loadCmd,100); 
});
