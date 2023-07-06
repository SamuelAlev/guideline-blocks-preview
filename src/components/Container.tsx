import { FC, ReactNode } from 'react';

export const Container: FC<{ children: ReactNode }> = ({ children }) => (
    <div className="max-w-[1400px] w-full">{children}</div>
);
