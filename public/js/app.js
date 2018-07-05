 
function uiState(state) {
    if (state == ENUM_INITIAL_STATE) {
        $("#formDiv").show();
        $("#imageDiv").hide();
        $("#captionDiv").hide();
        $(".messages").hide();
        $("#refreshButtonDiv").hide();
    } else if (state == ENUM_PREPROCESS_STATE) {
        $("#formDiv").hide();
        $("#imageView").attr('src', '/img/imagedata');
        $("#imageDiv").show();
        $("#captionDiv").show();
        $(".messages").show();
        $("#refreshButtonDiv").hide();
    } else if (state == ENUM_COMPLETED_STATE) {
        uiState(ENUM_PREPROCESS_STATE);
        $("#refreshButtonDiv").show();
    }
  }
  
function getImageCaptionFromServer() {
    console.log("Zayebis");
    // Hide button
    $("#caption").hide();

    $.ajax('http://localhost:3030/process', {
        type: 'POST',
        data: "",
        contentType: 'application/json',
        success: function(caption) { 
            console.log('aaa success');
            console.log(caption);

            // var $message = jQuery('.messages');//getting text from textField
            // $message.append('<p><strong>' + 'name'  + ' ' + '</strong></p>');
            // $message.append('<p>' + 'text' + '</p>');//showing data
            var $message = jQuery('.messages');//getting text from textField
            $message.append('<p><strong>' + caption + '</strong></p>');
            uiState(ENUM_COMPLETED_STATE);

        },
        error  : function(data) { 
            console.log('aaa error');
            console.log(data);

        }
    }); 
}

function refreshClick() {
    location.reload(); // reload all
}
