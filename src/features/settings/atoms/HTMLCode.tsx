import React from 'react'

type HTMLCodeType = {
    svgHTML: string
}

export const HTMLCode: React.FC<HTMLCodeType> = ({svgHTML}) => <div>{svgHTML}</div>

