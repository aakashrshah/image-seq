/* 
 *@author   Aakash Shah (aakashrshah.github.io)
 *@version  1.1
 *@since    node v4.2.6, npm v3.5.2
 *@github   https://github.com/aakashrshah/image-seq
 */

var dispatcher = require("../dispatcher");

var submitted = []

//Quest Variables
var QuestStruct = {
    updatePdf : 1, 
    warnPdf : 1,
    normalizePdf : 1,
    tGuess : 2,
    tGuessSd : 1,
    pThreshold : 0.82,
    beta : 3.5,
    delta : 0.01,
    gamma : 0.5,
    grain : 0.25,
    dim : 500
}

var maxSize = 11
var standardSize = 8
var standardMaxDifference = maxSize - standardSize
var standard_size = 8.0;
var decimalPos = 100.00;
var standardSize = standard_size * decimalPos
var standardViewNumber = 2;
var standardImageIntensity = "00";
var intensity = "01";
var totalTrials = 40;
var upperTV = standardMaxDifference + 0.10
var lowerTV = 0.09;
var totalViews = 3;
var nearestTenth = 0.10;
var thresholdValue = 1; //Mean of difference (Threshold Value)
var selector = Math.floor((Math.random() * 10)) % 2;

function SchoolStore() {
    var listeners = [];
    var path = "./images/";
    var viewLeft = "2/"
    var viewRight = "2/"
    var ext = ".png";
    var image1name = "800_2_00";
    var image2name = "500_2_00";

    var image1src = path + viewLeft + image1name + ext;
    var image2src = path + viewRight + image2name + ext;

    var id = 0;

    var question = {
        question: {
            id : id,
            image1:{
                name: "Image-1",
                src:  image1src
            },
            image2:{
                name: "Image-2",
                src:  image2src
            },
            answer: "left",
            choice: "",
            result: "",
            workerID : "",
            assignmentID : "",
            hitID : ""
        },
        activeIndex: ""
    }

    function getQuestion() {
        return question;
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    function changeQuestion(q,result,index){
        // console.log(result + " | " + index);
        var t = Quest(q,result,"");
        return t;
    }

    function practiceQuestion(q,index){
        // console.log(result + " | " + index);
        var t = Quest(q,true,"practice");
        return t;
    }

    function addQuestion(q){
        submitted.push(q);
    }

    function addChoice(workerID,assignmentID,hitID,index,choice) {
        question.question.id = index+1;
        question.question.choice = choice;
        question.question.workerID = workerID;
        question.question.assignmentID = assignmentID;
        question.question.hitID = hitID;
        question.question.result = question.question.choice == question.question.answer ? true:false
        if(assignmentID != "ASSIGNMENT_ID_NOT_AVAILABLE"){

            //Submit User's Answer to the Stack
            var q = JSON.parse(JSON.stringify(question.question));
            addQuestion(q);
            //console.log(submitted);

            if(submitted.length >= totalTrials && workerID != null){
                console.log("Test Finished");
                // CHANGE THIS TO YOUR BUCKET NAME
                var uploadPath = 'https://jsonuserdata1.s3.amazonaws.com/' + workerID + ".json";
                //console.log(uploadPath);
                var xhr = new XMLHttpRequest();
                if ("withCredentials" in xhr) {
                    // Check if the XMLHttpRequest object has a "withCredentials" property.
                    // "withCredentials" only exists on XMLHTTPRequest2 objects.
                    xhr.open('PUT', uploadPath, true);

                  } else if (typeof XDomainRequest != "undefined") {
                    // Otherwise, check if XDomainRequest.
                    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                    xhr = new XDomainRequest();
                    xhr.open('PUT', uploadPath);
                  } else {
                    // Otherwise, CORS is not supported by the browser.
                    xhr = null;
                  }
         
                xhr.setRequestHeader(
                    'Access-Control-Allow-Origin', 'http://brain-nav.com');

                xhr.onload = function() {
                var responseText = xhr.responseText;
                 console.log(responseText);
                 // process the response.
                };

                xhr.onerror = function() {
                  console.log('There was an error!');
                };

                xhr.send(JSON.stringify(submitted));

                       
                triggerListeners();

            }else{
                //Update Question
                //console.log(question.question.choice)
                //console.log(question.question.answer)
                var answer = question.question.answer;
                var result = question.question.choice == question.question.answer ? true:false
                // console.log(result);
                var images = changeQuestion(q,result,index);
                // console.log(images)
                var image1src = path + images[3] + images[0] + ext;
                var image2src = path + images[4] + images[1] + ext;

                question.question.image1 = {
                    name: "Image-1",
                    src:  image1src
                };

                question.question.image2 = {
                    name: "Image-2",
                    src:  image2src
                };

                question.question.choice = ""
                question.question.workerID = "";
                question.question.assignmentID = "";
                question.question.hitID = "";
                question.question.answer = images[2];
                question.activeIndex = "";
                triggerListeners();   
            }

        }else{
                //Practice Questions
                var images = practiceQuestion(q,index);

                var image1src = path + images[3] + images[0] + ext;
                var image2src = path + images[4] + images[1] + ext;

                question.question.image1 = {
                    name: "Image-1",
                    src:  image1src
                };

                question.question.image2 = {
                    name: "Image-2",
                    src:  image2src
                };

                question.question.choice = ""
                question.question.workerID = "";
                question.question.assignmentID = "";
                question.question.hitID = "";
                question.question.answer = images[2];
                question.activeIndex = "";
                triggerListeners();   
        }
    }

    function triggerListeners() {
        listeners.forEach(function (listener) {
            listener(question);
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "question") {
            switch (split[1]) {
                case "addChoice":
                    console.log(payload.workerID,payload.assignmentID,payload.hitID,payload.index,payload.choice);
                  addChoice(payload.workerID,payload.assignmentID,payload.hitID,payload.index,payload.choice);
                  break;
                default:
                  break;
            }
        }
    });

    return {
        getQuestion: getQuestion,
        onChange: onChange
    }
}


function Quest(q,result,test){
    if(test == "practice"){
        var imageSizeArray = [500,1100];
        var viewNumber = 2;
        var imageSize = 500;
        if(selector == 0){
            imageSize = imageSizeArray[selector+1];
            selector = 1;
        }else{
            imageSize = imageSizeArray[selector-1];
            selector = 0;
        }
        var imageName = generateImageName(viewNumber,imageSize);
        var standardImageName = generateStandardImageName();
        return generateImages(imageName,standardImageName,viewNumber,imageSize,standardMaxDifference);
    }else{
        return Demo(q,result);
    }

    function getThreshold(x,result){
        var y = x;
        if(result){
            // while(x >= thresholdValue){
            //     x = parseFloat((Math.random() * (2.10 - 0.10) + 0.10).toFixed(2)) 
            // }
            y = parseFloat((Math.random() * (x - lowerTV) + lowerTV).toFixed(2))
        }else{
            // while(x <= thresholdValue){
            //     x = parseFloat((Math.random() * (2.10 - 0.10) + 0.10).toFixed(2)) 
            // }
            y = parseFloat((Math.random() * (upperTV - x) + x).toFixed(2))
        }

        //Round to nearest tenth.
        var round1place = Math.floor(y*10)/10;
        var pivot = round1place + 0.05;
        if(y>=pivot){
            round1place = round1place + nearestTenth;
        }

        round1place = parseFloat(round1place.toFixed(2))
        return round1place;
    }

    function Demo(q,result){
        //Value between 0 and 2
        var x = thresholdValue;
        // console.log("Previous TV : " + thresholdValue + "\n");

        thresholdValue = getThreshold(x,result); 

        //Check the ranges of the Threshold Values
        if(thresholdValue >= standardMaxDifference){
            thresholdValue = standardMaxDifference;
        }

        if(thresholdValue <= 0){
            thresholdValue = 0.10;
        }

        //console.log(q.id + " Trial was " + result + ". Next Trial TV : " + thresholdValue)

        //Random Sign Generator
        var sign =   ""
        var minusiszeroplusisone = Math.floor((Math.random() * 10)) % 2;
        if(minusiszeroplusisone == 0){
            var sign = "-";
        }else{
            var sign = "+"
        }  

        //Add/Subtract to standard_size
        var imageSize = standard_size;
        if(sign != ""){
            if(sign == "+"){
                imageSize = standard_size + thresholdValue;
            }else{
                imageSize = standard_size - thresholdValue;
            }
        }
        var rounded = parseFloat(imageSize.toFixed(2))* decimalPos;
        imageSize = parseFloat(rounded.toFixed(2))

        //Generate Random View
        var viewNumber = (Math.floor((Math.random() * 10)) % totalViews) + 1;
        
        var imageName = generateImageName(viewNumber,imageSize)
        var standardImageName = generateStandardImageName();

        //Insert image in array and determine left or right.
        return generateImages(imageName,standardImageName,viewNumber,imageSize,thresholdValue);
    }

    function generateImageName(viewNumber,imageSize){
        return imageSize + "_" + viewNumber + "_" + intensity;
    }

    function generateStandardImageName(){
        return standardSize + "_" + standardViewNumber + "_" + standardImageIntensity;
    }

    function generateImages(imageName,standardImageName,viewNumber,imageSize,thresholdValue){
        var images = [];
        var image1 = imageName;
        var image2 = standardImageName;

        var leftOrRight = Math.floor((Math.random() * 10)) % 2;

        if(leftOrRight == 0){
            images.push(image1);    //image[0]
            images.push(image2);    //image[1]
            images.push(imageSize > standardSize ? "left" : "right") //image[2]
            images.push("" + viewNumber + "/")    //image[3]
            images.push("" + standardViewNumber + "/")    //image[4]
        }else{
            images.push(image2);    //image[0]
            images.push(image1);    //image[1]
            images.push(imageSize > standardSize ? "right" : "left") //image[2]
            images.push("" + standardViewNumber + "/")    //image[3]
            images.push("" + viewNumber + "/")    //image[4]
        }
        images.push(thresholdValue) //images[5]

        return images
    }
    
}

module.exports = SchoolStore();
