# -*- coding: utf-8 -*-

import logging
#
# from flask import g
#
# from core.server import InitService
# from ext import db
#
#
# @InitService()
# class DbServer(object):
#
#     def __init__(self, app):
#         # db.init_app(app)
#         # BaseModel.configure(db)
#         # with app.app_context():
#         #     g.db = db
#         logging.error("[init] db init success")

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from consts import DB_URL
engine = create_engine(DB_URL, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()


def init_db():
    # 在这里导入所有的可能与定义模型有关的模块，这样他们才会合适地
    # 在 metadata 中注册。否则，您将不得不在第一次执行 init_db() 时
    # 先导入他们。
    Base.metadata.create_all(bind=engine)
    logging.error("[init] db init success")
