$(document).ready(function () {
    var translationDate = document.querySelector(".translation__link-current").dataset.date;
    var key = 'AIzaSyA3uzIV7gyrbnOKLyk3y_SXcIeZ3SoHUoQ';
    var playlistId = document.querySelector(".defaultOption").dataset.program;
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
    var message = 'Нет событий в указанную дату'

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#video').html(`
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }

    function resultsLoop(data) {
        $('#video').empty();
        $.each(data.items, function (i, item) {
            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;
            var timePublishedAt = item.snippet.publishedAt
            var timeString = timePublishedAt.split('T');
            var time = timeString[1].split(':');
            var utc = Number.parseInt(time[0])
            utc += 4;
            var datetime = (utc < 24)?utc+":"+time[1]:utc="0"+(utc-24)+":"+time[1];
            if(timeString[0] == translationDate){
              $('main').append(`
              <article class="translation__videoitem translation__videoitem-close" data-key="${vid}">
                <div class="translation__time">
                  <time datetime="${datetime}">${datetime}</time>
                  <div class="translation__format"> (UTC +4)</div>
                </div>
                <img src="${thumb}" alt="" class="thumb">
                <div class="translation__description">
                  <div class="translation__name">${title}</div>
                  <p class="translation__text">${desc}</p>
                </div>

              </article>
            `);
          }
          });
          var article = document.querySelectorAll(".translation__videoitem");
          if(article.length > 0){
          var id = article[0].dataset.key;
          mainVid(id)
        }
        else{
          console.log($('#video'))
          $('#video').html('<div class="emptyArticle">'+message+'</div>');
        }
    }

		// CLICK EVENT
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });
;
    var days = $(".translationDate");
    $(days).click(function(e){
      e.preventDefault()
        translationDate = this.dataset.date;
        $('main').empty();
        loadVids();
    })

    $("#translationSelect").on('click', 'option', function(){
      options.playlistId = $(this).data('program');
      $('main').empty();
      loadVids();
  });
});
