var express = require('express');    //Express Web Server 
var path = require('path');     //used for file path

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

/* ========================================================== 
Upload with multer
============================================================ */
var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/img');
  },
  filename: function (req, file, callback) {
    // callback(null, file.fieldname + '-' + Date.now());
    callback(null, "imagedata");
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.post('/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});

///////////////////////////////////
// PYTHON
///////////////////////////////////

app.post('/process', callName);
 
function callName(req, res) {
     
    var sys = require('util');

    var projectPath = __dirname;  // Users/yujin/Desktop/nodePytonWithNN
    var imagePath = __dirname + "/public/img/imagedata"; // Users/yujin/Desktop/nodePytonWithNN/public/img/image.png

    // console.log("projectPath: " + projectPath.toString());
    // console.log("Image Path: " + imagePath.toString());

    var spawn = require("child_process").spawn;
          
    var process = spawn('python',["./Python_NN/app_image_caption.py",
    // var process = spawn('python',["./Python_NN/test.py",
                                projectPath.toString(),
                                imagePath.toString()] );
 
    process.stdout.on('data', function(data) {
        console.log("\n\nResponse from python: " + data.toString());
        res.send(data.toString());

    })
    
}





