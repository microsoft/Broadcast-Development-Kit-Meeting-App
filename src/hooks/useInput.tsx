// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { useState } from "react";

const useInput = (initialValue: any, defaultValue: any) => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(defaultValue),
        bind: {
            value,
            onChange: (event: any, data: any) => {
                setValue(data.value);
            }
        }
    };
};

export default useInput;