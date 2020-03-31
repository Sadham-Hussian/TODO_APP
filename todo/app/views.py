from django.shortcuts import render
from app.models import Task
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from app.serializers import TaskSerializer

@api_view(['GET', 'POST'])
def about(request):
	if request.method == 'GET':
		return Response("This is the about page")



@api_view(['GET', 'POST'])
def todo_list(request):
	if request.method == 'GET':
		data = Task.objects.all()

		serializer = TaskSerializer(data, context={'request':request}, many = True)

		return Response(serializer.data)

	elif request.method == 'POST':
		serializer = TaskSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def edit_todo(request,pk):
	try:
		task = Task.objects.get(pk=pk)
	except Task.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		serializer = TaskSerializer(task)
		return Response(serializer.data)

	elif request.method == 'PUT':
		serializer = TaskSerializer(task, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		
	elif request.method == 'DELETE':
		task.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)