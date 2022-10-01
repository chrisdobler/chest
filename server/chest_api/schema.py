import graphene
import items.schema.schema
from items.schema.mutations.mutations import Mutation
import items.schema.queries


class Query(items.schema.queries.Query, graphene.ObjectType):
    pass


class Mutation(Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
