var React = require("react");

module.exports = React.createClass({
    render:function(){
        return(
        <div className="col-md-6">
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.info.image}
                </div>
                <div className="panel-body">
                    <a href="#"> <img src={this.props.info.src} className="img-responsive center-block"/> </a>
                </div>
                
            </div>
        </div>

        )
    }
})