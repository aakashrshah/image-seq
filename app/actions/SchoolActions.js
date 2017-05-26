var dispatcher = require("../dispatcher");

module.exports = {
    addChoice:function(index, choice){
        dispatcher.dispatch({
           index: index,
           choice: choice,
           type: "question:addChoice" 
        });
    },
}
