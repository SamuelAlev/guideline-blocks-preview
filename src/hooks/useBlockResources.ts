import { useCallback, useEffect, useMemo, useState } from 'react';

import { FRONTIFY_ARTIFACT_DOMAIN } from '../constants';
import { getBlockIdFromJsPath } from '../helpers';

export const useBlockResources = (jsPath: string, cssPath?: string) => {
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<Error | null>(null);
    const id = getBlockIdFromJsPath(jsPath);

    const removeBlockResources = useCallback(() => {
        const scriptElements = document.querySelectorAll(
            ['script[data-block-script]', 'link[data-block-style]'].join(', '),
        );

        for (const element of scriptElements) {
            element.parentNode && element.parentNode.removeChild(element);
        }
    }, []);

    const loadBlockScript = useCallback((path: string) => {
        return new Promise<void>((resolve, reject) => {
            const scriptElement = document.createElement('script');
            console.log(`${FRONTIFY_ARTIFACT_DOMAIN}/${path}`);
            scriptElement.setAttribute('src', `${FRONTIFY_ARTIFACT_DOMAIN}/${path}`);
            scriptElement.setAttribute('data-block-script', '');

            scriptElement.onload = () => resolve();
            scriptElement.onerror = () => reject(new Error('Could not load the block script'));

            document.head.appendChild(scriptElement);
        });
    }, []);

    const loadBlockStyle = useCallback((path: string) => {
        return new Promise<void>((resolve, reject) => {
            const linkElement = document.createElement('link');
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('href', `${FRONTIFY_ARTIFACT_DOMAIN}/${path}`);
            linkElement.setAttribute('data-block-style', '');

            linkElement.onload = () => resolve();
            linkElement.onerror = () => reject(new Error('Could not load the block style'));

            document.head.appendChild(linkElement);
        });
    }, []);

    useEffect(() => {
        const initBlock = async () => {
            setLoading(true);

            try {
                await Promise.all([loadBlockScript(jsPath), ...(cssPath ? [loadBlockStyle(cssPath)] : [])]);
                setErrors(null);
            } catch (error) {
                setErrors(error as Error);
            } finally {
                setLoading(false);
            }
        };

        initBlock();

        return () => {
            removeBlockResources();
        };
    }, [jsPath, cssPath, loadBlockScript, loadBlockStyle, removeBlockResources]);

    const Block = useMemo(() => !loading && !errors && window[id as keyof Window]?.block, [id, errors, loading]);
    const settingsStructure = useMemo(
        () => !loading && !errors && window[id as keyof Window]?.settings,
        [id, errors, loading],
    );

    return { loading, errors, Block, settingsStructure };
};
