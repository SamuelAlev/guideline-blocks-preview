import { FC, useEffect, useState } from 'react';
import { useBlockState } from '../states';

import { BlockSettings } from './BlockSettings';
import { Input } from './Input';

type ParametersSidebarProps = {
    onDataChange(value: string): void;
    onSettingsChange(value: string): void;
};

export const ParametersSidebar: FC<ParametersSidebarProps> = ({ onDataChange, onSettingsChange }) => {
    const { data } = useBlockState();
    const [jsPath, setJsPath] = useState(data.jsPath);
    const [cssPath, setCssPath] = useState(data.cssPath);

    useEffect(() => {
        setJsPath(data.jsPath ?? '');
        setCssPath(data.cssPath ?? '');
    }, [data]);

    const handleJsPathChange = (value: string) => {
        setJsPath(value);
        onDataChange(JSON.stringify({ jsPath: value, cssPath }));
    };

    const handleCssPathChange = (value: string) => {
        setCssPath(value);
        onDataChange(JSON.stringify({ jsPath, cssPath: value }));
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <h1 className="flex-grow text-sm font-mono font-bold">Block Data</h1>
                </div>
                <Input placeholder=".js file name" value={jsPath} onChange={handleJsPathChange} />
                <Input placeholder=".css file name" value={cssPath} onChange={handleCssPathChange} />
            </div>
            <div className="flex flex-col gap-4">
                <BlockSettings onChange={onSettingsChange} />
            </div>
        </>
    );
};
