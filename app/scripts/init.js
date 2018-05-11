$( document ).ready(function(){
    $('.history__wrap, .smi__wrap').owlCarousel({
        items:2,
        loop:true,
        dots:false,
        nav:true,
        navText : ['<svg role="img" width="32" height="14" class="arrowleft"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrowleft"></use></svg>',
            '<svg role="img" width="32" height="14" class="arrowright"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrowleft"></use></svg>'],
        navElement: 'div'
    });

    $('.gallery__wrap').owlCarousel({
        item:4,
        dots:false,
        nav:true,
        autoheight: true,
        navText : ['<svg role="img" width="32" height="14" class="arrowleft"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrowleft"></use></svg>',
            '<svg role="img" width="32" height="14" class="arrowright"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrowleft"></use></svg>'],
        navElement: 'div'
    });

    $('.partners__carousel').owlCarousel({
        items:5,
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:1000,
        dots:false,
        nav:false,
        autoplayHoverPause:true
    });

    $('.js-autosave-form').sisyphus({timeout: 5});

    $('.map__list').customScroll({
        vertical:  true,
        horizontal: false
    });

    $('.about__ancors').simpleScrollFollow({
        limit_elem: '.about__left'
    });

    var menuIsOpen = false;
    var menuContent = $(".hidden__menu").html();
    var sectionTop = ($(".contacts__wrap").length > 0)?sectionTop = $(".contacts__wrap"):sectionTop = $(".section-top.inner-top");

    $(".header__gumburger").on("click", function(){
        if (menuIsOpen === false){
            sectionTop.hide();
            $(".header").wrap('<div class="topwrapper"></div>')
            $(".topwrapper").append(menuContent);
            menuIsOpen = true;
        }
        else{
          $(".topwrapper .section-top").remove();
          $(".header").unwrap();
          sectionTop.show();
          menuIsOpen = false;
        }
    })

    $(".detailnom__section").on("click", function(){
        $(this).toggleClass("openSection")
    })

    $(".gallery__item-link").magnificPopup({type:'image'});

    $("#iDOC").on("change", function(){
        var fileName = this.files[0].name;
        console.log(fileName)
        this.labels[0].innerHTML = fileName;
     })

    var complete = function() {
        $("#complete").slideDown();
        $("#complete").find("a").on("click", function(){
            var selectCountry = $(this).text();
            var data = $(this).attr('data-id');
            $("#country").val(selectCountry);
            $("#country").attr('data-id', data);
            $("#complete").slideUp();
        })
    }
    $(document).click(function(event){
        if (!$(event.target).closest(".input__wrapper-autocomplete").length){
            $("#complete").slideUp();
        }
    });
    var passwordIcon =  $(".form__password").find('svg');
    $(passwordIcon).click(function(){
      var password = $(this).parent(".form__password").find("input");

        if (password[0].type === "password"){
            $(this).children("use").attr("xlink:href", "#hide")
            password[0].type = "text";
        }
        else{
            $(this).children("use").attr("xlink:href", "#show")
            password[0].type = "password";
        }
    })

    $("#country").on("input", function(){
        var word = this.value.toLowerCase();
        var container = this.container = document.querySelector('.input__wrapper-autocomplete');
        var links = container.querySelectorAll('.select-city__link');
        complete();
        $(links).parent("li").removeClass("selected");
        var currentCountry;

        for (var i = 0; i < links.length; i++){
          for (var j = 0; j < links[i].innerHTML.length; j++){
            if (word.charAt(j) === links[i].innerHTML.toLowerCase().charAt(j))
            {
              currentCountry = links[i];
              console.log(word.charAt(j) + links[i].innerHTML.toLowerCase().charAt(j));
            }
            else{
              currentCountry = undefined
            }
              $(currentCountry).parent("li").addClass("selected")
          }

      }
        /*var key =  links[1].innerHTML.charAt(0);
        key += links[1].innerHTML.charAt(1);
        console.log(key);
        complete();*/
    });


})


document.addEventListener('DOMContentLoaded', function(){

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
               minutsLast = minuts.length - 1,
               html = document.getElementsByTagName('html'),
               lang = html[0].getAttribute('lang');

           if (lang === 'en') {

           if (day[0] === "0" && day[dayBeforelast] === "0" && day[dayLast] === "1") {
               document.getElementById('day').nextElementSibling.innerHTML = "day"
           }
           else {
               document.getElementById('day').nextElementSibling.innerHTML = "days"
           }
         }
         else if (day[dayBeforelast] === "1" && day[dayLast] === "1"){
           document.getElementById('day').nextElementSibling.innerHTML = "день"
         }
         else if((day[dayLast] === "2" && day[dayBeforelast] !== "1")|| (day[dayLast] === "3" && day[dayBeforelast] !== "1") || (day[dayLast] === "4" && day[dayBeforelast] !== "1")){
           document.getElementById('day').nextElementSibling.innerHTML = "дня"
         }
         else{
           document.getElementById('day').nextElementSibling.innerHTML = "дней"
         };

         if (lang === 'en') {
               if (hour[0] !== "0" && hour[hourLast] === "1") {
               document.getElementById('hour').nextElementSibling.innerHTML = "hour"
           }
           else {
               document.getElementById('hour').nextElementSibling.innerHTML = "hours"
           }
        }
         else if (hour[0] !== "1" && hour[hourLast] === "1"){
           document.getElementById('hour').nextElementSibling.innerHTML = "час"
         }
         else if((hour[hourLast] === "2" && hour[0] !== "1") ||(hour[hourLast] === "3" && hour[0] !== "1") || (hour[hourLast] === "4" && hour[0] !== "1")){
           document.getElementById('hour').nextElementSibling.innerHTML = "часа"
         }
         else{
           document.getElementById('hour').nextElementSibling.innerHTML = "часов"
         };

         if (lang === 'en') {
               if (minuts[0] === "0" && minuts[minutsLast] === "1") {
               document.getElementById('minuts').nextElementSibling.innerHTML = "minut"
           }
           else {
               document.getElementById('minuts').nextElementSibling.innerHTML = "minuts"
           }
        }
        else if(minuts[0] !== "1" && minuts[minutsLast] === "1"){
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
