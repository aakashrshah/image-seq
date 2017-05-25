var dispatcher = require("../dispatcher");

function SchoolStore() {
    var listeners = [];
    var path = "./images/";
    var ext = ".png";

    var image1name = 1234567;
    var image2name = 891011;
    var image3name = 12345;

    var image1src = path + image1name + ext;
    var image2src = path + image2name + ext;
    var image3src = path + image2name + ext;

    var id = 1;

    var question = {questions: [{
        id : id,
        image1:{
            name: "Image-1",
            src:  image1src
        },
        image2:{
            name: "Image-2",
            src:  image2src
        },
        answer: image1name > image2name ? false:true,
        choice: "",
        workerID : ""
    },
    {
        id : 2,
        image1:{
            name: "Image-2",
            src:  image2src
        },
        image2:{
            name: "Image-3",
            src:  image3src
        },
        answer: image1name > image2name ? false:true,
        choice: "",
        workerID : ""
    }],
    activeIndex: 0
  }

    function getQuestion() {
        return question;
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    function addChoice(index, choice) {
        // schools.push(school)
        // triggerListeners();
        console.log(index, choice);
        question.questions[index].choice = choice;
        question.activeIndex = index + 1;
        triggerListeners();
    }

    // function deleteSchool(school) {
    //     var _index;
    //     schools.map(function (s, index) {
    //         if (s.image === school.image) {
    //             _index = index;
    //         }
    //     });
    //     schools.splice(_index, 1);
    //     triggerListeners();
    // }

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
