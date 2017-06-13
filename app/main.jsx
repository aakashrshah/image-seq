var React = require("react");
var ReactDOM = require("react-dom");
var SchoolsList = require("./components/SchoolsList.jsx");
var ThankYou = require("./components/ThankYou.jsx");
var schoolsStore = require("./stores/schoolsStore");
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link
var browserHistory = require('react-router').browserHistory;

var _question = schoolsStore.getQuestion();

schoolsStore.onChange(function(question){
    _question = question;
    render();
});

function render(){
	    ReactDOM.render(
		    <Router history={browserHistory}>
		    	<Route path="/" component={SchoolsList} question={_question.question}/>
		    </Router>,
	    
	    	document.getElementById("container")
	    );
}

render();
