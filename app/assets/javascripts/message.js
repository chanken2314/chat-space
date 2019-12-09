// $(document).on('turbolinks:load', function() {
$(function() {
  function buildHTML(message){
     // 画像がアップされないときは<img src = "null">となり
    //  余計なサムネが表示されることを防ぐ
    image = (message.image) ? `<img class="lower-message__image" src="${ message.image }">`: "";

    var html = `<div class="chat__message" >
                  <div class="caht__message__info">
                    <p class="chat__message__user">
                      ${ message.user_name }
                    </p>
                    <p class="chat__message__data">
                      ${ message.created_at }
                    </p>
                  </div>
                  <div class="chat__message__text">
                    <p class="chat__message__content">
                      ${ message.content }
                    </p>
                  </div>
                  ${image}`
    return html;
  }
  

  
    // 1.フォームが送信されたら、イベントが発火するようにする
  $("#new-message").on("submit", function(e){  
    e.preventDefault();  
    var formData = new FormData(this);  
    var url = $(this).attr("action")  

    // 2.イベントが発火したときにAjaxを使用して、messages#createが動くようにする  
    // ajaxを使って、json形式でリクエストを送る。
    $.ajax({  
      url: location.href,  
      // 現在開いているページのURLを取得するという記述
      type: "POST",  
      data: { message: {id: message_id} },  
      dataType: "json",  
      processData: false,  
      contentType: false  
    })  

    .done(function(data){  
      var html = buildHTML(data);  
      $(".messages").append(html)  
      $(".lower-message__image").css('max-height','300px');  
      $(".lower-message__image").css('max-width','300px');  
      $('#new-message')[0].reset()  
      // メッセージを送信したとき、メッセージ画面を最下部にスクロールする
      $('.js-messages').animate({scrollTop: $('.js-messages')[0].scrollHeight});  
    })  
    .fail(function(){  
      alert("error");  
    })  
    .always(function() {  
      $('.form__submit').prop('disabled',false);  
    })  
  })  
});
