var React = require("react");
var actions = require("../actions/SchoolActions");
var {Line} = require("rc-progress");
//var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');
//  var Slider = require('react-slick');
import Slider from 'react-slick';

var totalQuestion = 5;
var testQuestions = 6;
var submitLink = "https://workersandbox.mturk.com/mturk/externalSubmit";
var consentFormSubmitLink = "https://";
var sanityCodePhrase = '5456';

class SchoolsList extends React.Component {

    onImageClick(choice,answer) {
      var delayMillis = 1000;
      var successAlert = document.getElementById('myAlertCorrect');
      var dangerAlert = document.getElementById('myAlertIncorrect');
      
      var index = this.props.route.question.id;
      console.log(index);
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
          }

        else{
            return(
                <div className="row" key={this.props.route.question.id}>
                    <center>
                        <form name="mturk_form" method="post" id="mturk_form" action={submitLink} onSubmit={alert('Write down this survey code and enter it into the Survey Code box when you return to Turk : ' + sanityCodePhrase)} >

                          <input type="hidden" name="assignmentId" value={this.props.location.query.assignmentId}/>                             
                          
                          <input type="hidden" name="aakash" value="isIndeedCool"/>
                          
                          <br/>
                          <input type="submit" value="Submit Your Answers"  className="btn btn-success"/>
                        </form>
                       <br/>
                       <h2> Thank You for participating. </h2>
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
          
          if(this.props.route.question.id < testQuestions){

              return(
                <div className="row" key={this.props.route.question.id}>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Preview Mode : {this.props.route.question.image1.name}
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
                              Preview Mode : {this.props.route.question.image2.name}
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
                        <Line percent={this.props.route.question.id * (100/testQuestions)} strokeWidth="2" strokeColor="#D3D3D3" />
                    </div>
                 </div>
              );

          }else{
              return(
                  <div className="row" key={this.props.route.question.id}>
                    <center>
                        <form name="mturk_form" method="post" id="mturk_form" action={consentFormSubmitLink}>

                          <input type="hidden" name="assignmentId" value={this.props.location.query.assignmentId}/>                             
                          
                          <input type="hidden" name="aakash" value="isIndeedCool"/>

                          <div className="col-md-12">
                          <p><strong>Ethics Consent</strong><br/>This is to clarify that... 
                              Please press Yes if you agree to the above mentioned terms and conditions.
                          </p>

                          </div>
                          <br/>
                          <div className="col-md-6">
                          <input type="submit" value="Yes"  className="btn btn-success"/>
                          </div>

                          <div className="col-md-6">
                          <input type="submit" value="No"  className="btn btn-danger"/>
                          </div>
                        </form>
                       <br/>
                       <br/>
                       <h4 style={{marginTop: 90 + 'px'}}> Please Click on the <span className="label label-warning">Accept Hit</span> button on the top, to start the experiment. </h4>
                       <br/>
                    </center>
                </div>
              );
          }
      }
    }
}

module.exports = SchoolsList;