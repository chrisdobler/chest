from xmlrpc.client import Boolean
import graphene
from ...models import Location
from pprint import pprint as pp

from ..schema import LocationType


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
        return DeleteLocation(location=loc, success=True)
