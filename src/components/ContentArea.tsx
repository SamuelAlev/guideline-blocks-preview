import { NavLink } from 'react-router-dom';
import { Block } from './Block';

import { ViewEditToggle } from '.';
import { EXAMPLE_BLOCK_1, EXAMPLE_BLOCK_2, EXAMPLE_BLOCK_3, EXAMPLE_BLOCK_4 } from '../constants';
import { useBlockState } from '../states';

export const ContentArea = () => {
    const { data } = useBlockState();

    return (
        <>
            <div className="flex gap-4 items-center">
                <h1 className="text-lg font-mono font-bold">Block Rendering</h1>
                <ViewEditToggle />
            </div>

            {data?.jsPath ? (
                <Block js={data.jsPath} css={data.cssPath} />
            ) : (
                <div className="flex flex-col gap-4 pt-6">
                    <span>Add some block data and settings to have a preview.</span>
                    <div className="flex gap-4 overflow-x-auto">
                        <NavLink
                            to={EXAMPLE_BLOCK_1}
                            className="py-2 px-4 inline whitespace-nowrap rounded bg-[#424747] hover:bg-[#2d3232] text-white"
                            title="Go to example 1"
                        >
                            Example 1
                        </NavLink>
                        <NavLink
                            to={EXAMPLE_BLOCK_2}
                            className="py-2 px-4 inline whitespace-nowrap rounded bg-[#424747] hover:bg-[#2d3232] text-white"
                            title="Go to example 2"
                        >
                            Example 2
                        </NavLink>
                        <NavLink
                            to={EXAMPLE_BLOCK_3}
                            className="py-2 px-4 inline whitespace-nowrap rounded bg-[#424747] hover:bg-[#2d3232] text-white"
                            title="Go to example 3"
                        >
                            Example 3
                        </NavLink>
                        <NavLink
                            to={EXAMPLE_BLOCK_4}
                            className="py-2 px-4 inline whitespace-nowrap rounded bg-[#424747] hover:bg-[#2d3232] text-white"
                            title="Go to example 4"
                        >
                            Example 4
                        </NavLink>
                    </div>
                </div>
            )}
        </>
    );
};
