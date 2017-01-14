var iFrames = ["1","2","3","4","5","6","7","8","9","10"];
var content = "";
var result = 0;
var videoID = "";
var videoFound = false;
var highCount = 0;
var arr = [0,1,2,3,4,5,6,7,8,9];
var iter = 0;
var videoArray = [];


function refreshVideos(){
	iter = 0;
	RandomWord(iter);
}

function RandomWord(num) {
	iter = num;
    var requestStr = "http://randomword.setgetgo.com/get.php";
    highCount = 0;
    console.log("RandomWord Started");
	  
	  $.ajax({
	        type: "GET",
	        url: requestStr,
	        async: false,
	        dataType: "jsonp",
	        success: function (data) {
			    console.log(data.Word);
			    content = data.Word;
			    console.log("content set as word");
			    searchVideos(content);
			}
	    });   
}

 function searchVideos(q){
 	var search = "q=" + q;
	var apiKey = "key=AIzaSyBZkk40SrP3H7OEyseGZT2udP298u6lnaU";
	var part = "part=snippet";
	var order = "viewCount";

	console.log("Searching Videos");

 	$.ajax({
            type: "GET",
            url: "https://www.googleapis.com/youtube/v3/search" + "?" + apiKey + "&" + search + "&" + part + "&" + order,
            dataType: "jsonp",
            async: false,
            success: function(data){
	            	if(typeof data !== "undefined" && typeof data.items[0] !== "undefined" && typeof data.items[0].id !== "undefined" && typeof data.items[0].id.videoId !== "undefined"){
	            		videoID = data.items[0].id.videoId;
            			highCount = data.pageInfo.totalResults;
		            	console.log(videoID);
		            	if(highCount > 100){
					 		console.log(videoID);
						 	document.getElementById(iFrames[iter]).src = "http://www.youtube.com/embed/" + videoID + "?autoplay=0";
						 	if(iter < 9){
						 		iter += 1;
						 		RandomWord(iter);
						 	}
					 	}else{
					 		RandomWord(iter);
					 	}
				    }else{
				    	RandomWord(iter);
				    }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
        		alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    		}  
        });

 } 