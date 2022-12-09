import {
    Box,
    IconButton,
    InputAdornment,
    InputLabel,
    ListItemText,
    OutlinedInput,
    TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Fab from "@mui/material/Fab";
import UploadDialogue from "components/upload-dialogue";
import {useNavigate} from "react-router-dom";
import NavBar from "../components/common";
import Button from "@mui/material/Button";
import Tags from "components/tags";
import Filter from "components/filter";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import * as home from "../static/home.css";

interface Column {
    id: "name" | "uploader" | "dateUploaded" | "options" | "tags" | "blurType";
    label: string;
    minWidth?: number;
    align?: "right";
}

interface VideoList {
    filteredList: Array<Video | undefined>;
}

interface VideoProps {
    filteredList: VideoList;
    disabled: boolean;
    updateVideos: () => void;
    setFilteredTags: (filteredTags: Array<string>) => void;
    filteredTags: Array<string>;
    filters: Array<string>;
    setFilters: (filters: Array<string>) => void;
}

const columns: readonly Column[] = [
    {id: "name", label: "Video Title", minWidth: 170},
    {id: "uploader", label: "Uploaded By", minWidth: 170},
    {id: "dateUploaded", label: "Date Uploaded", minWidth: 170},
    {id: "blurType", label: "Blur Type", minWidth: 170},
    {id: "tags", label: "Tags", minWidth: 170},
    {id: "options", label: "", minWidth: 100}
];

/**
 *
 * @param props See Interface
 * @returns Video List rendering all videos in the system
 */
const VideoList = (props: VideoProps): JSX.Element => {
    //https://mui.com/material-ui/react-table/
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tags, setTags] = useState<Array<string>>([]);
    const filterNames = ["No Blur", "Face Blurred", "Background Blurred"];

    const [openFilter, setOpenFilter] = useState(false);

    const updateTags = () => {
        fetch("/api/video_list/tags", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "GET"
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setTags(data.tags);
                props.updateVideos();
            });
    };

    useEffect(() => {
        fetch("/api/video_list/tags", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "GET"
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setTags(data.tags);
            });
    }, []);

    const navigate = useNavigate();

    async function routeChange(key: string) {
        if (!props.disabled) {
            const response = await fetch("/api/video", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    key: key
                })
            });
            const link = await response.json();

            const path = `/video`;
            navigate(path, {state: {link: link}});
        }
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    /**
     * updates filters state to reflect currently selected filters
     */
    const handleFilterChange = (event: SelectChangeEvent<typeof props.filters>) => {
        const {
            target: {value}
        } = event;
        props.setFilters(typeof value === "string" ? value.split(",") : value);
    };

    // delete video from prisma and s3
    function handleDeleteVideo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, fileId: number) {
        e.stopPropagation();
        fetch("/api/video_list/delete", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                fileId: fileId
            })
        }).then((res) => {
            return res.json();
        });
        props.updateVideos();
    }

    return (
        <Paper sx={{width: "100%", overflow: "hidden"}}>
            <TableContainer sx={{maxHeight: 600}}>
                <Table stickyHeader aria-label="videos">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                if (column.id === "tags") {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            style={{
                                                minWidth: column.minWidth,
                                                minHeight: 49,
                                                display: "flex",
                                                alignItems: "center",
                                                flexDirection: "row",
                                                gap: 2
                                            }}
                                        >
                                            <b>{column.label}</b>
                                            <Filter
                                                tagOptions={tags}
                                                filteredTags={props.filteredTags}
                                                setFilteredTags={props.setFilteredTags}
                                            />
                                        </TableCell>
                                    );
                                } else if (column.id === "blurType") {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            <b>{column.label}</b>
                                            <IconButton>
                                                <FilterListIcon
                                                    onClick={() => setOpenFilter(!openFilter)}
                                                />
                                            </IconButton>

                                            {openFilter && (
                                                <div>
                                                    <FormControl
                                                        sx={{
                                                            m: 1,
                                                            width: 170,
                                                            position: "absolute",
                                                            backgroundColor: "white"
                                                        }}
                                                    >
                                                        <InputLabel>Filter</InputLabel>
                                                        <Select
                                                            multiple
                                                            value={props.filters}
                                                            onChange={handleFilterChange}
                                                            input={<OutlinedInput label="Filter" />}
                                                            renderValue={(selected) =>
                                                                selected.join(", ")
                                                            }
                                                        >
                                                            {filterNames.map((filter) => (
                                                                <MenuItem
                                                                    key={filter}
                                                                    value={filter}
                                                                >
                                                                    <Checkbox
                                                                        checked={
                                                                            props.filters.indexOf(
                                                                                filter
                                                                            ) > -1
                                                                        }
                                                                    />
                                                                    <ListItemText
                                                                        primary={filter}
                                                                    />
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            )}
                                        </TableCell>
                                    );
                                } else {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            <b>{column.label}</b>
                                        </TableCell>
                                    );
                                }
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.filteredList.filteredList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                if (row === undefined) {
                                    throw undefined;
                                }
                                return (
                                    <TableRow
                                        hover={!props.disabled}
                                        role="checkbox"
                                        onClick={async () => await routeChange(row["name"])}
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        {columns.map((column) => {
                                            let value;
                                            if (column.id === "uploader") {
                                                value = row[column.id].email;
                                            } else if (column.id === "dateUploaded") {
                                                value = row[column.id].toLocaleDateString();
                                            } else if (column.id === "name") {
                                                value = row[column.id];
                                            } else if (column.id === "options") {
                                                return (
                                                    <TableCell key={column.id}>
                                                        <Button
                                                            onClick={(e) =>
                                                                handleDeleteVideo(e, row.id)
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                );
                                            } else if (column.id === "blurType") {
                                                value = row["type"];
                                            } else if (column.id === "tags") {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Tags
                                                            tagOptions={tags}
                                                            tags={row.tags}
                                                            videoID={row.id}
                                                            updateTagOptions={updateTags}
                                                        />
                                                    </TableCell>
                                                );
                                            }

                                            return <TableCell key={column.id}>{value}</TableCell>;
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.filteredList.filteredList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default function HomePage() {
    const [upload, showUploadDialogue] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const sleep = (milliseconds: number) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    /**
     * when user clicks off upload dialogue, upload dialogue disapears
     */
    const handleClick = async () => {
        showUploadDialogue(false);
        await sleep(500);
        setDisabled(false);
    };

    /**
     * shows upload dialogue and also disables video routes
     */
    const handleUpload = () => {
        showUploadDialogue(true);
        setDisabled(true);
    };

    const [videosList, setVideosList] = useState<Array<Video | undefined>>([]);
    const [filteredList, setFilteredList] = useState<Array<Video | undefined>>([]);
    const [filteredTags, setFilteredTags] = useState<Array<string>>([]);
    const [searchValue, setSearchValue] = useState("");
    const [filters, setFilters] = useState<Array<string>>([
        "No Blur",
        "Face Blurred",
        "Background Blurred"
    ]);

    //Get videos from prisma
    function getVideos() {
        function getTypeAsLiteral(type: string) {
            if (type === "FACE_BLURRED") {
                return "Face Blurred";
            } else if (type === "BACKGROUND_BLURRED") {
                return "Background Blurred";
            } else if (type === "NO_BLUR") {
                return "No Blur";
            }
            return null;
        }
        function vids(videos: BackendVideo[]): (Video | undefined)[] {
            return (videos as BackendVideo[]).map((video) => {
                const typeLiteral = getTypeAsLiteral(video.type);
                if (typeLiteral !== null) {
                    return {
                        dateUploaded: new Date(video.dateUploaded),
                        name: video.name,
                        id: video.id,
                        type: typeLiteral,
                        uploaderId: video.uploaderId,
                        uploader: video.uploader,
                        tags: video.tags.map((tag) => tag.name)
                    };
                }
            });
        }

        fetch("/api/video_list/list", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "GET"
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const videos = vids(data);
                setVideosList(videos);
                setFilteredList(videos);
            });
    }

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        const currentSearch = e.currentTarget.value.toLowerCase();
        setSearchValue(currentSearch);
    }

    useEffect(() => {
        getVideos();
    }, []);

    useEffect(() => {
        /**
         * filters video list using current search, tags and blur filters
         */
        setFilteredList(
            videosList.filter((video) => {
                if (searchValue === undefined) {
                    return true;
                } else {
                    const currentSearch = searchValue.toLowerCase();
                    const hasRightTitle =
                        currentSearch === "" || video?.name.toLowerCase().includes(currentSearch);
                    //TODO: change tags to just be the strings, and also remove all that dumb conversion stuff we were doing
                    const searchableVideoTags = new Set(video?.tags);
                    const hasRightTags =
                        filteredTags === undefined ||
                        filteredTags.length === 0 ||
                        filteredTags.every((tag) => searchableVideoTags.has(tag));
                    let hasRightBlurType = false;
                    if (video) {
                        hasRightBlurType = filters.includes(video.type);
                    }
                    return hasRightTitle && hasRightTags && hasRightBlurType;
                }
            })
        );
    }, [searchValue, filteredTags, videosList, filters]);

    return (
        <div>
            <NavBar />
            <div className={home.homepageContainer}>
                <div className={home.displayContainer}>
                    <Box sx={{}}>
                        <TextField
                            id="filled-basic"
                            variant="standard"
                            className={home.searchbar}
                            size="small"
                            placeholder="Search"
                            sx={{input: {color: "white", margin: "7px"}}}
                            value={searchValue}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        sx={{color: "white", margin: "5px"}}
                                    >
                                        <SearchIcon fontSize="large" />
                                    </InputAdornment>
                                ),
                                disableUnderline: true
                            }}
                        />
                    </Box>
                </div>
                <div className={home.uploadDialogue}>
                    {upload && (
                        <UploadDialogue handleClick={handleClick} updateVideos={getVideos} />
                    )}
                </div>
                <VideoList
                    disabled={disabled}
                    filteredList={{filteredList: filteredList}}
                    updateVideos={getVideos}
                    setFilteredTags={setFilteredTags}
                    filteredTags={filteredTags}
                    filters={filters}
                    setFilters={setFilters}
                />
            </div>
            <Fab variant="extended" className={home.uploadButton} onClick={handleUpload}>
                Upload
                <UploadFileIcon></UploadFileIcon>
            </Fab>
        </div>
    );
}
