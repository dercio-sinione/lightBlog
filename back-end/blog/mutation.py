from graphql_jwt.decorators import login_required
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene import ClientIDMutation
from users.geralImports import (
    relay, 
    Mutation, 
    ObjectType,
    ID, 
    String, 
    Field,
    from_global_id,
    DsRelayFormMutation
)

# from .models import Post
from .query import Post, PostType
from .forms import PostForm
from .models import User


def user_verification(modeldataUser, user):
    """[User Verification]
    you can use the convenient user_verification function which raises a PermissionDenied
    exception when the informed users are not equal each other.
    
    Args:
        modeldataUser ([object]): [It is related with the user in your specific model]
        user ([object]): [It is related with the authenticated user who made the request]

    Raises:
        Exception: [raises a PermissionDenied
    exception when the informed users are not equal each other.]
    
    Returns:
        [bollean]: [return True
    if the informed users are not equal each other.]
    """
    if modeldataUser != user:
        raise Exception("You do not have permission to perform this action!")
    return True

####### Post
class PostMotation(relay.ClientIDMutation):
    """
    Creating and Updating User Types.
    This method create and update Post
    When id field is informed it update de related data object, otherwise a new Post is created.
    """
    
    class Input:
        id = ID()
        title = String(None)
        content = String(required=True)
        # user = ID(required=True)
    
    post = Field(PostType)
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **Input):
        id = Input.get('id')
        title = Input.get('title')
        content = Input.get('content')

        # user = User.objects.get(pk=from_global_id(Input.get('user'))[1])
        user = info.context.user
        
        # Add
        if id is None:
            post = Post(title=title,content=content, user=user)
        else: #Editar
            post = Post.objects.get(pk=from_global_id(id)[1])
            
            # verificar se o usuario e o dono do post
            user_verification(post.user,user)
            
            post.title = title
            post.content = content
            
        post.save()
        return PostMotation(post=post) 

class RemovePost(relay.ClientIDMutation):
    class Input:
        id = ID(required=True)

    post = Field(PostType)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, id):
        post = Post.objects.get(pk=from_global_id(id)[1])

        user_verification(post.user,info.context.user)
        
        post.delete()
        return RemovePost(post=post)  

class Mutation(ObjectType):
    post = PostMotation.Field()
    remove_post = RemovePost.Field()
