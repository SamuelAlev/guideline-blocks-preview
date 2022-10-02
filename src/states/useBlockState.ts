import create from 'zustand';

export type BlockData = {
    jsPath: string;
    cssPath: string;
};

type BlockState = {
    isEditing: boolean;
    setIsEditing(value: boolean): void;
    settings: string;
    setSettings(newSettings: string): void;
    // settingsStructure: BlockSettings;
    settingsStructure: Record<string, unknown>;
    setSettingsStructure(newSettingsStructure: Record<string, unknown>): void;
    data: BlockData;
    setData(value: Partial<BlockData>): void;
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
    settingsStructure: {},
    setSettingsStructure(value) {
        set(() => ({ settingsStructure: value }));
    },
    data: {
        jsPath: '',
        cssPath: '',
    },
    setData(value) {
        set((state) => ({ data: { ...state.data, ...value } }));
    },
}));
