import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

type TextareaProps = {
    placeholder?: string;
    value: string;
    minRows?: number;
    onChange(value: string): void;
};

export const Textarea: FC<TextareaProps> = ({ placeholder, value, minRows = 10, onChange }) => {
    const [cursor, setCursor] = useState(0);
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const input: HTMLTextAreaElement | null = ref.current;
        if (input) {
            input.setSelectionRange(cursor, cursor);
        }
    }, [ref, cursor, value]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCursor(event.target.selectionStart);
        onChange?.(event.target.value);
    };

    return (
        <TextareaAutosize
            className="w-full resize-none p-2 rounded border-1 border-gray-4 hover:border-gray-8 focus:outline focus:outline-blue-4 focus:outline-offset-2 focus:outline-4 text-sm"
            ref={ref}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            minRows={minRows}
            draggable={false}
        />
    );
};
