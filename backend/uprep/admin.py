from django.contrib import admin
from .models import *

class TodoAdmin(admin.ModelAdmin):
  list_display = ('title', 'description', 'completed')

class ArticleAdmin(admin.ModelAdmin):
  list_display = ('title', 'description')

# Register your models here.
admin.site.register(Todo, TodoAdmin)
admin.site.register(Article, ArticleAdmin)