from rest_framework import serializers
from app.models import Task

class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		fields = ('id','Title','Details','Create_date','Complete_date','Task_complete')
		