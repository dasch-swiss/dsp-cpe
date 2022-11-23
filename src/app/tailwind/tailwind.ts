`
This code is a derivate from https://github.com/thien-do/typed.tw
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`
export const Tw = (): Tailwind => new Tailwind();

export class Tailwind {
  twClass = ''; // the resulting TW class
  isConditional = false; // used to concatenate a class string conditionally with no space as delimiter

  // single TW classes
  private _tw_block = 'tw-block';
  private _inline_flex = 'inline-flex';
  private _items_center = 'items-center';
  private _rounded_md = 'rounded-md';
  private _bg_indigo_400 = 'bg-indigo-400';
  private _bg_indigo_700 = 'bg-indigo-700';

  // conditional TW classes hover:bg-indigo-700
  private _focus = "focus:";
  private _hover = 'hover:';

  // Getter methods
  // Why "$":
  // - https://github.com/microsoft/TypeScript/issues/2361
  // - https://github.com/microsoft/TypeScript/issues/4538
  // - https://en.wikipedia.org/wiki/Regular_expression
  $(): string { return this.twClass; }
  [Symbol.toPrimitive](): string { return this.$(); }

  // Getters for tWClasses
  get tw_block() { return this.add(this._tw_block); }
  get inline_flex() { return this.add(this._inline_flex);}
  get items_center() { return this.add(this._items_center);}
  get rounded_md() { return this.add(this._rounded_md);}
  get bg_indigo_400() { return this.add(this._bg_indigo_400);}
  get bg_indigo_700() { return this.add(this._bg_indigo_700);}


  // Getters for conditional tw classes
  get focus() { return this.addConditional(this._focus); }
  get hover() { return this.addConditional(this._hover); }


  // Concatenates class strings and returns this
  private add(value: string): Tailwind {
    const delimiter = this.isConditional ? '' : ' '
    this.twClass = `${this.twClass}${delimiter}${value}`;
    this.isConditional = false; // reset to false
    return this;
  }

  // Concatenates class strings and sets this._isConditional
  private addConditional(value: string): Tailwind {
    this.twClass = `${this.twClass} ${value}`;
    this.isConditional = true;
    return this;
  }
}
