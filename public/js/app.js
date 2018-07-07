 
animSpeed = 100;

function uiState(state) {
    if (state == ENUM_INITIAL_STATE) {
        $("#formDiv").show(animSpeed);
        $("#imageDiv").hide(animSpeed);
        $("#captionDiv").hide(animSpeed);
        $(".messages").hide(animSpeed);
        $("#refreshButtonDiv").hide(animSpeed);
    } else if (state == ENUM_PREPROCESS_STATE) {
        $("#formDiv").hide(animSpeed);
        $("#imageView").attr('src', '/img/imagedata');
        $("#imageDiv").show(animSpeed);
        $("#captionDiv").show(animSpeed);
        // $(".messages").show(animSpeed);
        $("#refreshButtonDiv").hide(animSpeed);
    } else if (state == ENUM_COMPLETED_STATE) {
        uiState(ENUM_PREPROCESS_STATE);
        $("#refreshButtonDiv").show(animSpeed);
    }
  }

function uploadImage() {
    $('#uploadForm').submit(function() {

        var target = document.getElementById('topContainer');
        var spinner = new Spinner(opts).spin(target);

        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({

        error: function(xhr) {
            status('Error: ' + xhr.status);
            spinner.stop(target);
        },

        success: function(response) {
            $("#status").empty().text(response);
                console.log(response);
                console.log("ZAYEBIS UPLOADED");
                uiState(ENUM_PREPROCESS_STATE);
                spinner.stop(target);
        }
    });
        //Very important line, it disable the page refresh.
        return false;
    });    
}
  
function getImageCaptionFromServer() {
    console.log("Zayebis");
    // Hide button
    $("#caption").hide(animSpeed);

    var target = document.getElementById('imageDiv');
    var spinner = new Spinner(opts).spin(target);

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
            $message.append('<h1><strong>' + caption + '</strong></h1>');
            $(".messages").show(animSpeed);

            uiState(ENUM_COMPLETED_STATE);
            spinner.stop(target);

        },
        error  : function(data) { 
            uiState(ENUM_INITIAL_STATE);
            console.log('aaa error');
            console.log(data);
            spinner.stop(target);

        }
    }); 
}

function refreshClick() {
    location.reload(); // reload all
}
