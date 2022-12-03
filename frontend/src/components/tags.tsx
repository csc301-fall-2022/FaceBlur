import React, {useState} from "react";
import {WithContext as ReactTags, Tag} from "react-tag-input";
import Button from "@mui/material/Button";

interface Props {
    tagOptions: Array<string>;
    tags: Array<string>;
    videoID: number;
    updateTagOptions: () => void;
}
const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Tags = (props: Props) => {
    console.log(props.tagOptions);
    const convertedTagOptions: Tag[] = props.tagOptions.map((tag, i) => {
        return {id: i.toString(), text: tag};
    });
    const convertedTags: Tag[] = props.tags.map((tag, i) => {
        return {id: i.toString(), text: tag};
    });
    const [tags, setTags] = useState(convertedTags);

    const handleDelete = (i: number) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag: Tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    };

    const saveTags = () => {
        const tagNamesOnly = tags.map((tag) => {
            return tag.text;
        });
        fetch("/api/video_list/tags/" + props.videoID, {
            headers: {Accept: "application/json", "Content-Type": "application/json"},
            method: "PATCH",
            body: JSON.stringify({
                tags: tagNamesOnly
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
            <ReactTags
                tags={tags}
                suggestions={convertedTagOptions}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                inputFieldPosition="bottom"
                autocomplete
            />
            <Button onClick={saveTags}>Save</Button>
        </div>
    );
};

export default Tags;
