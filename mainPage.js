function getMeta(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function() { callback(this.width, this.height); }
}

function insertImage(url){
	getMeta(url, function(width, height){
		var htmlString = $('body').html().toString();
		if(htmlString.indexOf(url)== -1){
			var src = document.getElementById("images-container");
   			var div = document.createElement("div");
   			div.className = "slide fade";
   			var img = document.createElement("img");
    		img.src = url;
    		div.appendChild(img);
    		src.appendChild(div);	
		}
	});
}

var timer;
var init = 0;
function clearContainer(){
	if (init){
		clearTimeout(timer);
		init = 0;
	}
	$("#images-container").empty();
}

function getPageImages(pageurl){
	clearContainer();
	var root_url= 'https://www.instagram.com/';
	var message = {link: root_url.concat(pageurl)};
	$.ajax({
 		url: '/',
 		datatype: "json",
 		type: "POST",
 		data: message,
 		success: function(response){
  			if(response.success[0] == 'invalid_account'){
  				alert('invalid account');
  			}
  			else{
  				var i = 0;
  				while(response.success[i] != undefined){
  					insertImage(response.success[i]);
  					i++;
  				}
  			}
 		}
	});
}

function init_ss(){
	if(!init){
		init = 1;
		startSlideshow();
	}
}

var slideIndex = 0;
function startSlideshow() {
    var i;
    var slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
       	slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex> slides.length){
    	slideIndex = 1
    }    
    slides[slideIndex-1].style.display = "block";  
    timer = setTimeout(startSlideshow, 5000); // Change image every 5 seconds
}

function getImages(){
	if(document.getElementById("link").value != ''){
		getPageImages(document.getElementById("link").value);
	}
}
