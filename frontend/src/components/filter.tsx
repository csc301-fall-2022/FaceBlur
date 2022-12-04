import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import FilterListIcon from "@mui/icons-material/FilterList";


interface Props {
    tagOptions: Array<string>;
    filteredTags: Array<string>;
    setFilteredTags: (newFilteredTags: Array<string>) => void;
}

/**
 *
 * @param props See interface
 * @returns a filter Component for selecting tags to filter by
 */
const Filter = (props: Props) => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <FilterListIcon onClick={() => setVisible(!visible)} />
            {visible && (
                <Autocomplete
                    multiple
                    value={props.filteredTags}
                    onChange={(event, newValue) => {
                        props.setFilteredTags(newValue);
                    }}
                    id="tag-filter"
                    options={props.tagOptions}
                    defaultValue={[props.tagOptions[0]]}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField {...params} label="Filter" placeholder="Filtered Tags" />
                    )}
                />
            )}
        </div>
    );
};

export default Filter;
