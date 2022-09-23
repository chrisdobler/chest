from typing_extensions import Required
from xmlrpc.client import Boolean
import graphene
from graphene_django.types import DjangoObjectType
from ..models import Location, Item, Photo
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
    items = graphene.List(ItemType, locationId=graphene.Int())
    item = graphene.Field(ItemType, id=graphene.Int())
    photo = graphene.List(PhotoType)
    locations = graphene.List(LocationType)
    location = graphene.Field(LocationType, id=graphene.Int())

    def resolve_items(self, info, locationId: int = None, **kwargs):
        if locationId:
            return Item.objects.filter(location_id=locationId)
        return Item.objects.all()

    def resolve_item(self, info, id: int):
        item = Item.objects.get(id=id)
        return item

    def resolve_locations(self, info, **kwargs):
        return Location.objects.all()

    def resolve_location(self, info, id: int):
        loc = Location.objects.get(id=id)
        return loc
