from .geralImports import relay, Field, String, ObjectType, User, FollowersRelation, Perfil, TipoUser

from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .filerTypes import TipoUserFilter, UserFilter
 

class UserType(DjangoObjectType):
    class Meta:
        model = User
        filterset_class = UserFilter 
        exclude = ('password',)
        interfaces = (relay.Node,)
    
    full_name = String()
    avatar_url = String()

    def resolve_full_name(self, info):
        return '%s %s' % (self.first_name, self.last_name)
    
    def resolve_avatar_url(self, info):
        return self.perfil.avatar.url


class TipoUserType(DjangoObjectType):
    class Meta:
        model = TipoUser
        filterset_class = TipoUserFilter 
        interfaces = (relay.Node,)


class FollowersType(DjangoObjectType):
    class Meta:
        model = FollowersRelation
        filter_fields = {
            'user': ['exact'],
            'perfil': ['exact'],
        }
        interfaces = (relay.Node,)


class PerfilType(DjangoObjectType):
    class Meta:
        model = Perfil
        filter_fields = {
            'sexo': ['exact', 'istartswith'],
            'localizacao': ['exact', 'istartswith']
        }
        # convert_choices_to_enum = False
        interfaces = (relay.Node,)


class Query(ObjectType):
    user = relay.Node.Field(UserType)
    all_users = DjangoFilterConnectionField(UserType)
    
    perfil = relay.Node.Field(PerfilType)
    all_perfil = DjangoFilterConnectionField(PerfilType)

    tipo_user = relay.Node.Field(TipoUserType)
    all_tipo_user = DjangoFilterConnectionField(TipoUserType)

    followers = relay.Node.Field(FollowersType)
    all_followers = DjangoFilterConnectionField(FollowersType)
