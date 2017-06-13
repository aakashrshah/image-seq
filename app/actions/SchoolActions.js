var dispatcher = require("../dispatcher");

module.exports = {
    addChoice:function(workerID,assignmentID,hitID,index,choice){
        dispatcher.dispatch({
        	workerID: workerID,
        	assignmentID: assignmentID,
        	hitID: hitID,
        	index: index,
        	choice: choice,
        	type: "question:addChoice" 
        });
    },
}
