import { RefObject, useCallback, useEffect, useState } from 'react';

export const useScrollWrapper = (scrollingContainer: RefObject<HTMLElement>) => {
    const [scrollDimensions, setScrollDimensions] = useState({ top: 0, height: Infinity, width: Infinity, left: 0 });

    const getScrollDimensions = useCallback(
        (HTMLElement: Element) => ({
            top: Math.ceil(HTMLElement.scrollTop),
            height: HTMLElement.scrollHeight,
            left: Math.ceil(HTMLElement.scrollLeft),
            width: HTMLElement.scrollWidth,
        }),
        [],
    );

    useEffect(() => {
        const elementToTrack = scrollingContainer.current;

        const updateDimensionsFromRef = (element: Element) => {
            const dimensions = getScrollDimensions(element);
            setScrollDimensions(dimensions);
        };

        if (elementToTrack) {
            updateDimensionsFromRef(elementToTrack);
            elementToTrack.addEventListener('scroll', (event) => updateDimensionsFromRef(event.target as Element));
        }

        window.addEventListener('resize', (event) => updateDimensionsFromRef(event.target as Element));

        return () => {
            elementToTrack?.removeEventListener('resize', (event) => updateDimensionsFromRef(event.target as Element));
            window.removeEventListener('resize', (event) => updateDimensionsFromRef(event.target as Element));
        };
    }, [getScrollDimensions, scrollingContainer]);

    const { top, height, left, width } = scrollDimensions;

    const currentHeight = scrollingContainer.current?.clientHeight ?? 0;
    const showTopShadow = height > 0 && top !== 0;
    const showBottomShadow = height !== 0 && top < height - currentHeight;
    const currentWidth = scrollingContainer.current?.clientWidth ?? 0;
    const showLeftShadow = width > 0 && left !== 0;
    const showRightShadow = width !== 0 && left < width - currentWidth;

    return {
        showTopShadow,
        showBottomShadow,
        showLeftShadow,
        showRightShadow,
    };
};
