import sys

import cv2
import face_recognition
from moviepy.editor import AudioFileClip, VideoFileClip
from boto.s3.key import Key
import boto3
from botocore.exceptions import NoCredentialsError
import proglog
import os

ACCESS_KEY = 'AKIA24N6DJTDLNVG7EHC'
SECRET_KEY = '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'

def blur_frame(image):
    i = image.copy()
    small_frame = cv2.resize(i, (0, 0), fx=0.25, fy=0.25)
    rgb_frame = small_frame[:, :, ::-1]
    face_locations = face_recognition.face_locations(rgb_frame)
    for top, right, bottom, left in face_locations:
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        # cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
        face_image = i[top:bottom, left:right]

        # Blur the face image
        face_image = cv2.GaussianBlur(face_image, (99, 99), 30)
        i[top:bottom, left:right] = face_image
    return i


def convert_video(name: str):
    absolute_path = os.path.dirname(__file__)
    print(absolute_path)
    path = absolute_path.replace("api/src/middleware", "")
    clip = VideoFileClip(name)
    audio = AudioFileClip(name)
    final = clip.fl_image(blur_frame)
    final.set_audio(audio)
    name = name.replace(".mp4", "")
    final.write_videofile(name + "-faceblur.mp4", audio_codec="aac", logger=proglog.TqdmProgressBarLogger(print_messages=False))
    print(final)
    # print(name)
    # name = final.filename
    # print(name)


if __name__ == "__main__":
    convert_video("/Users/michellechernyi/Downloads/test2.mp4") #"../../original_videos/test2.mp4"  sys.argv[1] 
