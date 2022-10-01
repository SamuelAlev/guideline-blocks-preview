import { useCallback, useEffect, useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { base64ToBytes, bytesToBase64 } from 'byte-base64';
import brotliPromise from 'brotli-wasm';

import { Block } from './Block';
import { Textarea, ViewEditToggle } from './components';
import { getBlockIdFromJsPath } from './helpers';
import { useBlockState } from './states';
import { Header } from './Header';
import { Container } from './components/Container';
import { EXAMPLE_BLOCK_1 } from './constants';

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
        <div className="divide-y divide-[#f1f1f1] select-none">
            <Header />

            <div className="w-full flex justify-center">
                <Container>
                    <div className="pt-4 flex flex-col-reverse justify-end lg:flex-row lg:divide-x lg:divide-[#f1f1f1]">
                        <aside className="lg:w-4/12 xl:2/12 pt-4 pr-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-sm font-mono font-bold">Block Data</h1>
                                <Textarea
                                    minRows={5}
                                    value={data}
                                    onChange={(value) => computeHashAndSetUrl('data', value)}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <h1 className="text-sm font-mono font-bold">Block Settings</h1>
                                <Textarea
                                    value={settings}
                                    onChange={(value) => computeHashAndSetUrl('settings', value)}
                                />
                            </div>
                        </aside>
                        <main className="lg:w-8/12 xl:10/12 pt-4 pl-6 flex flex-col gap-4">
                            <div className="flex gap-4 items-center">
                                <h1 className="text-lg font-mono font-bold">Block Rendering</h1>
                                <ViewEditToggle />
                            </div>
                            {blockData?.files?.js ? (
                                <Block
                                    id={getBlockIdFromJsPath(blockData.files.js)}
                                    js={blockData.files.js}
                                    css={blockData.files.css}
                                />
                            ) : (
                                <div className="flex flex-col gap-8">
                                    <span>Add some block data to have a preview</span>
                                    <div>
                                        <NavLink
                                            to={EXAMPLE_BLOCK_1}
                                            className="p-2 items-center justify-center rounded bg-[#424747] hover:bg-[#2d3232] text-white"
                                            title="Go to example 1"
                                        >
                                            Example 1
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </Container>
            </div>
        </div>
    );
};
