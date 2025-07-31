import { useTheme } from '@/hooks';

export const ThemeComponent = () => {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme('dark')}>{theme}</button>;
};
