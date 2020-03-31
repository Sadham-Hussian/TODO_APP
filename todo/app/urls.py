from django.conf.urls import url
from django.contrib import admin
from . import views
from django.urls import path, re_path

urlpatterns = [
	re_path(r'^api/about/', views.about),
	re_path(r'^api/TODO/$', views.todo_list),
	re_path(r'^api/TODO/(?P<pk>[0-9]+)/',views.edit_todo),
]