from django.contrib import admin

from .models import Perfil, TipoUser, FollowersRelation

admin.site.register(Perfil)
admin.site.register(TipoUser)
admin.site.register(FollowersRelation)
