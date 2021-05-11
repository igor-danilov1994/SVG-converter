import * as React from 'react';
import { ChangeParameter } from '../atoms/ChangeParameter';
import { UpLoader } from '../atoms/upLoader';
import { HTMLCode } from '../atoms/HTMLCode';
import { ShowIcon } from '../atoms/ShowIcon';

export const View = () => {
    const svgCode = React.useRef<HTMLCollectionOf<SVGSVGElement>>();

    const [svgHTML, setSvgHTML] = React.useState('');
    const [countPath, setCountPath] = React.useState<SVGPathElement[]>([]);

    React.useEffect(() => {
        svgCode.current = document.getElementsByTagName('svg');
    }, []);

    React.useEffect(() => {
        if (svgHTML && svgCode.current !== undefined) {
            const element = svgCode.current[0];

            const result = [].slice.call<HTMLCollection, never, SVGPathElement[]>(element.children);

            setCountPath(result.filter(({ attributes }) => attributes.getNamedItem('stroke-width')));
        }
    }, [svgHTML]);

    const changeStroke = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const node = countPath[index].attributes.getNamedItem('stroke-width');
        if (node !== null) {
            node.value = e.currentTarget.value;

            setSvgHTML(svgCode.current![0].outerHTML);
        }
    };

    const getSvgHTML = (text: string) => setSvgHTML(text);

    return (
        <>
            <div className="App">
                <UpLoader getSvgHTML={getSvgHTML} />

                <ShowIcon svgHTML={svgHTML} />

                <HTMLCode svgHTML={svgHTML} />
            </div>

            {countPath.map((_, index) => (
                <ChangeParameter
                    parameterName="Change Stroke-width"
                    changeParameter={changeStroke}
                    // value={el.attributes['stroke-width'].value}
                    index={index}
                    key={index}
                />
            ))}
        </>
    );
};