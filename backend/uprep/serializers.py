from rest_framework import serializers
from .models import *

class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = ('id', 'title', 'description', 'completed')

class ArticleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Article
    fields = ('id', 'title', 'description')