import graphene
from graphene_django.types import DjangoObjectType
from .models import Location, Item, Photo
from pprint import pprint as pp
from graphene_file_upload.scalars import Upload


class ItemType(DjangoObjectType):
    id = graphene.Int(source="pk")

    class Meta:
        model = Item


class LocationType(DjangoObjectType):
    class Meta:
        model = Location


class Query(object):
    items = graphene.List(ItemType)

    def resolve_items(self, info, **kwargs):
        return Item.objects.all()

    item = graphene.Field(ItemType, id=graphene.Int())

    def resolve_item(self, info, id: int):
        pp(info)
        return Item.objects.get(id=id)

    locations = graphene.List(LocationType)

    def resolve_locations(self, info, **kwargs):
        return Location.objects.all()


class CreateLocation(graphene.Mutation):
    location = graphene.Field(LocationType)

    class Arguments:
        lat = graphene.Float()
        lon = graphene.Float()
        name = graphene.String()

    def mutate(self, info, lat, lon, name):
        loc = Location(lat=lat, lon=lon, name=name)
        loc.save()
        return CreateLocation(location=loc)


class CreateItem(graphene.Mutation):
    item = graphene.Field(ItemType)

    class Arguments:
        name = graphene.String()

    def mutate(self, info, name):
        item = Item(name=name)
        item.save()
        return CreateItem(item=item)


class EditItem(graphene.Mutation):
    item = graphene.Field(ItemType)

    class Arguments:
        name = graphene.String()
        id = graphene.Int()

    def mutate(self, info, id, name):
        item = Item.objects.get(id=id)
        item.name = name
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
    class Arguments:
        file = Upload(required=True)
        itemId = graphene.Int()

    success = graphene.Boolean()

    def mutate(self, info, file, itemId, **kwargs):
        item = Item.objects.only("id").get(id=itemId)
        photo = Photo(image=file, item=item)
        photo.save()
        return AddPhoto(success=True)


class Mutation(graphene.ObjectType):
    create_location = CreateLocation.Field()
    create_item = CreateItem.Field()
    edit_item = EditItem.Field()
    delete_item = DeleteItem.Field()
    add_photo = AddPhoto.Field()
