from django.shortcuts import render


def index(request):
    return render(request, '/loftsmart/staticfiles/contacts/index.html')
