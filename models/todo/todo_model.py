# -*- coding: utf-8 -*-

from ext import db


class TodoModel(db.Model):
    __tablename__ = "todo"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task = db.Column(db.String(120))
    complete = db.Column(db.Boolean)

    def __init__(self, task):
        self.task = task
        self.complete = False