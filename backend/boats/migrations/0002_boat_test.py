# Generated by Django 4.0.4 on 2022-06-09 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boats', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='boat',
            name='test',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
