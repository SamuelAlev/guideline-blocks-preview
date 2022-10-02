import { FC } from 'react';

type SettingBlockProps = {
    block: any;
};

export const SettingBlock: FC<SettingBlockProps> = ({ block }) => {
    return (
        <span className="font-mono text-sm w-full flex overflow-x-auto whitespace-nowrap h-10">
            {JSON.stringify(block)}
        </span>
    );
};
