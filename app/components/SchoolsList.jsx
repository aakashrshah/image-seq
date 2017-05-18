var React = require("react");
var SchoolInfo = require("./SchoolInfo.jsx")

module.exports = React.createClass({
   render:function(){
       return(
           <div className="row">
                    {
                        this.props.schools.map(function(s,index){
                            return(
                                <SchoolInfo info={s} key={"school"+index} />
                            )         
                        })
                    }
           </div>
       )
   } 
});