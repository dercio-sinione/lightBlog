from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from PIL import Image


class TipoAlbum(models.Model):
    nome = models.CharField(max_length=50, null=True)
    dateCreated = models.DateTimeField(auto_now_add=True)
    dateUpdated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome


class Star(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    album = models.ForeignKey('Album', on_delete=models.CASCADE)
    dateCreated = models.DateTimeField(auto_now_add=True)


class Album(models.Model):
    titulo = models.CharField(max_length=100, null=True)
    artista = models.CharField(max_length=50)
    tipoAlbum = models.ForeignKey(TipoAlbum, on_delete=models.CASCADE)
    capa = models.ImageField(default='defaultAlbum.jpg', upload_to='AlbumCapa')
    downloads = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    starts = models.ManyToManyField(User, related_name='albumStar', blank=True, through=Star)
    justOne = models.BooleanField(default=True)
    dateCreated = models.DateTimeField(default=timezone.now)
    dateUpdated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, related_name='albumUser', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.titulo} - {self.artista}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.capa.path)

        if img.height > 400 or img.width > 400:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.capa.path)


class Estilo(models.Model):
    nome = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    dateCreated = models.DateTimeField(auto_now_add=True)
    dateUpdated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome


class Music(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    estilo = models.ForeignKey(Estilo, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=50)
    ficheiro = models.FileField(upload_to='Music')
    downloads = models.IntegerField(default=0)
    dateCreated = models.DateTimeField(auto_now_add=True)
    dateUpdated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.titulo} - {self.estilo.nome}'


class AlbumComentario(models.Model):
    content = models.TextField()
    dateCreated = models.DateTimeField(default=timezone.now)
    dateUpdated = models.DateTimeField(null=True)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.content[:10]} - {self.date_posted}'


class AlbumResposta(models.Model):
    content = models.TextField()
    dateCreated = models.DateTimeField(default=timezone.now)
    dateUpdated = models.DateTimeField(null=True)
    comentario = models.ForeignKey(AlbumComentario, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.content[:10]} - {self.dateCreated}'
