/* 
 *@author   Aakash Shah (aakashrshah.github.io)
 *@version  1.1
 *@since    node v4.2.6, npm v3.5.2
 *@github   https://github.com/aakashrshah/image-seq
 */

var React = require("react");
var ReactDOM = require("react-dom");
var SchoolsList = require("./components/SchoolsList.jsx");
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
	    console.log(browserHistory);
	    ReactDOM.render(
		    <Router history={browserHistory}>
		    	<Route path="/" component={SchoolsList} question={_question.question}/>
		    </Router>,
	    
	    	document.getElementById("container")
	    );
}

render();
