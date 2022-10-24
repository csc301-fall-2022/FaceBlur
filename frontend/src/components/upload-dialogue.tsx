import React, {useEffect, useRef, useState} from "react";
import "./upload-dialogue.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";

const DragFile = (props: any) => {
    const ref = useRef<HTMLInputElement>(null);
    const [drag, setDrag] = useState(false);

    useEffect(() => {
        let count = 0;
        const handleDrag = (e: {preventDefault: () => void; stopPropagation: () => void}) => {
            e.preventDefault();
            e.stopPropagation();
        };
        const handleDragIn = (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            count++;
            if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                setDrag(true);
            }
        };
        const handleDragOut = (e: {preventDefault: () => void; stopPropagation: () => void}) => {
            e.preventDefault();
            e.stopPropagation();
            count--;
            if (count > 0) return;
            setDrag(false);
        };
        const handleDrop = (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            setDrag(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                props.handleDrop(e.dataTransfer.files[0]);
                e.dataTransfer.clearData();
            }
        };
        ref.current?.addEventListener("dragenter", handleDragIn);
        ref.current?.addEventListener("dragleave", handleDragOut);
        ref.current?.addEventListener("dragover", handleDrag);
        ref.current?.addEventListener("drop", handleDrop);
        return () => {
            ref.current?.removeEventListener("dragenter", handleDragIn);
            ref.current?.removeEventListener("dragleave", handleDragOut);
            ref.current?.removeEventListener("dragover", handleDrag);
            ref.current?.removeEventListener("drop", handleDrop);
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

export default function UploadDialogue(props: {handleClick: () => void}) {
    const ref = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState({name: ""});
    const [uploaded, setUploaded] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                props.handleClick();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const selectFile = (e: any) => {
        uploadFile(e.target.files[0]);
    };

    const uploadFile = (newFile: any) => {
        setFile(newFile);
        return fetch("/upload", {
            method: "POST",
            body: JSON.stringify({file: file})
        }).then((data) => {
            setUploaded(true);
        });
    };

    return (
        <div ref={ref} className="popover">
            <DragFile handleDrop={uploadFile}>
                <div className="drag">
                    <UploadFileIcon className="icon" />
                    <div className="drag-text">
                        <Button variant="text" component="label" onClick={() => setUploaded(false)}>
                            Upload File
                            <input type="file" hidden onChange={selectFile} />
                        </Button>{" "}
                        or drag and drop
                    </div>
                </div>
            </DragFile>
            {uploaded && <div>{file.name}</div>}
            <div className="options">
                <FormGroup className="checkbox">
                    <FormControlLabel control={<Checkbox />} label="Blur face" />
                    <FormControlLabel control={<Checkbox />} label="Blur background" />
                </FormGroup>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#FA893C",
                        margins: "auto",
                        width: "100%",
                        "&:hover": {backgroundColor: "#f44336"}
                    }}
                    onClick={props.handleClick}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}
