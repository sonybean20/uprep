from django.contrib import admin
from .models import *

class TodoAdmin(admin.ModelAdmin):
  list_display = ('title', 'description', 'completed')

class CategoryAdmin(admin.ModelAdmin):
  list_display = ('id', 'name', 'description')

class PostAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'created_at', 'modified_at', 'view_count', 'category')

# Register your models here.
admin.site.register(Todo, TodoAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Post, PostAdmin)