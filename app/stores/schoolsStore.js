var dispatcher = require("../dispatcher");

function SchoolStore() {
    var listeners = [];
    var path = "./images/";
    var ext = ".png";

    var image1name = 1234567;
    var image2name = 891011;

    var image1src = path + image1name + ext;
    var image2src = path + image2name + ext;

    var id = 1;

    var question = {
        id : id,
        image1:{ 
            name: "Image-1",
            src:  image1src 
        },
        image2:{
            name: "Image-2", 
            src:  image2src
        },
        answer: image1name > image2name ? "false":"true",
        choice: "",
        workerID : ""
    }

    var submitted = [];

    function getQuestion() {
        return question;
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    function addSchool(userInput) {
        question["choice"] = userInput;
        submitted.push(question);
        console.log(question);

        if(question["choice"] == question["answer"]){
            changeQuestion(true);
        }else{
            changeQuestion(false);
        }

        triggerListeners();
    }

    function changeQuestion(result){
        id = id + 1;
        image1name = computeImage(result,id,"left");
        image2name = computeImage(result,id,"right");
    }

    function computeImage(result,id,position){
        console.log(result + " | " + id + " | " + position);
        if(position == "left"){
            return "15611";
        }
        else{
            return "16511";
        }
    }

    function triggerListeners() {
        listeners.forEach(function (listener) {
            listener(question);
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "school") {
            switch (split[1]) {
                case "addSchool":
                    addSchool(payload.school);
                    break;
                case "deleteSchool":
                    deleteSchool(payload.school);
                    break;
            }
        }
    });

    return {
        getQuestion: getQuestion,
        onChange: onChange
    }
}

module.exports = SchoolStore();