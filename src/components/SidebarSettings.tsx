import { Accordion, AccordionItem, Breadcrumbs, FieldsetHeaderType } from '@frontify/fondue';
import { FC } from 'react';

import { useBlockState } from '../states';
import { SettingBlock } from './SettingBlock';

const getSectionNames = (settingsStructure: Record<string, unknown>) => Object.keys(settingsStructure);
const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

type SidebarSettingsProps = {
    onChange(value: string): void;
};

export const SidebarSettings: FC<SidebarSettingsProps> = ({}) => {
    const { settingsStructure } = useBlockState();

    return (
        <div className="w-full flex flex-col border-x border-x-[#f1f1f1]">
            <div className="flex">
                <Breadcrumbs items={[]} />
            </div>

            <Accordion>
                {getSectionNames(settingsStructure)?.map((sidebarSection, index) => (
                    <AccordionItem
                        key={sidebarSection}
                        header={{
                            children: capitalize(sidebarSection),
                            active: index === 0,
                        }}
                    >
                        <div className="tw-space-y-5" data-test-id="settings-sidebar-section">
                            {(settingsStructure?.[sidebarSection] as any)?.map((block: any) => (
                                <SettingBlock key={block.id} block={block} />
                            ))}
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};
