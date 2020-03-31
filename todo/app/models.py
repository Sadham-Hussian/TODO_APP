from django.db import models
from django.utils import timezone
from django.urls import reverse


class  Task(models.Model):
	Title = models.CharField(max_length=200)
	Details = models.TextField()
	Create_date = models.DateField()
	Complete_date = models.DateField()
	Task_complete = models.BooleanField(default=False)

	def __str__(self):
		return self.Title