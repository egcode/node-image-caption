

  
function getImageCaptionFromServer() {
    console.log("Zayebis");
    // Hide button
    $("#caption").hide();

    $.ajax('http://localhost:3030/process', {
        type: 'POST',
        data: "",
        contentType: 'application/json',
        success: function(data) { 
            console.log('aaa success');
            console.log(data);

            // var $message = jQuery('.messages');//getting text from textField
            // $message.append('<p><strong>' + 'name'  + ' ' + '</strong></p>');
            // $message.append('<p>' + 'text' + '</p>');//showing data
            var $message = jQuery('.messages');//getting text from textField
            $message.append('<p><strong>' + data + '</strong></p>');
            
        },
        error  : function(data) { 
            console.log('aaa error');
            console.log(data);

        }
    }); 

    
}
