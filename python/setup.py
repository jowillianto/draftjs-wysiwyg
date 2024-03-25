from setuptools import setup

setup(
    name = 'django-draftjs',
    version = '0.0.2',
    description = 'DraftJS Integration for Django Admin',
    url = 'https://github.com/jowillianto/draftjs-wysiwyg',
    author = 'Jonathan Willianto & Park JinHee',
    packages = [
        'django_draftjs'
    ],
    install_requires = [
        'django>=4.0'
    ], 
    include_package_data = True
)