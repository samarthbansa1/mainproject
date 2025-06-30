from django.urls import path
from .views import CreateProblemView,ProblemListView,ProblemDetailView

urlpatterns = [
    path('create/', CreateProblemView.as_view(), name='create-problem'),
    path('', ProblemListView.as_view(), name='dashboard-view'),
    path('<int:p_id>/', ProblemDetailView.as_view(), name='problem-detail'),

]
