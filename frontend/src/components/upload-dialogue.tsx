import React, {useEffect, useRef, useState} from "react";
import "./upload-dialogue.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";

export default function UploadDialogue(props: {handleClick: () => void}) {
    const ref = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
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

    return (
        <div ref={ref} className="popover">
            <UploadFileIcon className="icon" />
            <div>
                <a href="ADD ENDPOINT HERE" onClick={() => setUploading(false)}>
                    Click to upload
                </a>{" "}
                or drag and drop
            </div>
            {uploading && <div>test</div>}
            <FormGroup className="checkbox">
                <FormControlLabel control={<Checkbox />} label="Blur face" />
                <FormControlLabel control={<Checkbox />} label="Blur background" />
            </FormGroup>
            <Button variant="contained" sx={{backgroundColor: "#FA893C"}}>
                Submit
            </Button>
        </div>
    );
}
