var dispatcher = require("../dispatcher");

var submitted = []

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
            answer: image1name > image2name ? "false":"true",
            choice: "",
            workerID : ""
        },
        activeIndex: 0
    }

    function getQuestion() {
        return question;
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    function changeQuestion(result,index){
        console.log(result + " | " + index);
        var image1 = "15611";
        var image2 = "16511";

        var images = [];
        images.push(image1);
        images.push(image2);
        return images
    }

    function addQuestion(q){
        submitted.push(q);
    }

    function addChoice(index, choice) {

        // console.log(index, choice);
        question.question.choice = choice;
        var q = JSON.parse(JSON.stringify(question.question));

        //Submit User's Answer to the Stack
        addQuestion(q);
        console.log(submitted);

        //Update Question
        //console.log(question.question.choice)
        //console.log(question.question.answer)
        var answer = question.question.answer;
        var result = question.question.choice == question.question.answer ? true:false
        // console.log(result);
        var images = changeQuestion(result,index);
        // console.log(images)
        var image1src = path + images[0] + ext;
        var image2src = path + images[1] + ext;

        question.question.image1 = {
            name: "Image-1",
            src:  image1src
        };

        question.question.image2 = {
            name: "Image-2",
            src:  image2src
        };
        question.question.choice = ""
        question.question.answer = images[0] > images[1] ? "false":"true",
        question.activeIndex = index + 1;
        triggerListeners();
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
                  addChoice(payload.index, payload.choice);
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

module.exports = SchoolStore();
