export function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];

  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(selectors));
  return nodes.filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  );
}
