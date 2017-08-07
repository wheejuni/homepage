/* Blog Post Slider */
(function() {
	var elBlog = document.querySelector(".blog-post-links");
	var url = 'https://tlhm20eugk.execute-api.ap-northeast-2.amazonaws.com/prod/lambda_get_blog_info';
	if(elBlog) runXHR(url);

	function runXHR(url) {
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", blogPostSlider);
		oReq.open("GET", url);
		oReq.send();
	}

	function blogPostSlider() {
		var data = JSON.parse(this.responseText);
		var list = JSON.parse(data.body);
		var slides = list.length;
  
		for (var i = 0; i < slides + 1; i++) {
			e = i % slides;
			var title = list[e].title;
			var link = list[e].link;
			var post = '<li><a href="' + link + '" target="_blank">' + title + "</a></li>";
			elBlog.insertAdjacentHTML('beforeend', post);
		}

		lastSlide = elBlog.childNodes[slides - 1];
		cln = lastSlide.cloneNode(true);
		elBlog.insertBefore(cln, elBlog.childNodes[0]);

  
		/* slider */
		// init value
		var elBlogBanner = document.querySelector(".blog-banner");
		var slidesNum = elBlog.childElementCount;

		// init slide 
		var getwidth = changeSlideWidth();
		moveSlides(getwidth);
		setTimeout(function() {
			elBlog.style.transition = "";
		}, (600));

    	//reset slide width as reszing window
		window.addEventListener('resize', function(evt) {
			getwidth = changeSlideWidth();
			moveSlides(getwidth);
		});

		function changeSlideWidth() {
			var width;
			var container = document.getElementsByClassName("blog-content")[0];
			var containerwidth = getComputedStyle(container, null).getPropertyValue("width").replace(/\D/g, '').toString();

			if (containerwidth.length >= 5) {
				width = Number(/[0-9]{4}/.exec(containerwidth));
				if (width > screen.width) {
					width = Number(/[0-9]{3}/.exec(containerwidth));
				}
			} else {
				width = containerwidth;
			}

			elBlog.style.width = (slidesNum * width) + 'px';
			elBlog.style.transform = "translate(-" + width * 1 + "px, 0px)";
			elBlog.style.transition = "none";
			return width;
		}

		function moveSlides(width) {
			var i = 1;
			elBlog.style.width = (slidesNum * width) + 'px';
			elBlog.style.transform = "translate(-" + width * 1 + "px, 0px)";
			var slideButton = Array.prototype.slice.call(elBlogBanner.getElementsByTagName("button"));
  

			for (var e = 0; e < slideButton.length; e++) {
				slideButton[e].addEventListener("click", function(evt) {
					var target = evt.target;
					if (target.tagName === "SPAN") { target = target.parentNode;}

					if (target.className === "next") {
						i++;
						if (i > slidesNum) {i = 3;}
						moveNext(i);
					}
					if (target.className === "previous") {
						if (i === 0) {i = slidesNum;}
						if (i === slidesNum-1){ i = i-2;}
						movePrevious(i);
						i--;
					}
				});
			}

			function moveNext(i) {
				if (i === slidesNum) {
          			elBlog.style.transition = "none";
					elBlog.style.transform = "translate(-" + width * 1 + "px, 0px)";
					setTimeout(function() {
						elBlog.style.transition = "";
						elBlog.style.transform = "translate(-" + width * 2 + "px, 0px)";
					}, (100));
				}
        
       			else {
					elBlog.style.transition = "";
					elBlog.style.transform = "translate(-" + width * i + "px, 0px)";
				}
			}

			function movePrevious(i) {
        		if (i === slidesNum){
          			elBlog.style.transition = "none";
          			elBlog.style.transform = "translate(" + (width - (width * (i-1))) + "px, 0px)";
          			setTimeout(function() {
						elBlog.style.transition = "";
            			elBlog.style.transform = "translate(" + (width - (width * (i-2))) + "px, 0px)";
					}, (100));
        		}
        		else {
					elBlog.style.transition = "";
					elBlog.style.transform = "translate(" + (width - (width * i)) + "px, 0px)";
				} 
			}
		}
	}
})()