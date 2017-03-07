# -*- coding: utf-8 -*-

"""
首页
"""

from flask import render_template
from views.base import BaseView


class Index(BaseView):
    """index home"""

    def get(self):
        """重定向到首页"""
        return render_template('todo.html')
