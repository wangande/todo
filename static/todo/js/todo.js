/**
 * Created by wangande on 17-3-7.
 * todo组件
 */

var React = require("react");
var ReactDOM = require("react-dom");
var TodoList = require("./todoList");
var TodoForm = require("./todoForm");

var TodoBox = React.createClass({
    getInitialState: function() {
        return {
            data: [
            //   {"id": 1, "task":"读书", "complete": false},
            //   {"id": 2, "task":"看电影", "complete": false},
            //   {"id": 3, "task":"打游戏", "complete": false},
            ]
        };
    },

    // 根据id删除一项任务
    handleTaskDelete: function(taskId) {
        var self = this;
        $.ajax({
                url : "/todo/" + taskId,
                traditional : true,
                data : {},
                type : "DELETE",
                dataType : "json",
                success : function (resp) {;
                    // 删除成功，更新状态，这里不重新获取todoList，减少服务器请求
                    if(resp.status == "success"){
                        var data = self.state.data;
                        data = data.filter(function(task) {
                            return task.id !== taskId;
                        });
                        self.setState({data});
                    }
                },
                error : function() {
                    alert("服务器错误，请稍后重试");
                }
        });
    },
    // 切换一项任务的完成状态
    handleToggleComplete: function(taskId) {
        var self = this;
        $.ajax({
                url : "/todo/" + taskId,
                traditional : true,
                data : {},
                type : "PUT",
                dataType : "json",
                success : function (resp) {;
                    // 修改成功，更新状态，这里不重新获取todoList，减少服务器请求
                    if(resp.status == "success"){
                        var data = self.state.data;
                        for(var i in data) {
                            if (data[i].id === taskId) {
                              data[i].complete = data[i].complete == true ? false : true;
                              break;
                            }
                        }
                        self.setState({data});
                    }
                },
                error : function() {
                    alert("服务器错误，请稍后重试");
                }
        });
    },

    // 给新增的任务一个随机的id
    generateId: function() {
        return Math.floor(Math.random() * 9000) + 1000;
    },

    // 新增一项任务
    handleSubmit: function(task) {
        //var data = this.state.data;
        //var id = this.generateId();
        //var complete = "false";
        //data = data.concat([{"id": id, "task": task, "complete": false}]);
        //this.setState({data});
        var self = this;
        $.ajax({
                url : "/todo",
                traditional : true,
                data : {
                    "task": task
                },
                type : "POST",
                dataType : "json",
                success : function (resp) {
                    // 添加成功，重新获取todoList，因为ID为服务器生成，需重新拉取，也可以成功时返回，这个是重新拉取
                    if(resp.status == "success"){
                        self.getTaskList();
                    }
                },
                error : function() {
                    alert("服务器错误，请稍后重试");
                }
        });
    },
    // 获取任务列表
    getTaskList : function(){
        var self = this;
        $.ajax({
                url : "/todo",
                traditional : true,
                data : {},
                type : "GET",
                dataType : "json",
                success : function (resp) {;
                    if(resp.status == "success"){
                        var data = resp.data;
                        // console.log(data);
                        self.setState({data});
                    }
                },
                error : function() {
                    alert("服务器错误，请稍后重试");
                }
        });
    },
    componentDidMount : function(){
        this.getTaskList();
    },

    render: function() {
        var statistics = {
            // 统计任务总数及完成的数量
            todoCount: this.state.data.length || 0,
            todoCompleteCount: this.state.data.filter(function(item) {
              return item.complete == true;
            }).length
        };

        var formClass = {
            border: "solid 2px #dddddd"
        };

        return (
            <div className="well">
                <h1 className="text-center">React Todo</h1>
                <div style={formClass}>
                     <TodoForm submitTask={this.handleSubmit} />
                </div>
                <TodoList data={this.state.data}
                    deleteTask={this.handleTaskDelete}
                    toggleComplete={this.handleToggleComplete}
                    todoCount={statistics.todoCount}
                    todoCompleteCount={statistics.todoCompleteCount}
                />
            </div>
        )
    }
});

module.exports = TodoBox;