/* 
 *@author   Aakash Shah (aakashrshah.github.io)
 *@version  1.1
 *@since    node v4.2.6, npm v3.5.2
 *@github   https://github.com/aakashrshah/image-seq
 */


var React = require("react");
var actions = require("../actions/SchoolActions");
var {Line} = require("rc-progress");
//var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');
//  var Slider = require('react-slick');
import Slider from 'react-slick';

var totalQuestion = 40;
var preslides = 2;
var testQuestions = preslides + 6;
var submitLink = "https://workersandbox.mturk.com/mturk/externalSubmit";
var consentFormSubmitLink = "https://";
var sanityCodePhrase = '5456';
var ethicsConsentForm = 'informedconsent.png'

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

      if(answer!="go"){
        if(choice==answer){
          //Right Answer
            successAlert.style.display = 'block';
            
        }else if(choice != answer){
          //Wrong Answer
            dangerAlert.style.display = 'block';
        }
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
          //left
          var settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1500,
            infinite:false,
            fade:true,
            pauseOnHover:false,

          };

          //right
          var settings1 = {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1600,
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

          var idd = this.props.route.question.id;
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
          if(idd == 0){
              return(
                  <div className="row" key={this.props.route.question.id} style={{textAlign: 'center'}}>
                          <div className="col-md-12" style={{display: 'inline-block',marginBottom: 20 + 'px'}}>
                              <img src={ethicsConsentForm} />
                          </div>

                          <div className="col-md-6">
                            <input type="submit" value="Yes"  className="btn btn-success" onClick={this.onImageClick.bind(this,"left")}/>
                          </div>

                          <div className="col-md-6">
                            <input type="submit" value="No"  className="btn btn-danger"/>
                          </div>
                          <br/><br/>

                   </div>
              );
          }
          else if(idd == 1){
              return(
                  <div className="row" key={this.props.route.question.id} style={{textAlign: 'center'}}>
                    <div className="col-md-12" style={{display: 'inline-block'}}>
                        <h3>Instructions</h3>

                        <br/>
                        <p>Instructions begin here...</p>
                        <br/>

                        <input type="submit" value="Let's start a few practice trials."  className="btn btn-success" onClick={this.onImageClick.bind(this,"left","go")} style={{marginBottom: 20 + 'px'}}/>
                    </div>
                    <br/><br/>
                   </div>
              );
          }
          else if(idd < testQuestions && idd > 1){

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

          }
          else{
              return(
                  <div className="row" key={this.props.route.question.id}>
                    <center>
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