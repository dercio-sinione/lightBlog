# Generated by Django 2.2.4 on 2020-10-03 14:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20201002_2206'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-dateCreated']},
        ),
    ]