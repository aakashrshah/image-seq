var React = require("react");
var actions = require("../actions/SchoolActions");
var {Line} = require("rc-progress");
var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var totalQuestion = 40;

module.exports = React.createClass({

    onImageClick: function (choice) {
      var index = this.props.route.question.id;
      var workerID = this.props.location.query.workerId;
      var assignmentID = this.props.location.query.assignmentId
      var hitID = this.props.location.query.hitId;
      actions.addChoice(workerID,assignmentID,hitID,index,choice);
    },

    render:function(){
    
      if(this.props.location.query.assignmentId != "ASSIGNMENT_ID_NOT_AVAILABLE"){

         if(this.props.route.question.id < totalQuestion){
         return(
              <div className="row">
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.props.route.question.image1.name}
                        </div>
                        <div className="panel-body">
                        <CSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionLeave={true}
        transitionEnterTimeout={600}
        transitionAppearTimeout={600}
        transitionLeaveTimeout={10000}>
                            <input type="image" src={this.props.route.question.image1.src} className="img-responsive center-block" onClick={this.onImageClick.bind(this,"left")} />
                          </CSSTransitionGroup>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.props.route.question.image2.name}
                        </div>
                        <div className="panel-body">
                        <CSSTransitionGroup
        transitionName="example2"
        transitionAppear={true}
        transitionAppearTimeout={5000}
        transitionEnter={false}
        transitionLeave={false}>
                            <input type="image" src={this.props.route.question.image2.src} className="img-responsive center-block" onClick={this.onImageClick.bind(this,"right")} />
                          </CSSTransitionGroup>
                        </div>
                    </div>
                </div>
                <div>
                    <Line percent={this.props.route.question.id * (100/totalQuestion)} strokeWidth="2" strokeColor="#D3D3D3" />
                </div>
             </div>
             );
         }else{

           return(
                <div className="row">
                    <center>
                        <form name="mturk_form" method="post" id="mturk_form" action="https://workersandbox.mturk.com/mturk/externalSubmit">

                          <input type="hidden" name="assignmentId" value={this.props.location.query.assignmentId}/>
                          
                          <input type="hidden" name="aakash" value="isIndeedCool"/>

                          <input type="submit" value="Submit Your Answers" onClick={event.preventDefault()} className="btn btn-success"/>
                        </form>
                       <br/>
                       <h2> Thank You. </h2>
                       <br/>
                    </center>
                </div>
                );
           }
             
         
      }
      else{
          return(
            <div className="row">
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Preview Mode : {this.props.route.question.image1.name}
                        </div>
                        <div className="panel-body">
                        <CSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionLeave={true}
        transitionEnterTimeout={600}
        transitionAppearTimeout={600}
        transitionLeaveTimeout={10000}>
                            <input type="image" src={this.props.route.question.image1.src} className="img-responsive center-block"/>
                          </CSSTransitionGroup>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                          Preview Mode : {this.props.route.question.image2.name}
                        </div>
                        <div className="panel-body">
                        <CSSTransitionGroup
        transitionName="example2"
        transitionAppear={true}
        transitionAppearTimeout={5000}
        transitionEnter={false}
        transitionLeave={false}>
                            <input type="image" src={this.props.route.question.image2.src} className="img-responsive center-block"/>
                          </CSSTransitionGroup>
                        </div>
                    </div>
                </div>
                <div>
                    <Line percent="0" strokeWidth="2" strokeColor="#D3D3D3" />
                </div>
             </div>
          );
      }
    }
});
