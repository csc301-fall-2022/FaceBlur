import os
import sys
import time

import cv2
import mediapipe
import proglog
from moviepy.editor import AudioFileClip, VideoFileClip


def blur_frame(image):
    """
    takes a given frame of a video and returns the frame with the background blurred

    :param image: frame of video
    """
    i = image.copy()
    selfie_segmentation = mediapipe.solutions.selfie_segmentation.SelfieSegmentation(
        model_selection=1
    )
    mask = selfie_segmentation.process(i).segmentation_mask[:, :, None]
    mask = mask > 0.8

    bg = cv2.GaussianBlur(i.astype(float), (99, 99), 30)
    return mask * i + (1 - mask) * bg


def convert_video(name: str):
    """
    takes a path to a video and creates a version with the background blurred

    :param name str: path to video file
    """
    clip1 = VideoFileClip(name)
    audio1 = AudioFileClip(name)
    final = clip1.fl_image(blur_frame)
    final.set_audio(audio1)
    name = name.replace(".mp4", "")
    final.write_videofile(
        name + "-backgroundblur.mp4",
        audio_codec="aac",
        logger=proglog.TqdmProgressBarLogger(print_messages=False),
    )
    return name + "-backgroundblur.mp4"


if __name__ == "__main__":
    key = input()
    absolute_path = os.path.dirname(__file__)
    path = absolute_path.replace("src/middleware", "")
    start = time.time()
    filename = convert_video(path + "videos/" + key)
    file_list = filename.split("/")
    print(file_list[-1])
    end = time.time()
    total_time = (end - start) / 60
    # print("background blur time: "+ str(total_time))
