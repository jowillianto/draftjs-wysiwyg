from django.forms.widgets import Widget
import pathlib

class EditorWidget(Widget):
    template_name = pathlib.Path(__file__).parent / 'templates' / 'django_draftjs' / 'draftjs.html'
    def format_value(self, value):
        return value
    def render(self, name, value, attrs = None, renderer = None):
        context = self.get_context(name, value, attrs)
        return self._render(str(self.template_name), context, renderer)
    
__all__ = [
    'EditorWidget'
]