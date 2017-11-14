from django.contrib import admin

from .models import Contact, InteractionType, Interaction


class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_number')


class InteractionAdmin(admin.ModelAdmin):
    list_display = ('contact', 'type', 'created')


class InteractionTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(Contact, ContactAdmin)
admin.site.register(Interaction, InteractionAdmin)
admin.site.register(InteractionType, InteractionTypeAdmin)

