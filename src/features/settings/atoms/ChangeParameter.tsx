import * as React from 'react';
import {Context} from "../template/View";


type ChangeParameterType = {
    changeStroke: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    index: number;
    element:  SVGPathElement
    changeWidthIcon: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export const ChangeParameter: React.FC<ChangeParameterType> = ({
                                                                   changeStroke,
                                                                   index,
                                                                   changeWidthIcon,
                                                                   element
                                                               }) => {
    const svgCode = React.useContext(Context)

    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        if(svgCode !== undefined) {
            const node = element.attributes.getNamedItem('stroke-width')

            setValue(node!.value)
        }
    }, [element])

    return (
        <>
            <div>
                <label>Change Stroke-width</label>
                <input
                    min={0}
                    max={10}
                    step={0.1}
                    type="range"
                    value={value}
                    onChange={(e) => changeStroke(e, index)}
                />
            </div>
        </>
    );
};
