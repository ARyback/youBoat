# Generated by Django 4.0.4 on 2022-06-15 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lentboats', '0002_lentboat_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='lentboat',
            name='is_active',
            field=models.BooleanField(default=False, verbose_name='active status'),
        ),
    ]
