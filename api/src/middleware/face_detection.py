import cv2
import face_recognition
from moviepy.editor import AudioFileClip, VideoFileClip
import proglog
import os
import time

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
    
    clip = VideoFileClip(name)
    audio = AudioFileClip(name)
    final = clip.fl_image(blur_frame)
    final.set_audio(audio)
    name = name.replace(".mp4", "")
    final.write_videofile(name + "-faceblur.mp4", audio_codec="aac", logger=proglog.TqdmProgressBarLogger(print_messages=False))
    return name + "-faceblur.mp4"


if __name__ == "__main__":
    key = input()
    absolute_path = os.path.dirname(__file__)
    path = absolute_path.replace("src/middleware", "")
    start = time.time()
    filename = convert_video(path + 'videos/' + key) 
    file_list = filename.split("/")
    print(file_list[-1])
    end = time.time()
    total_time = (end - start) / 60
    # print("face blur time: "+ str(total_time))

