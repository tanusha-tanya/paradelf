$( document ).ready(function(){
  $('.history__wrap, .smi__wrap').owlCarousel({
        items:2,
        loop:true,
        dots:false,
        nav:true,
        navText : ['<svg role="img" width="32" height="14" class="arrowleft"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrowleft"></use></svg>','<svg role="img" width="32" height="14" class="arrowright"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrowleft"></use></svg>'],
        navElement: 'div'
    });
$('.gallery__wrap').owlCarousel({
      margin: 10,
      loop:true,
      dots:false,
      nav:true,
      autoheight: true,
      navText : ['<svg role="img" width="32" height="14" class="arrowleft"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrowleft"></use></svg>','<svg role="img" width="32" height="14" class="arrowright"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrowleft"></use></svg>'],
      navElement: 'div'
  });
$('.partners__carousel').owlCarousel({
      items:7,
      loop:true,
      margin:10,
      autoplay:true,
      autoplayTimeout:1000,
      dots:false,
      nav:false,
      autoplayHoverPause:true
  });

  $('form').sisyphus({timeout: 5});
    $('.map__list').customScroll({
      vertical:  true,
      horizontal: false
    });
    $('.about__ancors').simpleScrollFollow({
      limit_elem: '.about__left'
    });
})

//сделать драгндроп, айтемам позишн абсолют
document.addEventListener('DOMContentLoaded', function(){

/*
  var button = document.getElementsByClassName('header__button');
  var ismenuOpen = false;

  button.addEventListener("click", function(){
    if(ismenuOpen === false){
    document.body.className = ("menuopen");
      ismenuOpen = true;
    }
    else{
      document.body.className = ("");
      ismenuOpen = false;
    }
  };*/

  var slider = document.getElementById('slider'),
    left = document.getElementById('left'),
    right = document.getElementById('right'),
    sliderItem = slider.querySelectorAll('.slider__item'),
    amount = sliderItem.length,
    all = document.getElementById('all'),
    current,
    score,
    showed = 0;

    (amount < 10)?all.innerHTML =  "0"+amount:all.innerHTML = amount;

    var addscore = function(that){
    score = that+1;
    (score < 10)?current.innerHTML =  "0"+score:current.innerHTML = score;
  }
  var changeCounter = function(){
    for(var i = 0; i < amount; i++){
      current = document.getElementById('current');
      var that;
      if(sliderItem[i].classList.contains('current'))
      that = i;
    }
    addscore(that);
  };

changeCounter();

right.addEventListener("click", function() {
    var next = showed + 1;
    if(next < amount){
    sliderItem[next].classList.add("current");
    sliderItem[showed].classList.remove("current");
    showed += 1;
    changeCounter();
  }
  });
  left.addEventListener("click", function() {
    var prev = showed - 1;
    if(prev >= 0){
    sliderItem[prev].classList.add("current");
    sliderItem[showed].classList.remove("current");
    showed -= 1;
    changeCounter();
  }
});

/*var myDate = new XMLHttpRequest();
request.onreadystatechange = fanction(){
  if(request.readyState == 4 && request.status == 200){
    sTime = request.responseText
  }
}
request.open('GET', '/time.php');
request.send();*/

function setDate(){
var sTime = new Date();//поменять на время на сервере
var startDay = new Date(2018, 10, 11, 0, 0, 0, 0);
var remaining = startDay - sTime;
remaining /= 1000; // секунды до даты
remaining /= 60;    // минуты до даты
var floormin = Math.floor(remaining);
remaining /= 60;    // часы до даты
var floorhour = Math.floor(remaining);
remaining /= 24;
var floorDay = Math.floor(remaining);
var currentDay = floorDay;
(floorDay >= 10)?document.getElementById('day').innerHTML = floorDay:document.getElementById('hour').innerHTML = "0" + floorDay;

var currentHour = floorhour - floorDay * 24;
(currentHour >= 10)?document.getElementById('hour').innerHTML = currentHour:document.getElementById('hour').innerHTML = "0" + currentHour;

var currentmin = floormin - floorhour * 60;
(currentmin >= 10)?document.getElementById('minuts').innerHTML = currentmin :document.getElementById('minuts').innerHTML = "0" + currentmin;
setDateTitle();
}
var setDateTitle = function(){
var day = document.getElementById('day').innerHTML.toString().split(""),
    hour = document.getElementById('hour').innerHTML.toString().split(""),
    minuts = document.getElementById('minuts').innerHTML.toString().split(""),
    dayLast = day.length - 1,
    dayBeforelast = dayLast - 1,
    hourLast = hour.length - 1,
    minutsLast = minuts.length - 1;
    if (day[dayBeforelast] !== "1" && day[dayLast] === "1"){
      document.getElementById('day').nextElementSibling.innerHTML = "день"
    }
    else if((day[dayLast] === "2" && day[dayBeforelast] !== "1")|| (day[dayLast] === "3" && day[dayBeforelast] !== "1") || (day[dayLast] === "4" && day[0] !== "1")){
      document.getElementById('day').nextElementSibling.innerHTML = "дня"
    }
    else{
      document.getElementById('day').nextElementSibling.innerHTML = "дней"
    };

    if (hour[0] !== "1" && hour[hourLast] === "1"){
      document.getElementById('hour').nextElementSibling.innerHTML = "час"
    }
    else if((hour[hourLast] === "2" && hour[0] !== "1") ||(hour[hourLast] === "3" && hour[0] !== "1") || (hour[hourLast] === "4" && hour[0] !== "1")){
      document.getElementById('hour').nextElementSibling.innerHTML = "часа"
    }
    else{
      document.getElementById('hour').nextElementSibling.innerHTML = "часов"
    };

    if(minuts[0] !== "1" && minuts[minutsLast] === "1"){
      document.getElementById('minuts').nextElementSibling.innerHTML = "минутa"
    }
   else if((minuts[minutsLast] === "2" && minuts[0] !== "1") || (minuts[minutsLast] === "3" && minuts[0] !== "1") || (minuts[minutsLast] === "4" && minuts[0] !== "1")){
      document.getElementById('minuts').nextElementSibling.innerHTML = "минуты"
    }
    else{
      document.getElementById('minuts').nextElementSibling.innerHTML = "минут"
    };
  }


  setDate();

  window.setInterval(setDate, 60000);//Надо отдельно делать инкремент для счетчика, брать значение 1 раз

     });
     /*$(window).scroll(function(){
      ($(window).scrollTop() >= $(window).height())?$(".about__ancors").css(["position: fixed", "top: 100px"]):$(".about__ancors").css("position", "relative")
    console.log($(window).scrollTop())
  })*/
  ymaps.ready(init);
     var myMap;

     function init(){
         myMap = new ymaps.Map("map", {
             center: [56.840452, 53.243735],
             zoom: 10
         });
     }
