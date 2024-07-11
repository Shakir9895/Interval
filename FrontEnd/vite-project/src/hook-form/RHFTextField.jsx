
import { TextField } from '@mui/material';

import { useFormContext, Controller } from 'react-hook-form';



export default function RHFTextField({ name, helperText, register, disabled, ...other }) {
    console.log("helperText>>>", helperText)
    const { control } = useFormContext();
    console.log(control)
    return (
        // <div style={{border:"2px solid orange"}}>
        //     <input type = "text" {...register}/>
        // </div>

        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                console.log("errppppppppppp", field)
                console.log(!!error) // bolean convert

                return (

                    <TextField
                        size="small"
                        disabled={disabled}
                        {...field}
                        fullWidth
                        value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                        error={!!error}
                        helperText={error ? error?.message : helperText} //taye kanikkenda text
                        {...other} // label
                    />

                )
            }}
        />


    );
}

