/**
 * Created by wangande on 17-3-7.
 * 任务总数组件
 */

var React = require("react");
var ReactDOM = require("react-dom");

var TodoFooter = React.createClass({
    render: function() {
        return (
            <li className="list-group-item">{this.props.todoCompleteCount}已完成 / {this.props.todoCount}总数</li>
        )
    }
});

module.exports = TodoFooter;