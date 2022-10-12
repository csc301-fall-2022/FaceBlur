import React from "react";
import "./upload-dialogue.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

class UploadDialogue extends React.Component<any> {
    wrapperRef: React.RefObject<any>;
    state = {
        uploading: false
    };
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.handleClick();
        }
    }

    render() {
        return (
            <div ref={this.wrapperRef} className="popover">
                <UploadFileIcon className="icon" />
                <div>
                    <a href="ADD ENDPOINT HERE" onClick={() => this.setState({uploading: false})}>
                        Click to upload
                    </a>{" "}
                    or drag and drop
                </div>
                {this.state.uploading && <div>test</div>}
                <FormGroup className="checkbox">
                    <FormControlLabel control={<Checkbox />} label="Blur face" />
                    <FormControlLabel control={<Checkbox />} label="Blur background" />
                </FormGroup>
            </div>
        );
    }
}

export default UploadDialogue;
