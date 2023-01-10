from xmlrpc.client import Boolean
import graphene
from ...models import Tag
from pprint import pprint as pp

from ..schema import TagType


class CreateTag(graphene.Mutation):
    tag = graphene.Field(TagType)

    class Arguments:
        name = graphene.String()

    def mutate(self, info, name):
        tag = Tag(name=name)
        tag.save()
        return CreateTag(tag=tag)
