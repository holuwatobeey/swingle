jQuery(document).ready(function($) {
  try {
    window.AudioContext    = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia 
                            || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL             = window.URL || window.webkitURL;
    
  }
  catch (e) {
    console.log('There is no support audio in this browser');
  }
  $(document).on('click',"#recordPostAudio",function(event) {
    audio_context          = new AudioContext;
    var _SELF = $(this);
    if (!localstream) {
      Wo_CreateUserMedia();
    }
    Wo_Delay(function(){
      if(localstream && recorder && _SELF.attr('data-record') == 0 && Wo_IsRecordingBufferClean()) {
        Wo_CleanRecordNodes();
        recording_time = $('#postRecordingTime');
        recording_node = "post";
        _SELF.attr('data-record','1').find('b').html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect></svg>');
        Wo_startRecording();
      }
      else if(localstream && recorder && _SELF.attr('data-record') == 1 && $("[data-record='1']").length == 1){
        Wo_stopRecording();
        _SELF.attr('data-record','2').find('b').html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>');    
      }
      else if(localstream && recorder && _SELF.attr('data-record') == 2){
        Wo_CleanRecordNodes();
        Wo_StopLocalStream();
        _SELF.attr('data-record','0').find('b').html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>');    
      }
      else{
        return false;
      }
    },500);
  });

  $(document).on('click',".record-comment-audio",function(event) {
    audio_context          = new AudioContext;
    var _SELF = $(this);
    if (!localstream) {
      Wo_CreateUserMedia();  
    }
    Wo_Delay(function(){
      if(recorder && _SELF.attr('data-record') == 0 && Wo_IsRecordingBufferClean()) {
        Wo_CleanRecordNodes();
        recording_time = $("span[data-comment-rtime='" + _SELF.attr('id') + "']");
        recording_node = "comm";
        comm_field     = _SELF.attr('id');
        _SELF.attr('data-record','1').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M12,22A10,10,0,1,1,22,12,10.01146,10.01146,0,0,1,12,22Z" opacity=".5" fill="currentColor"></path><path d="M15,16H9a.99974.99974,0,0,1-1-1V9A.99974.99974,0,0,1,9,8h6a.99974.99974,0,0,1,1,1v6A.99974.99974,0,0,1,15,16Z" fill="currentColor"></path></svg>');  
        Wo_startRecording();
      }

      else if(recorder && _SELF.attr('data-record') == 1 && $("[data-record='1']").length == 1){
       Wo_stopRecording();
       _SELF.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M13.41406,12l3.293-3.293A.99989.99989,0,0,0,15.293,7.293L12,10.58594,8.707,7.293A.99989.99989,0,0,0,7.293,8.707L10.58594,12,7.293,15.293A.99989.99989,0,0,0,8.707,16.707L12,13.41406l3.293,3.293A.99989.99989,0,0,0,16.707,15.293Z" fill="currentColor"></path><path opacity=".5" d="M19.0708,4.9292A9.99962,9.99962,0,1,0,4.9292,19.0708,9.99962,9.99962,0,1,0,19.0708,4.9292ZM16.707,15.293A.99989.99989,0,1,1,15.293,16.707L12,13.41406,8.707,16.707A.99989.99989,0,0,1,7.293,15.293L10.58594,12,7.293,8.707A.99989.99989,0,0,1,8.707,7.293L12,10.58594l3.293-3.293A.99989.99989,0,0,1,16.707,8.707L13.41406,12Z" fill="currentColor"></path></svg>').attr('data-record','2');     
      }

      else if(recorder && _SELF.attr('data-record') == 2){
       Wo_CleanRecordNodes();
       Wo_StopLocalStream();
       _SELF.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><rect width="8" height="14.1" x="8" y=".95" opacity=".5" fill="currentColor" rx="4"></rect><path fill="currentColor" d="M20,11a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8.007,8.007,0,0,0,7,7.93054V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93054A8.007,8.007,0,0,0,20,11Z"></path></svg>').attr('data-record','0');  
      }

      else{
        return false;
      }
    },500);
    
  });

  $(document).on('click',".record-chat-audio",function(event) {
    audio_context          = new AudioContext;
    var _SELF = $(this);
    if (!localstream) {
      Wo_CreateUserMedia(); 
    }
    Wo_Delay(function(){
      if(recorder && _SELF.attr('data-record') == 0 && Wo_IsRecordingBufferClean() && $("[data-record='1']").length == 0) {
        Wo_CleanRecordNodes();
        recording_time = $("span[data-chat-rtime='" + _SELF.attr('data-chat-tab') + "']");
        recording_node = "chat";
        chat_tab       = _SELF.attr('data-chat-tab');
        _SELF.attr('data-record','1').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><path d="M12,22A10,10,0,1,1,22,12,10.01146,10.01146,0,0,1,12,22Z" opacity=".5" fill="#f44336"></path><path d="M15,16H9a.99974.99974,0,0,1-1-1V9A.99974.99974,0,0,1,9,8h6a.99974.99974,0,0,1,1,1v6A.99974.99974,0,0,1,15,16Z" fill="#f44336"></path></svg>');  
        Wo_startRecording();
      }

      else if(recorder && _SELF.attr('data-record') == 1 && $("[data-record='1']").length == 1){
       Wo_stopRecording();
       _SELF.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><path d="M13.41406,12l3.293-3.293A.99989.99989,0,0,0,15.293,7.293L12,10.58594,8.707,7.293A.99989.99989,0,0,0,7.293,8.707L10.58594,12,7.293,15.293A.99989.99989,0,0,0,8.707,16.707L12,13.41406l3.293,3.293A.99989.99989,0,0,0,16.707,15.293Z" fill="#f44336"></path><path opacity=".5" d="M19.0708,4.9292A9.99962,9.99962,0,1,0,4.9292,19.0708,9.99962,9.99962,0,1,0,19.0708,4.9292ZM16.707,15.293A.99989.99989,0,1,1,15.293,16.707L12,13.41406,8.707,16.707A.99989.99989,0,0,1,7.293,15.293L10.58594,12,7.293,8.707A.99989.99989,0,0,1,8.707,7.293L12,10.58594l3.293-3.293A.99989.99989,0,0,1,16.707,8.707L13.41406,12Z" fill="#f44336"></path></svg>').attr('data-record','2');
      }

      else if(recorder && _SELF.attr('data-record') == 2){
       Wo_CleanRecordNodes();
       Wo_StopLocalStream();
       _SELF.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><rect width="8" height="14.1" x="8" y=".95" opacity=".5" fill="currentColor" rx="4"></rect><path fill="currentColor" d="M20,11a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8.007,8.007,0,0,0,7,7.93054V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93054A8.007,8.007,0,0,0,20,11Z"></path></svg>').attr('data-record','0');  
      }

      else{
        return false;
      }
    },500);
    
  });

  $(document).on('click',"#messages-record",function(event) {
    audio_context          = new AudioContext;
    var _SELF = $(this);
    if (!localstream) {
      Wo_CreateUserMedia(); 
    }
    Wo_Delay(function(){
      if(recorder && _SELF.attr('data-record') == 0 && Wo_IsRecordingBufferClean() && $("[data-record='1']").length == 0) {
        Wo_CleanRecordNodes();
        recording_time = $("span.messages-rtime");
        recording_node = "msg";
        _SELF.attr('data-record','1').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><path d="M12,22A10,10,0,1,1,22,12,10.01146,10.01146,0,0,1,12,22Z" opacity=".5" fill="#f44336"></path><path d="M15,16H9a.99974.99974,0,0,1-1-1V9A.99974.99974,0,0,1,9,8h6a.99974.99974,0,0,1,1,1v6A.99974.99974,0,0,1,15,16Z" fill="#f44336"></path></svg>');  
        Wo_startRecording();
      }

      else if(recorder && _SELF.attr('data-record') == 1 && $("[data-record='1']").length == 1){
       Wo_stopRecording();
       _SELF.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><path d="M13.41406,12l3.293-3.293A.99989.99989,0,0,0,15.293,7.293L12,10.58594,8.707,7.293A.99989.99989,0,0,0,7.293,8.707L10.58594,12,7.293,15.293A.99989.99989,0,0,0,8.707,16.707L12,13.41406l3.293,3.293A.99989.99989,0,0,0,16.707,15.293Z" fill="#f44336"></path><path opacity=".5" d="M19.0708,4.9292A9.99962,9.99962,0,1,0,4.9292,19.0708,9.99962,9.99962,0,1,0,19.0708,4.9292ZM16.707,15.293A.99989.99989,0,1,1,15.293,16.707L12,13.41406,8.707,16.707A.99989.99989,0,0,1,7.293,15.293L10.58594,12,7.293,8.707A.99989.99989,0,0,1,8.707,7.293L12,10.58594l3.293-3.293A.99989.99989,0,0,1,16.707,8.707L13.41406,12Z" fill="#f44336"></path></svg>').attr('data-record','2');     
      }

      else if(recorder && _SELF.attr('data-record') == 2){
       Wo_CleanRecordNodes();
       Wo_StopLocalStream();
       _SELF.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><rect width="8" height="14.1" x="8" y=".95" opacity=".5" fill="currentColor" rx="4"></rect><path fill="currentColor" d="M20,11a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8.007,8.007,0,0,0,7,7.93054V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93054A8.007,8.007,0,0,0,20,11Z"></path></svg>').attr('data-record','0').attr('data-record','0');  
      }

      else{
        return false;
      }
    },500);
    
  });
});

function Wo_IsRecordingBufferClean(){
  return $("[data-record='1']").length == 0; 
}

function Wo_CreateUserMedia(){
  navigator.getUserMedia({audio: true}, Wo_startUserMedia, function(e) {
    console.log('Could not get input or something went wrong: ' + e);
  }); 
}
function Wo_CleanRecordNodes(){
  $(".record-comment-audio").each(function(index, el) {
    $(el).html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><rect width="8" height="14.1" x="8" y=".95" opacity=".5" fill="currentColor" rx="4"></rect><path fill="currentColor" d="M20,11a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8.007,8.007,0,0,0,7,7.93054V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93054A8.007,8.007,0,0,0,20,11Z"></path></svg>').attr('data-record', '0');
    $('[data-comment-rtime="'+$(el).attr('id')+'"]').text('00:00').addClass('hidden');
  });

  $(".record-chat-audio").each(function(index, el) {
    $(el).html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><rect width="8" height="14.1" x="8" y=".95" opacity=".5" fill="currentColor" rx="4"></rect><path fill="currentColor" d="M20,11a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8.007,8.007,0,0,0,7,7.93054V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93054A8.007,8.007,0,0,0,20,11Z"></path></svg>').attr('data-record', '0');
    $('[data-chat-rtime="'+$(el).attr('data-chat-tab')+'"]').text('00:00').addClass('hidden');
  });

  recorder    &&         recorder.clear();
  recorder    && clearTimeout(wo_timeout);
  Wo_clearPRecording();
  Wo_clearMRecording();
}

function Wo_ClearTimeout(){
  clearTimeout(wo_timeout);
}
function Wo_ShowRecordingTime(self) {
  var time      = self.text();
  var seconds   = time.split(":");
  var date      = new Date();
  date.setHours(0);
  date.setMinutes(seconds[0]);
  date.setSeconds(seconds[1]);
  var __date    = new Date(date.valueOf() + 1000);
  var temp      = __date.toTimeString().split(" ");
  var timeST    = temp[0].split(":");
  if (timeST[1] >= 10) {
    Wo_ClearTimeout();
    Wo_stopRecording();
  }
  else{
    self.text(timeST[1]+":"+timeST[2]);
    wo_timeout    = setTimeout(Wo_ShowRecordingTime,1000,recording_time)  
  }

}
  var audio_context,recorder,recording_time,wo_timeout,localstream,recording_node,chat_tab,comm_field;
function Wo_startUserMedia(stream) {
  localstream   = stream;
  var input     = audio_context.createMediaStreamSource(stream);
  if (input) {
    recorder    = new Recorder(input,{bufferLen:16384});
  }
  else{
    console.log('Could not initialize media stream');
  }
}

function Wo_startRecording() {
  recorder     &&    recorder.record();
  recording_time.removeClass('hidden');
  recorder     && recorder.exportWAV(function(blob){});
  recorder     && setTimeout(Wo_ShowRecordingTime,1000,recording_time);
  //console.log('recording started');
}

function Wo_stopRecording() {
  recorder     &&          recorder.stop();
  wo_timeout   && clearTimeout(wo_timeout);
  //recorder     && console.log('recording sotopped');
}

function Wo_StopLocalStream(){
  localstream  && localstream.getTracks().forEach(function(track) { track.stop() });
  localstream    = false;
  recording_node = false;
  delete(recorder);
}

function Wo_clearPRecording(){
  recorder       &&                  recorder.clear();
  recording_time &&      recording_time.text('00:00');
  recorder       &&          clearTimeout(wo_timeout);
  recording_time && recording_time.addClass('hidden');
  $("#recordPostAudio").attr('data-record','0').find('b').html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>');
}

function Wo_clearMRecording(){
  recorder       &&                  recorder.clear();
  recording_time &&      recording_time.text('00:00');
  recorder       &&          clearTimeout(wo_timeout);
  recording_time && recording_time.addClass('hidden');
  $("#messages-record").html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><rect width="8" height="14.1" x="8" y=".95" opacity=".5" fill="currentColor" rx="4"></rect><path fill="currentColor" d="M20,11a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8.007,8.007,0,0,0,7,7.93054V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93054A8.007,8.007,0,0,0,20,11Z"></path></svg>').attr('data-record','0');
}

function Wo_GetPRecordLink() {
  var publisher_button = $('#publisher-button');
  publisher_button.attr('disabled', true);
  if (recorder && recording_node == "post") {
    recorder.exportWAV(function(blob) {
      if (blob instanceof Blob && blob.size > 50) {
        var fileName   = (new Date).toISOString().replace(/:|\./g, '-');
        var file       = new File([blob], 'wo-' + fileName + '.wav', {type: 'audio/wav'});
        var dataForm   = new FormData();
        dataForm.append('audio-filename', file.name);
        dataForm.append('audio-blob', file);
        Wo_RegisterPost(dataForm);
      }
      else{$('form.publisher-box').submit()}
    });
  }
  else{$('form.publisher-box').submit()}
}

function Wo_GetMRecordLink() {
  if (recorder && recording_node == "msg") {
    recorder.exportWAV(function(blob) {
      if (blob instanceof Blob && blob.size > 50) {
        var fileName   = (new Date).toISOString().replace(/:|\./g, '-');
        var file       = new File([blob], 'AU-' + fileName + '.wav', {type: 'audio/wav'});
        var dataForm   = new FormData();
        dataForm.append('audio-filename', file.name);
        dataForm.append('audio-blob', file);
        Wo_RegisterMessage(dataForm);
      }
      else{$('form.sendMessages').submit()}

    });
  }
  else{$('form.sendMessages').submit()}
}

function Wo_RegisterTabMessage(id,type = '') {

  if (!id) {
    return false;
  }

  if (type == 'page') {
    chat_tab = id;
  }
  
  if (recorder && recording_node == "chat" && id == chat_tab) {
    recorder.exportWAV(function(blob) {
      if (blob instanceof Blob && blob.size > 50) {
        var fileName   = (new Date).toISOString().replace(/:|\./g, '-');
        var file       = new File([blob], 'AU-' + fileName + '.wav', {type: 'audio/wav'});
        var dataForm   = new FormData();
        dataForm.append('audio-filename', file.name);
        dataForm.append('audio-blob', file);
        Wo_RegisterTabMessageRecord(dataForm,id,type);
      }
      else{
        if (type == 'page') {
          $('form.page-chat-sending-'+id).submit();
        }
        else{
          $('form.chat-sending-form-'+id).submit();
        }
      }

    });
  }
  else{
    if (type == 'page') {
      $('form.page-chat-sending-'+id).submit();
    }
    else{
      $('form.chat-sending-form-'+id).submit();
    }
  }
}

function Wo_RegisterTabMessageRecord(dataForm,id,type = ''){
  if (dataForm && id) {
    var form_class  = 'chat-sending-form-';
    if (type == 'page') {
      form_class  = 'page-chat-sending-';
    }
    //$('form.'+form_class+id).find('.ball-pulse').fadeIn(100);
    $.ajax({
        url: Wo_Ajax_Requests_File() + "?f=chat&s=register_message_record",
        type:       'POST',
        cache:       false,
        dataType:   'json',
        data:   dataForm,
        processData: false,
        contentType: false,
        xhr: function() {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = (evt.loaded / evt.total) * 100;
                }
           }, false);
           return xhr;
        }
    }).done(function(data) {
      if(data.status == 200){
        $('form.'+form_class+id).find('input.message-record').val('');   
        $('form.'+form_class+id).find('input.media-name').val('');
        //$('form.'+form_class+id).find('.ball-pulse').fadeOut(100);;
        Wo_stopRecording();
        Wo_CleanRecordNodes();
        Wo_StopLocalStream();
        $('form.'+form_class+id).find('input.message-record').val(data.url);
        $('form.'+form_class+id).find('input.media-name').val(data.name);
        $('form.'+form_class+id).submit();
      }
    });
  }
}

function Wo_RegisterPost(dataForm){
  if (dataForm) {
    $.ajax({
        url: Wo_Ajax_Requests_File() + "?f=posts&s=register_post_record",
        type:       'POST',
        cache:       false,
        dataType:   'json',
        data:   dataForm,
        processData: false,
        contentType: false,
    }).done(function(data) {
      if(data.status == 200){
        Wo_stopRecording();
        Wo_clearPRecording();
        Wo_StopLocalStream();
        $("#postRecord").val(data.url)
        $('form.publisher-box').submit()
      }
    });
  }
}

function Wo_RegisterMessage(dataForm){
  if (dataForm) {
    $.ajax({
        url: Wo_Ajax_Requests_File() + "?f=messages&s=upload_record",
        type:       'POST',
        cache:       false,
        dataType:   'json',
        data:   dataForm,
        processData: false,
        contentType: false,
    }).done(function(data) {
      if(data.status == 200){
        Wo_stopRecording();
        Wo_clearMRecording();
        Wo_StopLocalStream();
        $("#message-record-file").val(data.url);
        $("#message-record-name").val(data.name);
        $('form.sendMessages').submit();
      }
    });
  }
}

function Wo_RegisterComment(text, post_id, user_id, event, page_id, type) {
  if (!text) {
    text = $('[id=post-' + post_id + ']').find('.comment-textarea').val();
  }
  
  
  if(event.keyCode == 13 && event.shiftKey == 0 && recording_node == "comm") {
    Wo_stopRecording(); 
    if (recorder) { 
      recorder.exportWAV(function(blob){
        var comment_src_image = $('#post-' + post_id).find('#comment_src_image');
        var comment_image = '';
        if (comment_src_image.length > 0) {
          comment_image = comment_src_image.val();
        }       
        var dataForm = new FormData();                    
        dataForm.append('post_id',            post_id);
        dataForm.append('text',                  text);
        dataForm.append('user_id',            user_id);
        dataForm.append('page_id',            page_id);
        dataForm.append('comment_image',comment_image);
        if (blob.size > 50) {
          var fileName   = (new Date).toISOString().replace(/:|\./g, '-');
          var file       = new File([blob], 'wo-' + fileName + '.wav', {type: 'audio/wav'});
          dataForm.append('audio-filename', file.name);
          dataForm.append('audio-blob', file);
        }
        Wo_InsertComment(dataForm,post_id);
      });
    }

    else{
        var comment_src_image = $('#post-' + post_id).find('#comment_src_image');
        var comment_image = '';
        if (comment_src_image.length > 0) {
          comment_image = comment_src_image.val();
        }       
        var dataForm = new FormData();                    
        dataForm.append('post_id',            post_id);
        dataForm.append('text',                  text);
        dataForm.append('user_id',            user_id);
        dataForm.append('page_id',            page_id);
        dataForm.append('comment_image',comment_image);
        $('#charsLeft_'+post_id).text($('#charsLeft_'+post_id).attr('data_num')); 
        Wo_InsertComment(dataForm,post_id);
    }
  }
}

function Wo_RegisterComment2(post_id, user_id, page_id, type) {
  text = $('[id=post-' + post_id + ']').find('.comment-textarea').val();
  if(recording_node == "comm") {
    Wo_stopRecording(); 
    if (recorder) { 
      recorder.exportWAV(function(blob){
        var comment_src_image = $('#post-' + post_id).find('#comment_src_image');
        var comment_image = '';
        if (comment_src_image.length > 0) {
          comment_image = comment_src_image.val();
        }       
        var dataForm = new FormData();                    
        dataForm.append('post_id',            post_id);
        dataForm.append('text',                  text);
        dataForm.append('user_id',            user_id);
        dataForm.append('page_id',            page_id);
        dataForm.append('comment_image',comment_image);
        if (blob.size > 50) {
          var fileName   = (new Date).toISOString().replace(/:|\./g, '-');
          var file       = new File([blob], 'wo-' + fileName + '.wav', {type: 'audio/wav'});
          dataForm.append('audio-filename', file.name);
          dataForm.append('audio-blob', file);
        }
        Wo_InsertComment(dataForm,post_id);
      });
    }

    else{
        var comment_src_image = $('#post-' + post_id).find('#comment_src_image');
        var comment_image = '';
        if (comment_src_image.length > 0) {
          comment_image = comment_src_image.val();
        }       
        var dataForm = new FormData();                    
        dataForm.append('post_id',            post_id);
        dataForm.append('text',                  text);
        dataForm.append('user_id',            user_id);
        dataForm.append('page_id',            page_id);
        dataForm.append('comment_image',comment_image);
        $('#charsLeft_'+post_id).text($('#charsLeft_'+post_id).attr('data_num')); 
        Wo_InsertComment(dataForm,post_id);
    }
  }
}

function Wo_InsertComment(dataForm,post_id){
    if (!dataForm) { return false;}
    post_wrapper = $('[id=post-' + post_id + ']');
    comment_textarea = post_wrapper.find('.post-comments');
    comment_btn = comment_textarea.find('.emo-comment');
    textarea_wrapper = comment_textarea.find('.textarea');
    comment_list = post_wrapper.find('.comments-list');   
    //event.preventDefault();
    textarea_wrapper.val('').css("cssText", "height: 36px;");
	$('.wo_comment_combo_' + post_id).removeClass('comment-toggle');
	
    comment_textarea.find('.msg_progress').show();
    $.ajax({
        url: Wo_Ajax_Requests_File() + '?f=posts&s=register_comment&hash=' + $('.main_session').val(),
        type:       'POST',
        cache:       false,
        dataType:   'json',
        data:   dataForm,
        processData: false,
        contentType: false,
    }).done(function(data) {
      if(data.status == 200) {
        Wo_CleanRecordNodes();
        post_wrapper.find('.post-footer .comment-container:last-child').after(data.html);
        post_wrapper.find('.comments-list-lightbox .comment-container:first').before(data.html);
        post_wrapper.find('[id=comments]').html(data.comments_num);
        post_wrapper.find('.lightbox-no-comments').remove();
        Wo_StopLocalStream();
      }
      $('#post-'+ post_id).find('.comment-image-con').empty().addClass('hidden');
      $('#post-'+ post_id).find('#comment_src_image').val('');
      comment_textarea.find('.msg_progress').hide();
      if (data.can_send == 1) {
        Wo_SendMessages();
      }
    });
}