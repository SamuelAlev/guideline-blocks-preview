import { useEffect } from 'react';
import { NavLink, useLoaderData, useSearchParams } from 'react-router-dom';

import { ContentArea } from './components/ContentArea';
import { Sidebar } from './components/Sidebar';
import { ViewEditToggle } from './components/ViewEditToggle';
import { AppCustomFields, AppState, appBridgeModeToLabel, useAppStore } from './states/useAppState';
import { type LoaderData, type rootLoader } from './helpers/loader';
import { compressBrotliData } from './utils/brotli';

export const Root = () => {
    const { setState, setCustomFields, customFields } = useAppStore();

    const decodedSearchParameters = useLoaderData() as LoaderData<typeof rootLoader>;
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (decodedSearchParameters.customFields) {
            setCustomFields(decodedSearchParameters.customFields);
        }

        if (decodedSearchParameters.state) {
            setState(decodedSearchParameters.state);
        }
    }, [decodedSearchParameters, setCustomFields, setState]);

    const handleCustomFieldsChange = async (newCustomFields: AppCustomFields) => {
        const url = new URL(window.location.href);

        setCustomFields(newCustomFields);
        url.searchParams.set('customFields', await compressBrotliData(JSON.stringify(newCustomFields)));

        setSearchParams(url.searchParams);
    };

    const handleStateChange = async (newState: AppState) => {
        const url = new URL(window.location.href);

        setState(newState);
        url.searchParams.set('state', await compressBrotliData(JSON.stringify(newState)));

        setSearchParams(url.searchParams);
    };

    return (
        <div className="select-none w-full h-[100dvh] w-full grid grid-cols-1 lg:grid-cols-4 lg:divide-x lg:divide-[#f1f1f1]">
            <aside className="flex p-10 overflow-y-auto">
                <Sidebar onCustomFieldsChange={handleCustomFieldsChange} onStateChange={handleStateChange} />
            </aside>

            <main className="p-10 flex flex-col gap-4 col-span-3">
                <div className="flex items-center">
                    <h1 className="text-lg font-mono font-bold mr-4">{appBridgeModeToLabel[customFields.appBridgeMode]} Preview</h1>

                    <ViewEditToggle />

                    <NavLink to={`/v1/embed?${searchParams.toString()}`} title="Open app embed" className="ml-2 p-2 flex items-center justify-center rounded hover:bg-[#eaebeb]">
                        <div className="i-octicon-link-external-16" />
                    </NavLink>
                </div>

                <ContentArea />
            </main>
        </div>
    );
};
