import { useEffect, useState } from 'react';
import { base64ToBytes } from 'byte-base64';
import brotliPromise from 'brotli-wasm';

import { BlockData } from '../states';

type SearchParameters = {
    data: string;
    settings: string;
};

const SEARCH_PARAMETERS_KEYS: (keyof SearchParameters)[] = ['data', 'settings'];

export const useDecodeUrl = (searchParams: URLSearchParams) => {
    const [decodedSearchParams, setDecodedSearchParams] = useState<SearchParameters>({
        data: '',
        settings: '',
    });

    useEffect(() => {
        const decodeSearchParameters = async () => {
            const brotli = await brotliPromise;

            const textDecoder = new TextDecoder();

            for (const parameterKey of SEARCH_PARAMETERS_KEYS) {
                try {
                    const parameterValue = searchParams.get(parameterKey);

                    if (parameterValue) {
                        const decompressedData = brotli.decompress(base64ToBytes(parameterValue));
                        const decodedData = textDecoder.decode(decompressedData);

                        setDecodedSearchParams((previousState) => ({
                            ...previousState,
                            [parameterKey]: decodedData,
                        }));
                    } else {
                        setDecodedSearchParams((previousState) => ({
                            ...previousState,
                            [parameterKey]: '',
                        }));
                    }
                } catch {
                    setDecodedSearchParams((previousState) => ({
                        ...previousState,
                        [parameterKey]: `Can not decode the ${parameterKey} search parameter`,
                    }));
                }
            }
        };

        decodeSearchParameters();
    }, [searchParams]);

    return decodedSearchParams;
};
