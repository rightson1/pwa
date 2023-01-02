import { Stack } from "@mui/system";
import { useState } from "react";
import { DatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
export const MuiPicker = () => {
    const [selectedDate, setSelectedDate] = useState();
    return (
        <Stack spacing={4} sx={{ width: '250px' }}>
            <DatePicker label="Date Picker" renderInput={() => <TextField  {...params} />}
                value={selected}
                onChange={(newValue) => selectedDate(newValue)}

            />
        </Stack>
    )
}