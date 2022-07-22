# Generated by Django 3.2.14 on 2022-07-22 19:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='OwnerGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True)),
                ('lat', models.FloatField()),
                ('lon', models.FloatField()),
                ('tags', models.ManyToManyField(blank=True, to='items.Tag')),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.TextField(blank=True)),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='items.location')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='items.ownergroup')),
                ('tags', models.ManyToManyField(blank=True, to='items.Tag')),
            ],
        ),
    ]
