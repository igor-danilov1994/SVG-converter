import * as React from 'react';
import {ChangeEvent} from "react";

type ChangeWidthPropsType = {
    changeWidthIcon: (e: ChangeEvent<HTMLInputElement>) => void
}

export const ChangeWidth: React.FC<ChangeWidthPropsType> = ({changeWidthIcon}) => {
    return (
        <>
            <label>Change width icon</label>
            <input
                min={0}
                max={100}
                step={1}
                type="range"
                onChange={(e) => changeWidthIcon(e)}
            />
        </>
    )
}