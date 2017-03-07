/**
 * Created by wangande on 17-3-7.
 */

var React = require("react");
var ReactDOM = require("react-dom");

var TodoItem = React.createClass({
    toggleComplete: function() {
        this.props.toggleComplete(this.props.taskId);
    },

    deleteTask: function() {
        this.props.deleteTask(this.props.taskId);
    },

    // 鼠标移入显示删除按钮
    handleMouseOver: function() {
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "inline";
    },
    
    handleMouseOut: function() {
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "none";
    },

    render: function() {
        var task = this.props.task;
        var classes = "list-group-item"
        var itemChecked;
        if (this.props.complete == true) {
            task = <s>{task}</s>
            itemChecked = true;
            classes += " list-group-item-success"
        } else {
            itemChecked = false;
        }

        return (
            <li className={classes}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}>
                <input type="checkbox" checked={itemChecked} onChange={this.toggleComplete} className="pull-left" />
                {task}
                <div className="pull-right">
                    <button type="button" className="btn btn-xs close" onClick={this.deleteTask} ref="deleteBtn">删除</button>
                </div>
            </li>
        );
    }
});

module.exports = TodoItem;