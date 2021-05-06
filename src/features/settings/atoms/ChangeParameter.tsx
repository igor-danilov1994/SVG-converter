import React from 'react'

type ChangeStrokeWidthType = {
    changeParameter: (e: any, index: number) => void
    index: number
    value: string
    parameterName: string
}

export const ChangeParameter: React.FC<ChangeStrokeWidthType> = ({changeParameter, index, value, parameterName}) => {
    return (
        <>
            <label>{parameterName}</label>

            <input
                min={0}
                max={10}
                step={0.1}
                type="range"
                value={value}
                onChange={(e) => changeParameter(e, index)}
            />
        </>
    )
}