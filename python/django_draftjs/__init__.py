from django.forms.widgets import Widget
from django.db import models
import pathlib

class EditorWidget(Widget):
    template_name = pathlib.Path(__file__).parent / 'templates' / 'django_draftjs' / 'draftjs.html'
    def format_value(self, value):
        return value
    def render(self, name, value, attrs = None, renderer = None):
        context = self.get_context(name, value, attrs)
        return self._render(str(self.template_name), context, renderer)

class EditorField(models.JSONField):
    description = "A field that stores the data for use with DraftJS"
    def formfield(self, **kwargs):
        kwargs['widget'] = EditorWidget
        return super().formfield(**kwargs)
    
__all__ = [
    'EditorWidget'
]