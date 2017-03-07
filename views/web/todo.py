# -*- coding: utf-8 -*-

"""
todo相关请求接口，获取，新增，修改，删除
"""
from flask import request

from views.base import BaseView
from models.todo.todo_model import TodoModel
from server.tool.db import db_session

import simplejson


class ToDo(BaseView):
    """ToDO API"""
    def get(self):
        """获取所有todo"""
        rs = db_session.query(TodoModel).all()
        todo_list = []
        for r in rs:
            todo_list.append({"id": r.id, "task": r.task, "complete": r.complete})
        # print todo_list
        return simplejson.dumps({"status": "success", "data": todo_list})

    def post(self):
        """新增todo"""
        task = request.form.get("task", "default_task")
        print "task==", task
        todo = TodoModel(task)
        db_session.add(todo)
        db_session.commit()
        return simplejson.dumps({"status": "success"})

    def delete(self, todo_id):
        """删除todo"""
        todo = db_session.query(TodoModel).filter(TodoModel.id == todo_id).first()
        if todo:
            db_session.delete(todo)
            db_session.commit()
        return simplejson.dumps({"status": "success"})

    def put(self, todo_id):
        """修改todo"""

        todo = db_session.query(TodoModel).filter(TodoModel.id == todo_id).first()
        if todo:
            # todo = db_session.query(TodoModel).filter_by(id=todo_id).first()
            complete = False if todo.complete else True
            db_session.query(TodoModel).filter(TodoModel.id == todo_id).update({TodoModel.complete: complete})
            db_session.commit()
        return simplejson.dumps({"status": "success"})
