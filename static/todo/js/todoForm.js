/**
 * Created by wangande on 17-3-7.
 * 任务发布组件
 */

var React = require("react");
var ReactDOM = require("react-dom");

var TodoForm = React.createClass({
    // 发布任务
    submitTask: function(e) {
        e.preventDefault();
        var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
        if (!task) {
          return;
        }
        this.props.submitTask(task);
        ReactDOM.findDOMNode(this.refs.task).value = "";
    },

    render: function() {
        return (
            <div>
                <hr />
                <form className="form-horizontal" onSubmit={this.submitTask}>
                    <div className="form-group">
                        <label htmlFor="task" className="col-md-1 control-label">任务</label>
                        <div className="col-md-8">
                            <input type="text" id="task" ref="task" className="form-control" placeholder="发布新任务"></input>
                        </div>
                        <div className="col-md-3 text-right">
                            <input type="submit" value="发布" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});

module.exports = TodoForm;