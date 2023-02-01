// eslint-disable react/jsx-props-no-spreading
import React, { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Tag as TagType } from '../types';

interface Props {
    currentTagOptions: TagType[] | null;
    selectedTags: TagType[] | null;
    handleTextSearchInput: (textSearch: string) => void;
    handleTagChange: (tags: TagType[]) => void;
    handleAddNewTag: (tagString: string) => void;
}

export default function AutoCompleteTags({
    currentTagOptions,
    handleTextSearchInput,
    handleTagChange,
    handleAddNewTag,
    selectedTags,
}: Props) {
    return (
        <Stack
            spacing={3}
            // sx={{ width: 500 }}
        >
            <Autocomplete
                multiple
                id='tags-outlined'
                options={[...(currentTagOptions || [])]}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    return option.name;
                }}
                defaultValue={[...(selectedTags || [])]}
                filterSelectedOptions
                freeSolo
                onChange={(event, newValue) => {
                    handleTagChange(
                        newValue.filter((value) =>
                            typeof value === 'string'
                                ? handleAddNewTag(value)
                                : true
                        ) as TagType[]
                    );
                }}
                onInputChange={(event, newInputValue) => {
                    // todo: search for tags to reduce load payload
                    // handleTextSearchInput(newInputValue);
                    console.log(newInputValue);
                }}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            label='Tags'
                            placeholder='Tags'
                        />
                    );
                }}
            />
        </Stack>
    );
}
