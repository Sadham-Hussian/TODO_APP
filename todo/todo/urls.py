from django.conf.urls import url
from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import include
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('app.urls')),
]
