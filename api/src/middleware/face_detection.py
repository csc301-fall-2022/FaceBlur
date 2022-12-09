import os

import mediapipe as mp
import proglog
from moviepy.editor import AudioFileClip, VideoFileClip
from scipy.ndimage.filters import gaussian_filter

mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils


def blur_frame(image):
    """
    takes frame of video and returns the frame with the face blurred

    :param image: frame of video
    """
    i = image.copy()
    rgb_frame = i[:, :, ::-1]
    with mp_face_detection.FaceDetection(
        model_selection=0, min_detection_confidence=0.3
    ) as face_detection:
        results = face_detection.process(rgb_frame)
        if not results.detections:
            return i
        for detection in results.detections:
            box = detection.location_data.relative_bounding_box
            y_scale = len(i)
            x_scale = len(i[0])

            width = box.width * 1.25
            height = box.height * 1.25

            left = box.xmin * x_scale
            right = left + width * x_scale
            left = int(left)
            right = int(right)
            right = min(right, x_scale)

            top = box.ymin * y_scale
            bottom = top + height * y_scale
            bottom = int(bottom)
            top = int(top)
            top = min(top, y_scale)

            face_image = i[top:bottom, left:right]

            # Blur the face image
            face_image = gaussian_filter(face_image, (15, 15, 0))
            i[top:bottom, left:right] = face_image
    return i


def convert_video(name: str):
    """
    takes a path to a video and creates a new version with the face blurred

    :param name str: path to video file
    """
    clip = VideoFileClip(name)
    audio = AudioFileClip(name)
    final = clip.fl_image(blur_frame)
    final.set_audio(audio)
    name = name.replace(".mp4", "")
    final.write_videofile(
        name + "-faceblur.mp4",
        audio_codec="aac",
        logger=proglog.TqdmProgressBarLogger(print_messages=False),
    )
    return name + "-faceblur.mp4"


if __name__ == "__main__":
    key = input()
    absolute_path = os.path.dirname(__file__)
    path = absolute_path.replace("src/middleware", "")
    filename = convert_video(path + "videos/" + key)
    print(filename)
