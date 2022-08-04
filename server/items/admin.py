from django.contrib import admin
from .models import Item, Photo

# Register your models here.
class ItemAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "owner", "id", "created_at", "updated_at")
    search_fields = ("name", "location")
    ordering = ("updated_at", "name")

    filter_horizontal = ()


class PhotoAdmin(admin.ModelAdmin):
    list_display = ("id", "item")
    # ordering = ("created_at", "id")


admin.site.register(Item, ItemAdmin)
admin.site.register(Photo, PhotoAdmin)
