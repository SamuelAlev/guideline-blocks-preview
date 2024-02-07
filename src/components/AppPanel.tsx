import { SegmentedControls } from '@frontify/fondue';
import { FC, useEffect, useState } from 'react';

import { AppCustomFields, useAppStore } from '../states/useAppState';
import { Input } from './Input';

type AppPanelProps = {
    onChange(value: AppCustomFields): void;
};

export const AppPanel: FC<AppPanelProps> = ({ onChange }) => {
    const { customFields: data } = useAppStore();

    const handleAppBridgeModeChange = (value: AppCustomFields['appBridgeMode']) => {
        onChange({ ...data, appBridgeMode: value });
    };

    const handleJsPathChange = (value: string) => {
        onChange({ ...data, jsPath: value });
    };

    const handleCssPathChange = (value: string) => {
        onChange({ ...data, cssPath: value });
    };

    return (
        <>
            <div className="flex gap-2 items-center h-8">
                <h1 className="flex-grow text-sm font-mono font-bold">App Bridge mode</h1>
            </div>

            <SegmentedControls
                key="mode"
                activeItemId={data.appBridgeMode}
                items={[
                    { id: 'block', value: 'Block' },
                    { id: 'theme', value: 'Theme' },
                ]}
                onChange={(id) => handleAppBridgeModeChange(id as AppCustomFields['appBridgeMode'])}
            />

            <div className="flex gap-2 items-center h-8">
                <h1 className="flex-grow text-sm font-mono font-bold">Artifacts</h1>

                <button
                    type="button"
                    className="p-2 flex items-center justify-center rounded hover:bg-[#eaebeb]"
                    onClick={() => onChange({ appBridgeMode: 'block', jsPath: '', cssPath: '' })}
                    title="Reset artifacts"
                >
                    <div className="i-octicon-trash-16" />
                </button>
            </div>

            <Input placeholder=".js file name" value={data.jsPath} onChange={handleJsPathChange} />
            <Input placeholder=".css file name" value={data.cssPath} onChange={handleCssPathChange} />
        </>
    );
};
