var express = require('express');    //Express Web Server 
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
// var fs = require('fs-extra');       //File System - for file manipulation

var app = express();
app.use(busboy());
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

// app.post('/listDir', function(req, res) {
//     console.log("bla nahuy");

//     const directory = './public/img/';

//     // List files in directory
//     fs.readdir(directory, (err, files) => {
//         files.forEach(file => {
//           console.log("\n\n");
//           console.log(file);      
//         });
//         // deleteFiles(directory);
//       })
//     // res.sendStatus(200);
//     return res.redirect('/imageView.html');
//   });
  

// function deleteFiles(directory) {
//     fs.readdir(directory, (err, files) => {
//         if (err) throw err;
//         for (const file of files) {
//             fs.unlink(path.join(directory, file), err => {
//             if (err) throw err;
//             });
//         }
//     });
// }

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
 
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        console.log("\n\nResponse from python: " + data.toString());

        // var retryButton = "<form action=\"/\" method=\"get\"><button>Retry</button></form>";
        // var comment = "<img src=\"/img/image.png\" width=\"500\"><div class=\"messages\">" + data.toString() + "</div>";
        // comment = comment + retryButton;
        // res.send(comment);

        res.send(data.toString());

    })
    
}





