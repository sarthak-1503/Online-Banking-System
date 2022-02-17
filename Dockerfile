FROM ubuntu:20.04.3


RUN apt-get update && apt-get install -y python3-opencv
RUN pip install opencv-python