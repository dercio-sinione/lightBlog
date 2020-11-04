from django.contrib import admin
from .models import Post, PostComentario, PostResposta

admin.site.register(Post)
admin.site.register(PostComentario)
admin.site.register(PostResposta)