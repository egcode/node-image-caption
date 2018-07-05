

  
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
            
        },
        error  : function(data) { 
            console.log('aaa error');
            console.log(data);

        }
    }); 

    
}
