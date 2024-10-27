'use client';
import { useTheme } from 'next-themes';
import SimpleBar from '@/component/ui/simplebar';
import { useColorPresetName } from '@/hooks/use-theme-color';
import LayoutSwitcher from '@/component/settings/layout-switcher';
import ColorOptions from '@/component/settings/color-options';
import AppDirection from '@/component/settings/app-direction';
import ThemeSwitcher from '@/component/settings/theme-switcher';

export default function SettingsDrawer() {
  return (
    <>
      <SimpleBar className="h-[calc(100%-138px)]">
        <div className="px-5 py-6">
          <ThemeSwitcher />
          <AppDirection />
          <LayoutSwitcher />
          <ColorOptions />
        </div>
      </SimpleBar>
    </>
  );
}
