from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Perfil, TipoUser, FollowersRelation

class UserForm(UserCreationForm):
    email = forms.EmailField()
    
    class Meta:
        model = User
        fields = ['username','email','password1','password2']

class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()
    
    class Meta:
        model = User
        fields = ['username','email'] 
        
class PerfilUpdateForm(forms.ModelForm):    
    class Meta:
        model = Perfil
        fields = ['sexo','tipoUser','localizacao','bio'] 

class TipoUserCreateForm(forms.ModelForm):
    class Meta:
        model = TipoUser
        fields = ('nome','user')

class FollowersRelationForm(forms.ModelForm):
    class Meta:
        model = FollowersRelation
        fields = ('user','perfil')