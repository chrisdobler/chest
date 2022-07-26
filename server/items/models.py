from django.db.models import (
    Model,
    TextField,
    DateTimeField,
    FloatField,
    ForeignKey,
    ManyToManyField,
    PROTECT,
)

# Create your models here.


class OwnerGroup(Model):
    name = TextField(blank=True)


class Tag(Model):
    name = TextField(blank=True)


class Location(Model):
    name = TextField(blank=True)
    lat = FloatField()
    lon = FloatField()
    tags = ManyToManyField(Tag, blank=True)


class Item(Model):
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    location = ForeignKey(Location, on_delete=PROTECT, null=True)
    name = TextField(blank=True)
    tags = ManyToManyField(Tag, blank=True)
    owner = ForeignKey(OwnerGroup, on_delete=PROTECT, null=True)
