import create from 'zustand';

type BlockState = {
    isEditing: boolean;
    setIsEditing(value: boolean): void;
    settings: string;
    setSettings(newSettings: string): void;
    data: string;
    setData(value: string): void;
};

export const useBlockState = create<BlockState>()((set) => ({
    isEditing: false,
    setIsEditing(value) {
        set(() => ({ isEditing: value }));
    },
    settings: '{}',
    setSettings(value) {
        set(() => ({ settings: value }));
    },
    data: '{}',
    setData(value) {
        set(() => ({ data: value }));
    },
}));
