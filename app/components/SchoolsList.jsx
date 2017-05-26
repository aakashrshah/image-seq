var React = require("react");
var actions = require("../actions/SchoolActions");
var {Line} = require("rc-progress");

var totalQuestion = 40;

module.exports = React.createClass({

    onImageClick: function (choice) {
      actions.addChoice(this.props.activeIndex, choice);
    },

    render:function(){
       //console.log(this.props.question, this.props.activeIndex);
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
                  <Line percent={this.props.activeIndex * (100/totalQuestion)} strokeWidth="2" strokeColor="#D3D3D3" />
              </div>
           </div>
       )
    }
});
