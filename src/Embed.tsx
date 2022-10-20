import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ContentArea, ViewEditToggle } from './components';
import { useDecodeUrl } from './hooks';
import { useBlockState } from './states';

export const Embed = () => {
    const { setSettings, setData } = useBlockState();

    const [searchParams] = useSearchParams();
    const { data, settings } = useDecodeUrl(searchParams);
    useEffect(() => {
        try {
            setData(JSON.parse(data || '{}'));
        } catch {}
    }, [data, setData]);
    useEffect(() => setSettings(settings), [settings, setSettings]);

    return (
        <div className="h-screen select-none flex flex-col">
            {!searchParams.has('readonly') && (
                <div className="flex gap-4 items-center p-2 mb-2 border-b-1 border-b-[#f1f1f1]">
                    <ViewEditToggle />
                </div>
            )}

            <div className="p-2">
                <ContentArea />
            </div>
        </div>
    );
};
