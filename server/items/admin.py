from django.contrib import admin
from .models import Item, Photo, Tag

# Register your models here.
class ItemAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "owner", "id", "created_at", "updated_at")
    search_fields = ("name", "location")
    ordering = ("updated_at", "name")

    filter_horizontal = ()


class PhotoAdmin(admin.ModelAdmin):
    list_display = ("id", "item")
    # ordering = ("created_at", "id")


class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "id")
    search_fields = ("name", "id")
    ordering = ("name", "id")


admin.site.register(Item, ItemAdmin)
admin.site.register(Photo, PhotoAdmin)
admin.site.register(Tag, TagAdmin)
