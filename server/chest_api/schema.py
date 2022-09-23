import graphene
import items.schema.schema
import items.schema.mutations


class Query(items.schema.schema.Query, graphene.ObjectType):
    pass


class Mutation(items.schema.mutations.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
