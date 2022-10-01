from xmlrpc.client import Boolean
import graphene
import graphql_jwt
from graphene_django.types import DjangoObjectType
from ...models import Location, Item, Photo
from pprint import pprint as pp
from graphene_file_upload.scalars import Upload

from ..schema import LocationType, ItemType, PhotoType, TagType

from .location import CreateLocation, DeleteLocation, EditLocation
from .item import CreateItem, DeleteItem, EditItem

# from .tag import CreateTag, DeleteTag, EditTag


class AddPhoto(graphene.Mutation):
    success = graphene.Boolean()
    photo = graphene.Field(PhotoType)
    item = graphene.Field(ItemType)

    class Arguments:
        file = Upload(required=True)
        itemId = graphene.Int()

    def mutate(self, info, file, itemId, **kwargs):
        item = Item.objects.only("id").get(id=itemId)
        photo = Photo(src=file, item=item)
        photo.save()
        return AddPhoto(item=item, photo=photo, success=True)


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

    create_location = CreateLocation.Field()
    edit_location = EditLocation.Field()
    delete_location = DeleteLocation.Field()
    create_item = CreateItem.Field()
    edit_item = EditItem.Field()
    delete_item = DeleteItem.Field()
    add_photo = AddPhoto.Field()

    # create_tag =
