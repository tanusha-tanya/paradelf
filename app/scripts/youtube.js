$(document).ready(function () {
    var img = document.querySelectorAll(".videoImg");
    var article = document.querySelectorAll(".translation__videoitem");
    var video = document.querySelector('#video');
    var windowWidth =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if(img.length > 0){

    var id = img[img.length-1].dataset.src;

    function mainVid(id) {
        video.innerHTML ='<iframe width="560" height="315" src="https://www.youtube.com/embed/'
        +id+'?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    }
    articleClick();

    window.addEventListener('resize', function(){
      windowWidth =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (windowWidth < 768){
        video.innerHTML ="";
      }
      else{
        if(video.querySelector('iframe') != undefined){
          return
        }
        else{
          closeVideoitems()          
        }
      }
    });
  }

  function scrollToElement(theElement) {
	    var selectedPosX = 0;
	    var selectedPosY = 0;
	    while (theElement != null) {
	        selectedPosX += theElement.offsetLeft;
	        selectedPosY += theElement.offsetTop;
	        theElement = theElement.offsetParent;
	    }
	    window.scrollTo(selectedPosX,selectedPosY);
	}

  function showBigVideo(that){
    id = that.querySelector(".videoImg").dataset.src;
    scrollToElement(video);
    mainVid(id);
  }

  function closeVideoitems(){
    for(var i = 0; i < article.length; i++){
      article[i].classList.add("translation__videoitem-close");
      if(article[i].querySelector("iframe") !== null){
        deletVideo(article[i]);
      }
    }
  }

  function articleClick(){
    for(var i = 0; i < article.length; i++){
      article[i].addEventListener("click", function(){
        if(windowWidth >= 768){
          showBigVideo(this)
        }
        else{
          openItems(this)
        }
      })
    }
  }

  function openItems(that){
    if(that.classList.contains("translation__videoitem-close")){
      closeVideoitems();
      that.classList.remove("translation__videoitem-close");
      showSmallVideo(that);
    }
    else{
      that.classList.add("translation__videoitem-close");
      deletVideo(that);
    }
  }
  function deletVideo(videoitem){
    id = videoitem.querySelector("iframe").dataset.src;
    videoWrap = videoitem.querySelector(".video__wrap");
    videoWrap.innerHTML ='<img class="videoImg" src="https://img.youtube.com/vi/'+id+'/0.jpg" data-src="'+id+'">'
  }
  function showSmallVideo(videoitem){
    id = videoitem.querySelector(".videoImg").dataset.src;
    videoWrap = videoitem.querySelector(".video__wrap");
    videoWrap.innerHTML ='<iframe width="560" height="315" src="https://www.youtube.com/embed/'
    +id+'?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen data-src="'+id+'"></iframe>';
  }

});
