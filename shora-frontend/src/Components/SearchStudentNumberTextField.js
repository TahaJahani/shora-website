import * as React from 'react'
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { styled } from "@mui/material/styles";
import { usersAtom } from '../Atoms/usersAtom';
import { useRecoilState } from 'recoil';

const FullWidthAutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
}))

export default function SearchStudentNumberTextField({ onChange, onNotFound, value }) {

    const [users, setUsers] = useRecoilState(usersAtom)

    const filter = createFilterOptions();

    return (
        <FullWidthAutoComplete
            options={users}
            value={users && value ? users.find(item => item.id == value) : null}
            noOptionsText='کاربر یافت نشد'
            onChange={(event, newValue) => {
                if (typeof newValue === 'string')
                    setTimeout(() => onNotFound());
                else if (newValue && newValue.new_student_number)
                    onNotFound();
                else if (newValue)
                    onChange(newValue.id)
                else
                    onChange(null)
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== '') {
                    filtered.push({
                        new_student_number: params.inputValue,
                        student_number: 'افزودن کاربر جدید',
                    });
                }

                return filtered;
            }}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                  return option;
                }
                return option.student_number;
              }}
            renderInput={(params) => <TextField {...params} label="شماره دانشجویی" />}
        />
    )
}