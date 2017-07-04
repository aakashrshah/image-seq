/* 
 *@author   Aakash Shah (aakashrshah.github.io)
 *@version  1.1
 *@since    node v4.2.6, npm v3.5.2
 *@github   https://github.com/aakashrshah/image-seq
 */


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
