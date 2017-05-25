var React = require("react");
var ReactDOM = require("react-dom");
var SchoolsList = require("./components/SchoolsList.jsx");
var schoolsStore = require("./stores/schoolsStore");

var _question = schoolsStore.getQuestion();

schoolsStore.onChange(function(question){
    _question = question;
    render();
});

function render(){
    console.log(_question);
    ReactDOM.render(
        <SchoolsList  question={_question.questions} activeIndex={_question.activeIndex} />, document.getElementById("container"));
	}

render();