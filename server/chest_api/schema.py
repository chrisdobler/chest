import graphene
import items.schema


class Query(items.schema.Query, graphene.ObjectType):
    pass


class Mutation(items.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
