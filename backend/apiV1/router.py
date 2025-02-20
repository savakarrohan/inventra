from rest_framework import routers

from tutorial.quickstart import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"groups", views.GroupViewSet)
