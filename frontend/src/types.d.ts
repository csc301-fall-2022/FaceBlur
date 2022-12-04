interface User {
    id: number;
    email: string;
    password: string;
}
interface Tag {
    name: string;
}

interface BackendVideo {
    id: number;
    name: string;
    type: "FACE_BLURRED" | "BACKGROUND_BLURRED" | "NO_BLUR";
    uploaderId: number;
    uploader: User;
    dateUploaded: Date;
    tags: Array<Tag>;
}
interface Video {
    id: number;
    name: string;
    type: "FACE_BLURRED" | "BACKGROUND_BLURRED" | "NO_BLUR";
    uploaderId: number;
    uploader: User;
    dateUploaded: Date;
    tags: Array<string>;
}

interface VideoProps {
    videoLink: string;
}
