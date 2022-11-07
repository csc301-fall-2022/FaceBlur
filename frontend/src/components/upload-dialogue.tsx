import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import "../static/upload-dialogue.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import * as upload from "../static/upload-dialogue.css";
import Cookies from "js-cookie";

const DragFile = (props: {
    handleDrop: (blob: Blob, string: string) => void;
    children: JSX.Element;
}) => {
    const ref = useRef<HTMLInputElement>(null);
    const [drag, setDrag] = useState(false);

    useEffect(() => {
        // let count = 0;
        const handleDrag = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDrag(true);
        };
        // const handleDragIn = (e: any) => {
        //     e.preventDefault();
        //     e.stopPropagation();
        //     count++;
        //     if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        //         setDrag(true);
        //     }
        // };
        // const handleDragOut = (e: {preventDefault: () => void; stopPropagation: () => void}) => {
        //     e.preventDefault();
        //     e.stopPropagation();
        //     count--;
        //     if (count > 0) return;
        //     setDrag(false);
        // };
        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDrag(false);
            if (e.dataTransfer != null) {
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    props.handleDrop(e.dataTransfer.files[0], e.dataTransfer.files[0].name);
                    e.dataTransfer.clearData();
                }
            }

            setDrag(false);
        };
        // ref.current?.addEventListener("dragenter", handleDragIn);
        // ref.current?.addEventListener("dragleave", handleDragOut);
        const currentRef = ref.current;
        if (currentRef != null) {
            currentRef.addEventListener("dragover", handleDrag);
            currentRef.addEventListener("drop", handleDrop);
        }

        return () => {
            // ref.current?.removeEventListener("dragenter", handleDragIn);
            // ref.current?.removeEventListener("dragleave", handleDragOut);
            if (currentRef != null) {
                currentRef.removeEventListener("dragover", handleDrag);
                currentRef.removeEventListener("drop", handleDrop);
            }
        };
    });
    return (
        <div ref={ref} style={{display: "inline-block", position: "relative"}}>
            {drag && (
                <div
                    style={{
                        border: "dashed grey 2px",
                        backgroundColor: "rgba(255,255,255,.8)",
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999
                    }}
                ></div>
            )}
            {props.children}
        </div>
    );
};

export default function UploadDialogue(props: {handleClick: () => void; updateVideos: () => void}) {
    const ref = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState(new Blob([], {type: "video/mp4"}));
    const [fileName, setFileName] = useState("");
    const [uploaded, setUploaded] = useState(false);
    const [faceBlur, setFaceBlur] = useState(false);
    const [backgroundBlur, setBackgroundBlur] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                setUploaded(false);
                setFaceBlur(false);
                setBackgroundBlur(false);
                props.handleClick();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const selectFile = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        if (target != null && target.files != null) {
            uploadFile(target.files[0], target.files[0].name);
        }
    };

    const uploadFile = (newFile: Blob, name: string) => {
        setFile(newFile);
        setFileName(name);
        setUploaded(true);
    };

    const postFile = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("faceBlur", faceBlur.toString());
        formData.append("backgroundBlur", backgroundBlur.toString());

        return fetch("/api/upload", {
            headers: {Authorization: "Bearer " + Cookies.get("access")},
            method: "POST",
            body: formData
        }).then(() => {
            setUploaded(false);
            setFaceBlur(false);
            setBackgroundBlur(false);
            setFile(new Blob([], {type: "video/mp4"}));
            props.handleClick();
            props.updateVideos();
        });
    };

    const handleFaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setFaceBlur(true);
        } else {
            setFaceBlur(false);
        }
    };

    const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setBackgroundBlur(true);
        } else {
            setBackgroundBlur(false);
        }
    };

    return (
        <div ref={ref} className={upload.popover}>
            <DragFile handleDrop={uploadFile}>
                <div className={upload.drag}>
                    <UploadFileIcon className={upload.icon} />
                    <div className={upload.dragText}>
                        <Button variant="text" component="label" onClick={() => setUploaded(false)}>
                            Upload File
                            <input type="file" hidden onChange={selectFile} />
                        </Button>{" "}
                        or drag and drop
                    </div>
                </div>
            </DragFile>
            {uploaded && <div>{fileName}</div>}
            <div className={upload.options}>
                <FormGroup className={upload.checkbox}>
                    <FormControlLabel
                        control={<Checkbox onChange={handleFaceChange} />}
                        label="Blur face"
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleBackgroundChange} />}
                        label="Blur background"
                    />
                </FormGroup>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#FA893C",
                        margins: "auto",
                        width: "100%",
                        "&:hover": {backgroundColor: "#f44336"}
                    }}
                    onClick={postFile}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}
