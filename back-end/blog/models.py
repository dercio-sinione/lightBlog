from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# from django.urls import reverse


class Post(models.Model):
    title = models.CharField(max_length=50, null=True)
    content = models.TextField()
    picture = models.ImageField(null=True, upload_to='PostImg')
    dateCreated = models.DateTimeField(default=timezone.now)
    dateUpdated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

    class Meta:
        ordering = ['-dateCreated']

    def __str__(self):
        return f'{self.title} - {self.user.username}'


class PostComentario(models.Model):
    content = models.TextField()
    dateCreated = models.DateTimeField(default=timezone.now)
    dateUpdated = models.DateTimeField(auto_now=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.content[:10]} - {self.dateCreated}'


class PostResposta(models.Model):
    content = models.TextField()
    dateCreated = models.DateTimeField(default=timezone.now)
    dateUpdated = models.DateTimeField(auto_now=True)
    comentario = models.ForeignKey(PostComentario, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.content[:10]} - {self.dateCreated}'
