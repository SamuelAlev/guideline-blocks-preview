import { FC, useEffect, useState } from 'react';

import { Input } from './Input';
import { useBlockState } from '../states';

type BlockDataProps = {
    onChange(value: string): void;
};

export const BlockData: FC<BlockDataProps> = ({ onChange }) => {
    const { data } = useBlockState();

    useEffect(() => {
        setJsPath(data.jsPath ?? '');
        setCssPath(data.cssPath ?? '');
    }, [data]);

    const [jsPath, setJsPath] = useState(data.jsPath);
    const [cssPath, setCssPath] = useState(data.cssPath);

    const handleJsPathChange = (value: string) => {
        setJsPath(value);
        onChange(JSON.stringify({ jsPath: value, cssPath }));
    };

    const handleCssPathChange = (value: string) => {
        setCssPath(value);
        onChange(JSON.stringify({ jsPath, cssPath: value }));
    };

    return (
        <>
            <div className="flex gap-2 items-center">
                <h1 className="flex-grow text-sm font-mono font-bold">Block Data</h1>
                <button
                    className="p-2 flex items-center justify-center rounded hover:bg-[#eaebeb]"
                    onClick={() => onChange('')}
                    title="Reset block data"
                >
                    <div className="i-octicon-trash-16" />
                </button>
            </div>
            <Input placeholder=".js file name" value={jsPath} onChange={handleJsPathChange} />
            <Input placeholder=".css file name" value={cssPath} onChange={handleCssPathChange} />
        </>
    );
};
