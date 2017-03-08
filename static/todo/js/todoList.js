/**
 * Created by wangande on 17-3-7.
 * 任务列表组件
 */

var React = require("react");
var ReactDOM = require("react-dom");
var TodoItem = require("./todoItem");
var TodoFooter = require("./todoFooter");

var TodoList = React.createClass({
    render: function() {
        var taskList = this.props.data.map(function(listItem) {
            return (
                <TodoItem
                taskId={listItem.id}
                key={listItem.id}
                task={listItem.task}
                complete={listItem.complete}
                deleteTask={this.props.deleteTask}
                toggleComplete={this.props.toggleComplete} />
            )
        }, this);

        return (
            <ul className="list-group">
              {taskList}
              <TodoFooter todoCount={this.props.todoCount} todoCompleteCount={this.props.todoCompleteCount} />
            </ul>
        );
    }
});

module.exports = TodoList;