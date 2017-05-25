var React = require("react");

var ra = false;
//TODO : Can I read the answer outside the class. Alternative for this.props



module.exports = React.createClass({
    getInitialState() {
        return { /* initial state */ };
    },

    submitAnswers() {
        console.log(this.props.question.answer);
    },

    render:function(){
       return(
           <div className="row">     
              <div className="col-md-6">
                  <div className="panel panel-default">
                      <div className="panel-heading">
                          {this.props.question.image1.name}
                      </div>
                      <div className="panel-body">
                          <input type="image" src={this.props.question.image1.src} className="img-responsive center-block" onClick={this.submitAnswers}/>
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="panel panel-default">
                      <div className="panel-heading">
                          {this.props.question.image2.name}
                      </div>
                      <div className="panel-body">
                          <input type="image" src={this.props.question.image2.src} className="img-responsive center-block" onClick={this.submitAnswers}/>
                      </div>
                  </div>
              </div>
           </div>
       )
    } 
});
