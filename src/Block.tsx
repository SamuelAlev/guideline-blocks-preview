import { FC, useMemo } from 'react';
import useErrorBoundary from 'use-error-boundary';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { useBlockResources } from './hooks';
import { useBlockState } from './states';

type BlockProps = {
    id: string;
    js: string;
    css?: string;
};

export const Block: FC<BlockProps> = ({ id, js, css }) => {
    const { ErrorBoundary, didCatch, error } = useErrorBoundary();
    const { isEditing, settings } = useBlockState();

    const { loading, errors } = useBlockResources(js, css);

    const LoadedBlock = useMemo(() => !loading && !errors && window[id as keyof Window]?.block, [id, errors, loading]);

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

    return (
        <>
            {didCatch ? (
                <p>An error has been caught while rendering the block: {error.message}</p>
            ) : (
                <ErrorBoundary>
                    <BlockWithStubbedAppBridge />
                </ErrorBoundary>
            )}
        </>
    );
};
