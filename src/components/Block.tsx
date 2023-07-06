import { FC, useEffect, useMemo } from 'react';
import useErrorBoundary from 'use-error-boundary';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { useBlockResources } from '../hooks';
import { useBlockState } from '../states';

type BlockProps = {
    js: string;
    css?: string;
};

export const Block: FC<BlockProps> = ({ js, css }) => {
    const { ErrorBoundary, didCatch, error } = useErrorBoundary();
    const { isEditing, settings, setSettingsStructure } = useBlockState();

    const { errors: errorsWhileLoadingResources, Block: LoadedBlock, settingsStructure } = useBlockResources(js, css);

    const BlockWithStubbedAppBridge = useMemo(() => {
        let parsedBlockSettings = {};
        try {
            parsedBlockSettings = JSON.parse(settings);
        } catch {}

        const [BlockWithStubs, appBridge] = withAppBridgeBlockStubs(LoadedBlock || (() => <div></div>), {
            blockSettings: parsedBlockSettings,
            editorState: isEditing,
        });

        return function BlockWrapper() {
            return (
                <div data-block={appBridge.getBlockId()} className="block">
                    <BlockWithStubs />
                </div>
            );
        };
    }, [LoadedBlock, settings, isEditing]);

    useEffect(() => setSettingsStructure(settingsStructure), [setSettingsStructure, settingsStructure]);

    return didCatch || errorsWhileLoadingResources ? (
        <div className="flex flex-col gap-2 text-red-8">
            <span className="text-xl">An error has been caught while rendering the block</span>
            <span>{error?.message ?? errorsWhileLoadingResources?.message ?? 'No error message received'}</span>
        </div>
    ) : (
        <ErrorBoundary>
            <BlockWithStubbedAppBridge />
        </ErrorBoundary>
    );
};
