import React, {useState} from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface Props {
    tagOptions: Array<string>;
    tags: Array<string>;
    videoID: number;
    updateTagOptions: () => void;
}

/**
 *
 * @param props See above interface
 * @returns Editable tags for a single video
 */
const Tags = (props: Props) => {
    const [values, setValues] = useState<Array<string>>(props.tags);
    const saveTags = () => {
        fetch("/api/video_list/tags/" + props.videoID, {
            headers: {Accept: "application/json", "Content-Type": "application/json"},
            method: "PATCH",
            body: JSON.stringify({
                tags: values
            })
        }).then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            props.updateTagOptions();
            alert("Your tags have been saved");
        });
    };

    return (
        <div>
            <Autocomplete
                value={values}
                onChange={(event, newValue) => {
                    setValues(newValue);
                }}
                multiple
                id="tag-editor"
                options={props.tagOptions}
                defaultValue={[props.tagOptions[0]]}
                filterSelectedOptions
                freeSolo={true}
                renderInput={(params) => <TextField {...params} placeholder="Tags" />}
            />

            <Button onClick={saveTags}>Save</Button>
        </div>
    );
};

export default Tags;
