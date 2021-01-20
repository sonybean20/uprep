from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()

    def _str_(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=120)
    # user = models.ForeignKey(
    #     User,
    #     models.SET_NULL,
    #     blank=True,
    #     null=True
    # )

    # priority

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    view_count = models.IntegerField(default=0)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    content = models.TextField()


    def _str_(self):
        return self.title

