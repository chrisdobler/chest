from tkinter import CASCADE
from django.db.models import (
    Model,
    TextField,
    DateTimeField,
    FloatField,
    ForeignKey,
    ManyToManyField,
    PROTECT,
)
from django.db import models

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

    class Meta:
        ordering = ["-updated_at"]


class Photo(models.Model):
    image = models.ImageField(upload_to="images/%Y/%m/%d/")
    item = models.ForeignKey(
        "Item",
        on_delete=models.CASCADE,
        related_name="photos",
        related_query_name="photo",
        blank=False,
        null=False,
    )
    created_at = DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return self.id
