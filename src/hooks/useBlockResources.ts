import { useCallback, useEffect, useState } from 'react';
import { FRONTIFY_ARTIFACT_DOMAIN } from '../constants';

export const useBlockResources = (jsPath: string, cssPath?: string) => {
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<Error | null>(null);

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
            scriptElement.setAttribute('src', `${FRONTIFY_ARTIFACT_DOMAIN}/${path}`);
            scriptElement.setAttribute('data-block-script', '');

            scriptElement.onload = () => resolve();
            scriptElement.onerror = (error) => reject(error);

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
            linkElement.onerror = (error) => reject(error);

            document.head.appendChild(linkElement);
        });
    }, []);

    useEffect(() => {
        const initBlock = async () => {
            setLoading(true);

            try {
                await Promise.all([loadBlockScript(jsPath), ...(cssPath ? [loadBlockStyle(cssPath)] : [])]);
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

    return { loading, errors };
};
