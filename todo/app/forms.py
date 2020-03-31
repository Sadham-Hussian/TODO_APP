from django import forms
from app.models import Task

class TaskForm(forms.ModelForm):

	class Meta():
		fields = ('Title','Details','Complete_date','Task_complete')
		widgets = {
			'Title':forms.TextInput(),
			'Details':forms.Textarea(),
			'Complete_date':forms.DateField(input_formats=['%d/%m/%Y']),
			'Task_complete':forms.BooleanField()
		}