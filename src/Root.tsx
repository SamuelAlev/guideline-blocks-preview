import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { base64ToBytes, bytesToBase64 } from 'byte-base64';
import brotliPromise from 'brotli-wasm';

import { Block } from './Block';
import { Textarea, ViewEditToggle } from './components';
import { getBlockIdFromJsPath } from './helpers';
import { useBlockState } from './states';

export const Root = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { settings, setSettings, data, setData } = useBlockState();

    const blockData = useMemo(() => {
        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    }, [data]);

    useEffect(() => {
        const decodeFromSearchParams = async (key: string) => {
            const brotli = await brotliPromise;

            const textDecoder = new TextDecoder();

            const parameterValue = searchParams.get(key);
            try {
                if (parameterValue) {
                    const decompressedData = brotli.decompress(base64ToBytes(parameterValue));
                    const decodedData = textDecoder.decode(decompressedData);

                    return decodedData;
                } else {
                    return '';
                }
            } catch {
                return 'Can not decode';
            }
        };

        const decodeAndSetData = async () => {
            setData(await decodeFromSearchParams('data'));
        };

        const decodeAndSetSettings = async () => {
            setSettings(await decodeFromSearchParams('settings'));
        };

        decodeAndSetData();
        decodeAndSetSettings();
    }, [searchParams, setData, setSettings]);

    const computeHashAndSetUrl = useCallback(
        async (key: string, value: string) => {
            const brotli = await brotliPromise;

            const textEncoder = new TextEncoder();

            const uncompressedData = textEncoder.encode(value);
            const compressedData = brotli.compress(uncompressedData);

            const b64encoded = bytesToBase64(compressedData);

            const url = new URL(window.location.href);
            url.searchParams.set(key, b64encoded);

            setSearchParams(url.searchParams, { replace: true });
        },
        [setSearchParams],
    );

    return (
        <div className="font-sans box-border w-full min-h-screen h-full flex flex-col-reverse justify-end lg:flex-row divide-x divide-gray select-none">
            <aside className="lg:w-4/12 xl:2/12 p-4 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl">Block Data</h1>
                    <Textarea minRows={5} value={data} onChange={(value) => computeHashAndSetUrl('data', value)} />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl">Block Settings</h1>
                    <Textarea value={settings} onChange={(value) => computeHashAndSetUrl('settings', value)} />
                </div>
            </aside>
            <main className="lg:w-8/12 xl:10/12 p-4 flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <h1 className="text-2xl">Block Rendering</h1>
                    <ViewEditToggle />
                </div>
                <div className="h-full rounded border-1 border-gray-4 p-4">
                    {blockData?.files?.js && (
                        <Block
                            id={getBlockIdFromJsPath(blockData.files.js)}
                            js={blockData.files.js}
                            css={blockData.files.css}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};
