from django_filters import FilterSet, OrderingFilter
from .models import Post


class PostFilter(FilterSet):
    class Meta:
        model = Post
        # fields = '__all__'
        exclude = ['picture']
    
    filter_fields = {
            'title': ['exact', 'icontains', 'istartswith'],
            'content': ['exact', 'icontains', 'istartswith'],
            'user': ['exact','icontains', 'istartswith'],
         }
    
    order_by = OrderingFilter(
        fields = (
            # field and de argument
            ('id','id'),
            ('title','title'),
            ('content','content'),
            # ('user__username', 'user'),
            ('dateCreated', 'dateCreated'),
        )
    )



# from .geralImports import User, FollowersRelation, Perfil, TipoUser

# class PostFilter(FilterSet):
#     class Meta:
#         model = Post
#         fields = '__all__'
    
#     filter_fields = {
#             'title': ['exact', 'icontains', 'istartswith'],
#             'content': ['exact', 'icontains', 'istartswith'],
#             # 'user': ['exact','icontains', 'istartswith'],
#         }

#     order_by = OrderingFilter(
#             fields = (
#                 # field and de argument
#                 ('id','id'),
#                 ('title','title'),
#                 # ('content','content'),
#                 # ('user', 'user'),
#                 # ('dateCreated', 'dateCreated'),
#             )
#         )
