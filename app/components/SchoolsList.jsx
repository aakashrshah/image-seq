var React = require("react");
var actions = require("../actions/SchoolActions");
var {Line} = require("rc-progress");
//var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');
//  var Slider = require('react-slick');
import Slider from 'react-slick';

var totalQuestion = 40;
var submitLink = "https://workersandbox.mturk.com/mturk/externalSubmit";

class SchoolsList extends React.Component {

    onImageClick(choice,answer) {
      var delayMillis = 1000;
      var successAlert = document.getElementById('myAlertCorrect');
      var dangerAlert = document.getElementById('myAlertIncorrect');
      
      var index = this.props.route.question.id;
      var workerID = this.props.location.query.workerId;
      var assignmentID = this.props.location.query.assignmentId
      var hitID = this.props.location.query.hitId;

      successAlert.style.display = 'none';
      dangerAlert.style.display = 'none';

      if(choice==answer){
        //Right Answer
          successAlert.style.display = 'block';
          
      }else if(choice != answer){
        //Wrong Answer
          dangerAlert.style.display = 'block';
      }

      setTimeout(function() {
          successAlert.style.display = 'none';
          dangerAlert.style.display = 'none';
          actions.addChoice(workerID,assignmentID,hitID,index,choice);
      }, delayMillis);
      
    }

    onPreviewImageClick(choice,answer) {
      var delayMillis = 2000;
      var successAlert = document.getElementById('myAlertCorrect');
      var dangerAlert = document.getElementById('myAlertIncorrect');
      
      var index = this.props.route.question.id;
      var workerID = this.props.location.query.workerId;
      var assignmentID = this.props.location.query.assignmentId
      var hitID = this.props.location.query.hitId;

      successAlert.style.display = 'none';
      dangerAlert.style.display = 'none';

      if(choice==answer){
        //Right Answer
          successAlert.style.display = 'block';
          
      }else if(choice != answer){
        //Wrong Answer
          dangerAlert.style.display = 'block';
      }

      setTimeout(function() {
          successAlert.style.display = 'none';
          dangerAlert.style.display = 'none';
      }, delayMillis);
      
    }

    render(){

      if(this.props.location.query.assignmentId != "ASSIGNMENT_ID_NOT_AVAILABLE"){

         if(this.props.route.question.id < totalQuestion){

          var settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1300,
            infinite:false,
            fade:true,
            pauseOnHover:false,

          };

          var settings1 = {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite:false,
            fade:true,
            pauseOnHover:false,
          };

         return(
              <div className="row" key={this.props.route.question.id}>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.props.route.question.image1.name}
                        </div>
                        <Slider {...settings}>

                          <div className="panel-body">
                              <input type="image" src={this.props.route.question.image1.src} className="img-responsive center-block" onClick={this.onImageClick.bind(this,"left")}/>
                          </div>

                          <div className="panel-body">
                              <input type="image" src="Background.jpg" className="img-responsive center-block" onClick={this.onImageClick.bind(this,"left")}/>
                          </div>

                          <div className="panel-body">
                              <input type="image" src="Background.jpg" className="img-responsive center-block" onClick={this.onImageClick.bind(this,"left")}/>
                          </div>

                          <div className="panel-body">
                              <input type="image" src="Background1.png" className="img-responsive center-block" onClick={this.onImageClick.bind(this,"left",this.props.route.question.answer)} />
                          </div>
                        </Slider>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.props.route.question.image2.name}
                        </div>
                        <Slider {...settings1}>
                          <div className="panel-body">
                              <input type="image" src="Background.jpg" className="img-responsive center-block" onClick={this.onImageClick.bind(this,"right")}/>
                          </div>
                          <div className="panel-body">
                              <input type="image" src={this.props.route.question.image2.src} className="img-responsive center-block" onClick={this.onImageClick.bind(this,"right")}/>
                          </div>
                          <div className="panel-body">
                              <input type="image" src="Background1.png" className="img-responsive center-block" onClick={this.onImageClick.bind(this,"right",this.props.route.question.answer)} />
                          </div>
                        </Slider>
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
                        <form name="mturk_form" method="post" id="mturk_form" action={submitLink}>

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
          var settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1300,
            infinite:false,
            fade:true,
            pauseOnHover:false

          };

          var settings1 = {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite:false,
            fade:true,
            pauseOnHover:false
          };

          console.log(settings)
          return(
            <div className="row">
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Preview Mode : {this.props.route.question.image1.name}
                        </div>
                        <Slider {...settings}>

                          <div className="panel-body">
                              <input type="image" src={this.props.route.question.image1.src} className="img-responsive center-block" onClick={this.onPreviewImageClick.bind(this,"left")}/>
                          </div>

                          <div className="panel-body">
                              <input type="image" src="Background.jpg" className="img-responsive center-block" onClick={this.onPreviewImageClick.bind(this,"left")}/>
                          </div>

                          <div className="panel-body">
                              <input type="image" src="Background.jpg" className="img-responsive center-block" onClick={this.onPreviewImageClick.bind(this,"left")}/>
                          </div>

                          <div className="panel-body">
                              <input type="image" src="Background1.png" className="img-responsive center-block" onClick={this.onPreviewImageClick.bind(this,"left",this.props.route.question.answer)} />
                          </div>
                        </Slider>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                          Preview Mode : {this.props.route.question.image2.name}
                        </div>
                        <Slider {...settings1}>
                          <div className="panel-body">
                              <input type="image" src="Background.jpg" className="img-responsive center-block" onClick={this.onPreviewImageClick.bind(this,"right")}/>
                          </div>
                          <div className="panel-body">
                              <input type="image" src={this.props.route.question.image2.src} className="img-responsive center-block" onClick={this.onPreviewImageClick.bind(this,"right")}/>
                          </div>
                          <div className="panel-body">
                              <input type="image" src="Background1.png" className="img-responsive center-block" onClick={this.onPreviewImageClick.bind(this,"right",this.props.route.question.answer)} />
                          </div>
                        </Slider>
                    </div>
                </div>
                <div>
                    <Line percent="0" strokeWidth="2" strokeColor="#D3D3D3" />
                </div>
             </div>
          );
      }
    }
}

module.exports = SchoolsList;