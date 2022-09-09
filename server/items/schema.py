from xmlrpc.client import Boolean
import graphene
import graphql_jwt
from graphene_django.types import DjangoObjectType
from .models import Location, Item, Photo
from pprint import pprint as pp
from graphene_file_upload.scalars import Upload


class PhotoType(DjangoObjectType):
    id = graphene.Int(source="pk")

    class Meta:
        model = Photo


class ItemType(DjangoObjectType):
    id = graphene.Int(source="pk")
    photos = graphene.List(PhotoType)

    class Meta:
        model = Item

    def resolve_photos(self, info):
        return self.photos.all()


class LocationType(DjangoObjectType):
    class Meta:
        model = Location


class Query(object):
    items = graphene.List(ItemType)
    item = graphene.Field(ItemType, id=graphene.Int())
    photo = graphene.List(PhotoType)
    locations = graphene.List(LocationType)
    location = graphene.Field(LocationType, id=graphene.Int())

    def resolve_items(self, info, **kwargs):
        return Item.objects.all()

    def resolve_item(self, info, id: int):
        item = Item.objects.get(id=id)
        return item

    def resolve_locations(self, info, **kwargs):
        return Location.objects.all()

    def resolve_location(self, info, id: int):
        loc = Location.objects.get(id=id)
        return loc


class CreateLocation(graphene.Mutation):
    location = graphene.Field(LocationType)

    class Arguments:
        lat = graphene.Float(required=False, default_value=None)
        lon = graphene.Float(required=False, default_value=None)
        name = graphene.String()

    def mutate(self, info, name, lat=None, lon=None):
        loc = Location(lat=lat, lon=lon, name=name)
        loc.save()
        return CreateLocation(location=loc)


class EditLocation(graphene.Mutation):
    location = graphene.Field(LocationType)

    class Arguments:
        lat = graphene.Float(required=False, default_value=None)
        lon = graphene.Float(required=False, default_value=None)
        name = graphene.String(required=False)
        id = graphene.Int()

    def mutate(self, info, id, name, lat=None, lon=None):
        loc = Location.objects.get(id=id)

        if name:
            loc.name = name
        if lat:
            loc.lat = lat
        if lon:
            loc.lon = lon
        loc.save()
        return EditLocation(location=loc)


class DeleteLocation(graphene.Mutation):
    location = graphene.Field(LocationType)
    success = graphene.Boolean()

    class Arguments:
        id = graphene.Int()

    def mutate(self, info, id):
        loc = Location.objects.get(id=id)
        loc.delete()
        return DeleteItem(location=loc, success=True)


class CreateItem(graphene.Mutation):
    item = graphene.Field(ItemType)

    class Arguments:
        name = graphene.String()
        location = graphene.Int()

    def mutate(self, info, name, location):
        item = Item(name=name, location=Location.objects.get(id=location))
        item.save()
        return CreateItem(item=item)


class EditItem(graphene.Mutation):
    item = graphene.Field(ItemType)

    class Arguments:
        name = graphene.String()
        location = graphene.Int()
        id = graphene.Int()

    def mutate(self, info, id, name, location):
        item = Item.objects.get(id=id)
        if name:
            item.name = name
        if location:
            item.location = Location.objects.get(id=location)
        item.save()
        return EditItem(item=item)


class DeleteItem(graphene.Mutation):
    item = graphene.Field(ItemType)

    class Arguments:
        id = graphene.Int()

    def mutate(self, info, id):
        item = Item.objects.get(id=id)
        item.delete()
        return DeleteItem(item=item)


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
