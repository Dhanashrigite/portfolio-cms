from rest_framework import viewsets, status
from rest_framework.permissions import BasePermission, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import (
    About,
    Skill,
    Project,
    Experience,
    Blog,
    Testimonial,
    Service,
    Media,
    Message,
)

from .serializers import (
    AboutSerializer,
    SkillSerializer,
    ProjectSerializer,
    ExperienceSerializer,
    BlogSerializer,
    TestimonialSerializer,
    ServiceSerializer,
    MessageSerializer,
)


class MessagePermission(BasePermission):
    """
    Anyone can submit a contact message.
    Only authenticated users can view, edit or delete messages.
    """

    def has_permission(self, request, view):
        if request.method == "POST":
            return True

        return bool(
            request.user and request.user.is_authenticated
        )


class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by("-created_at")
    serializer_class = MessageSerializer
    permission_classes = [MessagePermission]


class ImageUploadView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        uploaded_file = request.FILES.get("file")

        if not uploaded_file:
            return Response(
                {"error": "No image file provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        media = Media.objects.create(file=uploaded_file)

        return Response(
            {
                "id": media.id,
                "file": media.file.url,
                "uploaded_at": media.uploaded_at,
            },
            status=status.HTTP_201_CREATED
        )


class MediaListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        media = Media.objects.all().order_by("-uploaded_at")

        data = [
            {
                "id": item.id,
                "file": item.file.url,
                "uploaded_at": item.uploaded_at,
            }
            for item in media
        ]

        return Response(data)
