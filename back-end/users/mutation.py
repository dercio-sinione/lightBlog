from graphql_jwt.decorators import permission_required, login_required
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene import ClientIDMutation
from .geralImports import (
    relay, 
    Mutation, 
    ObjectType,
    ID, 
    String, 
    Field,
    from_global_id,
    DsRelayFormMutation, 
    User, 
    FollowersRelation, 
    Perfil,
    TipoUser
)


from .query import PerfilType, UserType, FollowersType, TipoUserType
from .forms import UserForm, PerfilUpdateForm, FollowersRelationForm

####### Usuarios
class UserMutation(DsRelayFormMutation):
    """
    Creating and Updating Users.
    This method create and update the Users
    When id field is informed it update de related data object, otherwise a new user is created.
    """
    class Meta:
        form_class = UserForm

    user = Field(UserType)
    
    # @login_required
    def perform_mutate(form, info):
        user = form.save()
        return UserMutation(user=user)


class RemoveUser(relay.ClientIDMutation):
    class Input:
        id = ID(required=True)

    user = Field(UserType)

    @classmethod
    @permission_required('auth.delete_user')
    def mutate_and_get_payload(cls, root, info, id):
        user = User.objects.get(pk=from_global_id(id)[1])
        user.delete()
        return RemoveUser(user=user)  


####### Perfil 

class PerfilMutation(DsRelayFormMutation):
    """
    Creating and Updating Perfil.
    This method create and update the Perfil
    When id field is informed it update de related data object, otherwise a new user is created.
    """
    class Meta:
        form_class = PerfilUpdateForm

    perfil = Field(PerfilType)
    
    @login_required
    def perform_mutate(form, info):
        perfil = form.save()
        return PerfilMutation(perfil=perfil)

class UpdateAvatar(ClientIDMutation):
    class Input:
        # avatar = String(required=True)
        # id = ID(required=True)
        pass 
    
    # perfil = Field(PerfilType)
    success = String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        file = info.context.FILES
        print('')
        print('File:',file)
        print('')

        # perfil = Perfil.objects.get(pk=from_global_id(input.get('id'))[1])
        # perfil.avatar = file
        # perfil.save()
        # print(avatar.path)
        # self.avatar.path
        
        return UpdateAvatar(success=True)

   
####### FollowersRelation

class FollowersRelationMutation(DsRelayFormMutation):
    """
    Creating and Updating FollowersRelation.
    This method create and update the FollowersRelation
    When id field is informed it update de related data object, otherwise a new user is created.
    """
    class Meta:
        form_class = FollowersRelationForm

    folowersRelation = Field(PerfilType)

class RemoveFollowersRelation(relay.ClientIDMutation):
    class Input:
        id = ID(required=True)

    folowersRelation = Field(FollowersType)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, id):
        folowersRelation = FollowersRelation.objects.get(pk=from_global_id(id)[1])
        folowersRelation.delete()
        return RemoveFollowersRelation(folowersRelation=folowersRelation) 
  
####### Tipo de Usuarios

class TipoUserMotation(relay.ClientIDMutation):
    """
    Creating and Updating User Types.
    This method create and update the model TipoUser
    When id field is informed it update de related data object, otherwise a new user type is created.
    """
    
    class Input:
        id = ID()
        user = ID()
        nome = String(required=True)
    
    tipouser = Field(TipoUserType)

    @classmethod
    @permission_required('auth.add_tipouser')
    @permission_required('auth.change_tipouser')
    def mutate_and_get_payload(cls, root, info, nome,id=None, user=None):
        newUser = None
        if user is not None:
            newUser = User.objects.get(pk=from_global_id(user)[1])

        if id is None:
            tipouser = TipoUser(nome=nome, user=newUser)
        else:
            tipouser = TipoUser.objects.get(pk=from_global_id(id)[1])
            tipouser.nome = nome
            tipouser.user = newUser
            
        tipouser.save()

        return TipoUserMotation(tipouser=tipouser) 


class RemoveTipoUser(relay.ClientIDMutation):
    class Input:
        id = ID(required=True)

    tipouser = Field(TipoUserType)

    @classmethod
    @permission_required('auth.delete_tipouser')
    def mutate_and_get_payload(cls, root, info, id):
        tipouser = TipoUser.objects.get(pk=from_global_id(id)[1])
        tipouser.delete()
        return RemoveTipoUser(tipouser=tipouser) 
        

class Mutation(ObjectType):
    user = UserMutation.Field()
    perfil = PerfilMutation.Field()
    updateAvatar = UpdateAvatar.Field()
    remove_user = RemoveUser.Field()
    
    followers_relation = FollowersRelationMutation.Field()
    remove_followers_relation = RemoveFollowersRelation.Field()

    tipo_user = TipoUserMotation.Field()
    remove_tipo_user = RemoveTipoUser.Field()
    