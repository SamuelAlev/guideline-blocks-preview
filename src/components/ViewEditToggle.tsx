import { useEffect } from 'react';
import { useBlockState } from '../states/useBlockState';
import { merge } from '../utils';

export const ViewEditToggle = () => {
    const { isEditing, setIsEditing } = useBlockState();

    useEffect(() => {
        document.body.classList[isEditing ? 'add' : 'remove']('editor-enabled');
    }, [isEditing]);

    return (
        <div className="flex gap-2 items-center justify-center">
            <button
                className={merge([
                    'p-2 flex items-center justify-center rounded',
                    !isEditing ? 'bg-[#424747] text-white' : 'hover:bg-[#eaebeb]',
                ])}
                onClick={() => setIsEditing(false)}
            >
                <div className="i-tabler-eye" />
            </button>
            <button
                className={merge([
                    'p-2 flex items-center justify-center rounded',
                    isEditing ? 'bg-[#424747] text-white' : 'hover:bg-[#eaebeb]',
                ])}
                onClick={() => setIsEditing(true)}
            >
                <div className="i-tabler-pencil" />
            </button>
        </div>
    );
};
