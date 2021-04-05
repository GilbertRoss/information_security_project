from django.shortcuts import render
from django.http import HttpResponse
import bleach

# Create your views here.

def loginPage(request):
    return render(request, 'login/login.html', {'hello': bleach.clean('<script>alert(1);</script>')})