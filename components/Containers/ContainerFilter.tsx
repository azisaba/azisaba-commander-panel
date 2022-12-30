import {Box, TextField} from "@mui/material";

type ContainerFilterProps = {
    onChange: (value: string) => void
}

export function ContainerFilter(props: ContainerFilterProps) {

    return (
        <>
            <Box
                sx={{
                    ml: "10px",
                    mb: "20px"
                }}
            >
                <TextField
                    type={"text"}
                    name={"filter"}
                    label={"検索フィルタ"}
                    variant={"standard"}
                    onChange={(event) => {
                        props.onChange(event.target.value)
                    }}
                />
            </Box>
        </>
    )
}