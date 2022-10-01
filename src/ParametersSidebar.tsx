import { FC } from 'react';

import { Textarea } from './components';
import { useBlockState } from './states';

type ParametersSidebarProps = {
    onDataChange(value: string): void;
    onSettingsChange(value: string): void;
};

export const ParametersSidebar: FC<ParametersSidebarProps> = ({ onDataChange, onSettingsChange }) => {
    const { settings, data } = useBlockState();

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <h1 className="flex-grow text-sm font-mono font-bold">Block Data</h1>
                    <button
                        className="p-2 flex items-center justify-center rounded hover:bg-[#eaebeb]"
                        onClick={() => onDataChange('')}
                        title="Switch to edit mode"
                    >
                        <div className="i-octicon-trash-16" />
                    </button>
                </div>
                <Textarea minRows={5} value={data} placeholder="{}" onChange={onDataChange} />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <h1 className="flex-grow text-sm font-mono font-bold">Block Settings</h1>
                    <button
                        className="p-2 flex items-center justify-center rounded hover:bg-[#eaebeb]"
                        onClick={() => onSettingsChange('')}
                        title="Switch to edit mode"
                    >
                        <div className="i-octicon-trash-16" />
                    </button>
                </div>
                <Textarea value={settings} placeholder="{}" onChange={onSettingsChange} />
            </div>
        </>
    );
};
