from django.shortcuts import render

# Create your views here.

def registerPage(request):
    return render(request, 'register/register.html')