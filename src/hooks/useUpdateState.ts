import { useState } from 'react';

export const useUpdateState = () =>{
    const [state, setState] = useState(false)

    const update = () => {
        setState(!state);
    }

    return update;
}