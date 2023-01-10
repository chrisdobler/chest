from xmlrpc.client import Boolean
import graphene
from ...models import Item, Location
from pprint import pprint as pp

from ..schema import ItemType


class CreateItem(graphene.Mutation):
    item = graphene.Field(ItemType)

    class Arguments:
        name = graphene.String()
        locationId = graphene.Int()
        tags = graphene.List(graphene.Int)

    def mutate(self, info, name, locationId, tags):
        pp(tags)
        item = Item(name=name, location=Location.objects.get(id=locationId))
        item.save()
        return CreateItem(item=item)


class EditItem(graphene.Mutation):
    item = graphene.Field(ItemType)

    class Arguments:
        name = graphene.String()
        locationId = graphene.Int()
        id = graphene.Int()
        tags = graphene.List(graphene.Int)

    def mutate(self, info, id, name, locationId, tags):
        item = Item.objects.get(id=id)
        if name:
            item.name = name
        if locationId:
            item.location = Location.objects.get(id=locationId)
        if tags:
            item.tags.set(tags)

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
