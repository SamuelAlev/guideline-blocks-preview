import { FC, useState } from 'react';

import { Textarea } from '.';
import { SidebarSettings } from './SidebarSettings';
import { useBlockState } from '../states';
import { merge } from '../utils';

type BlockSettingsProps = {
    onChange(value: string): void;
};

export const BlockSettings: FC<BlockSettingsProps> = ({ onChange }) => {
    const { settings } = useBlockState();

    const [isAdvancedModeEnabled, setIsAdvancedModeEnabled] = useState(true);

    return (
        <>
            <div className="flex gap-2 items-center">
                <h1 className="flex-grow text-sm font-mono font-bold">Block Settings</h1>
                <button
                    className={merge([
                        'p-2 flex items-center justify-center rounded',
                        isAdvancedModeEnabled ? 'bg-[#424747] text-white' : 'hover:bg-[#eaebeb]',
                    ])}
                    onClick={() => setIsAdvancedModeEnabled(!isAdvancedModeEnabled)}
                    title="Switch to advanced mode"
                >
                    <div className="i-octicon-gear-16" />
                </button>
                <button
                    className="p-2 flex items-center justify-center rounded hover:bg-[#eaebeb]"
                    onClick={() => onChange('')}
                    title="Reset settings"
                >
                    <div className="i-octicon-trash-16" />
                </button>
            </div>
            {!isAdvancedModeEnabled ? (
                <SidebarSettings onChange={onChange} />
            ) : (
                <Textarea value={settings} placeholder="{}" onChange={onChange} />
            )}
        </>
    );
};
