import { useTheme } from '@/hooks';

export const DarkThemeComponent = () => {
  const { theme } = useTheme();
  return <div>Current theme: {theme}</div>;
};
