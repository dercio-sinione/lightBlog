from django_filters import FilterSet, OrderingFilter

from .geralImports import User, FollowersRelation, Perfil, TipoUser


class UserFilter(FilterSet):
    class Meta:
        model = User
        # fields = '__all__'
        exclude = ('password',)
    
    filter_fields = {
            'username': ['exact', 'icontains', 'istartswith'],
            'email': ['exact', 'icontains', 'istartswith'],
            'perfil__sexo': ['exact'],
            'tipoUsers__nome': ['exact'],
        }

    order_by = OrderingFilter(
            fields = (
                # field and de argument
                ('id','id'),
                ('username','username'),
                ('first_name','fullName'),
                ('email', 'email'),
                ('perfil__sexo', 'sexo'),
                ('tipoUsers__nome', 'tipoUser'),
                ('date_joined', 'dateJoined'),
            )
        )

class TipoUserFilter(FilterSet):
    class Meta:
        model = TipoUser
        fields = '__all__'
    
    filter_fields = {
            'nome': ['exact', 'istartswith']
        }

    order_by = OrderingFilter(
            fields = (
                # field and de argument
                ('dateCreated','dateCreated'),
                ('id','id'),
                ('nome', 'name'),
            )
        )
