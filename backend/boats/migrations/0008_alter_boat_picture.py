# Generated by Django 4.0.4 on 2022-06-16 22:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boats', '0007_alter_boat_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='boat',
            name='picture',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
