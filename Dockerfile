FROM ubuntu:20.04.3


RUN apt-get update && apt-get install ffmpeg libsm6 libxext6 -y