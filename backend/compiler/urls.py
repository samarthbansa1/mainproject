from django.urls import path
from .views import CompileView,ProblemTestCaseListView,SubmitView

urlpatterns = [
    path('compile/', CompileView.as_view(), name='compiler-submit'),
    path('submit/', SubmitView.as_view(), name='final-submit'),
    path('<int:p_id>/testcases/', ProblemTestCaseListView.as_view(), name='problem-testcases'),

]
