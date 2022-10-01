import string
from typing_extensions import Required
from xmlrpc.client import Boolean
import graphene
from ..models import Location, Item, Photo, Tag
from pprint import pprint as pp

from .schema import LocationType, ItemType, PhotoType, TagType


class Query(object):
    items = graphene.List(ItemType, locationId=graphene.Int())
    item = graphene.Field(ItemType, id=graphene.Int())
    photo = graphene.List(PhotoType)
    locations = graphene.List(LocationType)
    location = graphene.Field(LocationType, id=graphene.Int())
    tags = graphene.List(TagType, searchPattern=graphene.String())

    def resolve_tags(self, info, searchPattern: string = None, **kwargs):
        if searchPattern:
            return Tag.objects.filter(name__contains=searchPattern)
        # if there is no serch pattern, then return the default for a new item
        return Tag.objects.filter(name="new")

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
