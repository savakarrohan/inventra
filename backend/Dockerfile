# This is the primary docker file used to build the web service from the django framework
FROM python:3.13-slim-bullseye

# set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# # Set working directory
WORKDIR /code

# # Installing python dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt
# Ideally there could be two different requirements and builds for gunicorn and django.
# WILL IGNORE FOR NOW.
# Can be worked on.

# Usage of bind mounts in the compose file will help.