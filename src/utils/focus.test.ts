import { describe, it, expect } from 'vitest';
import { getFocusable } from './focus';

function el(html: string): HTMLElement {
  const root = document.createElement('div');
  root.innerHTML = html;
  return root;
}

describe('focus', () => {
  it('returns empty array for null root', () => {
    expect(getFocusable(null)).toEqual([]);
  });

  it('finds focusable elements in DOM order', () => {
    const root = el(`
      <div>
        <span>nope</span>
        <a id="a" href="#">link</a>
        <button id="button">btn</button>
        <input id="input" type="text" />
        <select id="select"><option>1</option></select>
        <textarea id="textarea"></textarea>
        <div id="div" tabindex="0">focusable div</div>
      </div>
    `);

    const res = getFocusable(root);
    expect(res.map((n) => n.id)).toEqual([
      'a',
      'button',
      'input',
      'select',
      'textarea',
      'div',
    ]);
  });

  it('excludes disabled elements, input[type=hidden], and tabindex="-1"', () => {
    const root = el(`
      <div>
        <button id="button" disabled>disabled</button>
        <input id="iHidden" type="hidden" />
        <div id="divNegative" tabindex="-1">negative tabindex</div>
        <div id="div" tabindex="0">focusable div</div>
        <input id="input" type="text" />
      </div>
    `);

    const res = getFocusable(root);
    expect(res.map((n) => n.id)).toEqual(['div', 'input']);
  });
});
