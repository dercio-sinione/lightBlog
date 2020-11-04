from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
# from graphql_jwt.decorators import login_required, superuser_required

# from users.geralImports import relay, Field, String, ObjectType
from graphene import relay, ObjectType, String, Field, List
from .models import Post
from .filerTypes import PostFilter

class PostType(DjangoObjectType):
    class Meta:
        model = Post
        filterset_class = PostFilter
        interfaces = (relay.Node,)
        
    picture_url = String()
    
    def resolve_picture_url(self, info):
        if self.picture:
            return self.picture.url
        return None

class Query(ObjectType):
    post = relay.Node.Field(PostType)
    all_post = DjangoFilterConnectionField(PostType)
    
    # @login_required
    # @superuser_required
    def resolve_all_post(self, info, **kwargs):
        pass