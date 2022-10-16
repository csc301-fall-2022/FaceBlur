interface User {
    id: number;
    email: string;
    password: string;
}

interface Video {
    id: number;
    name: string;
    type: "FACE_BLURRED" | "BACKGROUND_BLURRED" | "NO_BLUR";
    uploaderId: number;
    uploader: User;
    dateUploaded: Date;
}

interface VideoProps {
    videoLink: string

}
