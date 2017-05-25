var React = require("react");
var actions = require("../actions/SchoolActions");

var ra = false;
//TODO : Can I read the answer outside the class. Alternative for this.props

module.exports = React.createClass({

    onImageClick: function (choice) {
      actions.addChoice(this.props.activeIndex, choice);
    },

    render:function(){
       console.log(this.props.question[this.props.activeIndex], this.props.activeIndex);
       return(
           <div className="row">
              <div className="col-md-6">
                  <div className="panel panel-default">
                      <div className="panel-heading">
                          {this.props.question[this.props.activeIndex].image1.name}
                      </div>
                      <div className="panel-body">
                          <input type="image" src={this.props.question[this.props.activeIndex].image1.src} className="img-responsive center-block" onClick={this.onImageClick.bind(this,"false")} />
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="panel panel-default">
                      <div className="panel-heading">
                          {this.props.question[this.props.activeIndex].image2.name}
                      </div>
                      <div className="panel-body">
                          <input type="image" src={this.props.question[this.props.activeIndex].image2.src} className="img-responsive center-block" onClick={this.onImageClick.bind(this,"true")} />
                      </div>
                  </div>
              </div>
           </div>
       )
    }
});
