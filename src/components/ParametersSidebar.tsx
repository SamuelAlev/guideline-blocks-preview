import { FC } from 'react';

import { BlockData } from './BlockData';
import { BlockSettings } from './BlockSettings';

type ParametersSidebarProps = {
    onDataChange(value: string): void;
    onSettingsChange(value: string): void;
};

export const ParametersSidebar: FC<ParametersSidebarProps> = ({ onDataChange, onSettingsChange }) => {
    return (
        <>
            <div className="flex flex-col gap-4">
                <BlockData onChange={onDataChange} />
            </div>
            <div className="flex flex-col gap-4">
                <BlockSettings onChange={onSettingsChange} />
            </div>
        </>
    );
};
