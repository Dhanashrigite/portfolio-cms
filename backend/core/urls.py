from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    AboutViewSet,
    SkillViewSet,
    ProjectViewSet,
    ExperienceViewSet,
    BlogViewSet,
    TestimonialViewSet,
    ServiceViewSet,
    MessageViewSet,
    ImageUploadView,
    MediaListView,
)


router = DefaultRouter()

router.register(r"about", AboutViewSet, basename="about")
router.register(r"skills", SkillViewSet, basename="skills")
router.register(r"projects", ProjectViewSet, basename="projects")
router.register(r"experience", ExperienceViewSet, basename="experience")
router.register(r"blogs", BlogViewSet, basename="blogs")
router.register(r"testimonials", TestimonialViewSet, basename="testimonials")
router.register(r"services", ServiceViewSet, basename="services")
router.register(r"messages", MessageViewSet, basename="messages")


urlpatterns = [
    path("", include(router.urls)),

    path(
        "upload/image/",
        ImageUploadView.as_view(),
        name="image-upload"
    ),

    path(
        "media/",
        MediaListView.as_view(),
        name="media-list"
    ),
]