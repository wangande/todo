# -*- coding: utf-8 -*-

from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

eng = create_engine('sqlite:///./sqlalchemy.db', echo=False)  # 定义引擎
Base = declarative_base(eng)     # 绑定元信息


class TodoModel(Base):
    __tablename__ = "todo"

    id = Column(Integer, primary_key=True, autoincrement=True)
    task = Column(String(120))
    complete = Column(Boolean)

    def __init__(self, task):
        self.task = task
        self.complete = False

Base.metadata.drop_all(bind=eng)
Base.metadata.create_all(bind=eng)

Session = sessionmaker(bind=eng)
session = Session()

session.add_all([TodoModel(task=task)
                 for task in ("first task", )])

session.commit()
