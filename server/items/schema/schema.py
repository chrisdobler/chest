from typing_extensions import Required
from xmlrpc.client import Boolean
import graphene
from graphene_django.types import DjangoObjectType
from ..models import Location, Item, Photo, Tag
from pprint import pprint as pp
from graphene_file_upload.scalars import Upload


class TagType(DjangoObjectType):
    id = graphene.Int(source="pk")

    class Meta:
        model = Tag


class PhotoType(DjangoObjectType):
    id = graphene.Int(source="pk")

    class Meta:
        model = Photo


class ItemType(DjangoObjectType):
    id = graphene.Int(source="pk")
    photos = graphene.List(PhotoType)
    tags = graphene.List(TagType)

    class Meta:
        model = Item

    def resolve_photos(self, info):
        return self.photos.all()

    def resolve_tags(self, info):
        return self.tags.all()


class LocationType(DjangoObjectType):
    class Meta:
        model = Location