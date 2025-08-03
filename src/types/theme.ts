export type ThemeOptions = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeOptions;
  setTheme: (theme: ThemeOptions) => void;
}
