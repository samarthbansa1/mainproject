from django.urls import path
from .views import CreateProblemView,ProblemListView

urlpatterns = [
    path('create/', CreateProblemView.as_view(), name='create-problem'),
    path('', ProblemListView.as_view(), name='dashboard-view'),

]
