$(function() {
  function buildHTML(message){
    // 条件式 ? 真の時の値 : 偽の時の値
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";

    var html = `<div class="chat__message" data-message-id="${message.id}" >
                  <div class="chat__message__info">
                    <p class="chat__message__user">
                      ${ message.user_name }
                    </p>
                    <p class="chat__message__data">
                      ${ message.created_at }
                    </p>
                  </div>
                  <div class="chat__message__text">
                    <p class="chat__message__content">
                      ${ content }
                    </p>
                  </div>
                  ${img}`
    return html;
  }


  $("#new_message").on("submit", function(e){  
    e.preventDefault();  
    var formData = new FormData(this);  
    var url = $(this).attr("action")  


    $.ajax({  
      url:  url,  
      type: "POST",  
      data: formData,  
      dataType: "json",  
      processData: false,  
      contentType: false  
    })  

    .done(function(messages){  
      var html = buildHTML(messages);  
      $('.chat__messages').val('');
      $('.chat__messages').append(html)
      $('.chat__messages').animate({scrollTop: $('.chat__messages')[0].scrollHeight}, 'fast'); 
      $("#new_message")[0].reset()  
      $('.form__submit').prop('disabled',false);
    })  
    .fail(function(){  
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })  
    return false;
  }) 




  var reloadMessages = function () {
    

    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      last_message_id = $('.chat__message:last').data("message-id");
      
      
      $.ajax({
        url:  'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id} 
      })
      .done(function(messages) {
        
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat__messages').append(insertHTML); 
        $('.chat__messages').animate({scrollTop: $('.chat__messages').height()})
      })
      .fail(function() {
        alert('更新に失敗しました');
      });
    };
  };
  setInterval(reloadMessages, 7000); 
});


