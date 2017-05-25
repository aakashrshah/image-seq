var React = require("react");
var actions = require("../actions/SchoolActions");

module.exports = React.createClass({

    onImageClick: function (userInput) {
      actions.addSchool(userInput);
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
                          <input type="image" src={this.props.question.image1.src} className="img-responsive center-block" onClick={this.onImageClick.bind(this,"false")} />
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="panel panel-default">
                      <div className="panel-heading">
                          {this.props.question.image2.name}
                      </div>
                      <div className="panel-body">
                          <input type="image" src={this.props.question.image2.src} className="img-responsive center-block" onClick={this.onImageClick.bind(this,"true")} />
                      </div>
                  </div>
              </div>
              <div>
                  <ProgressBar bsStyle="success" now={40} />
              </div>
           </div>
       )
    } 
});

