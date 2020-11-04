from django.db import models
from django.contrib.auth.models import User
from PIL import Image


class TipoUser(models.Model):
    nome = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(User,related_name='relatertipoUsers', null=True, blank=True, on_delete=models.SET_NULL)
    dateCreated = models.DateTimeField(auto_now_add=True)
    dateUpdated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.nome


class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    sexo = models.CharField(max_length=1, null=True, choices=(('M', 'Masculino'), ('F', 'Feminino')))
    tipoUser = models.ForeignKey(TipoUser, related_name='profiles', null=True, blank=True, on_delete=models.SET_NULL)
    avatar = models.ImageField(default='default.jpg', upload_to='avatar')
    localizacao = models.CharField(max_length=100, null=True, blank=True)
    bio = models.CharField(max_length=100, null=True, blank=True)
    # followers = models.ManyToManyField(User, related_name='ds', blank=True)
    dateCreated = models.DateTimeField(auto_now_add=True)
    dateUpdated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Perfil - {self.user.username}'
    
    class Meta:
        ordering = ['-id']

    @property
    def full_name(self):
        return '%s %s' % (self.user.first_name, self.user.last_name)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.avatar.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.avatar.path)


class FollowersRelation(models.Model):
    user = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    perfil = models.ForeignKey(Perfil, related_name='followers', on_delete=models.CASCADE)
    dateCreated = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']
        
    def __str__(self):
        return f'{self.user.username} to {self.perfil}'
