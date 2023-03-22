/*
  216 - Slice
  -------
  by Anthony Fu (@antfu) #extreme #array

  ### Question

  Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the three argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.

  For example

  ```ts
  type Arr = [1, 2, 3, 4, 5]
  type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
  ```

  > View on GitHub: https://tsch.js.org/216
*/

/* _____________ Your Code Here _____________ */

import type { Range } from './2257-minus-one';
import type { FilterOut } from './399-tuple-filter';
import type { NumberRange } from './8640-number-range';

type Subtract<T extends string | number, U extends string | number> = Range<T> extends [...Range<U>, ...infer R]
    ? R['length']
    : never;

type SliceIndex<T extends number, L extends number> = `${T}` extends `-${infer U}` ? Subtract<L, U> : T;

type SliceDiapason<S extends number, E extends number, L extends number> = Exclude<
    NumberRange<SliceIndex<S, L>, SliceIndex<E, L>>,
    SliceIndex<E, L>
>;

export type Slice<T extends any[], S extends number = 0, E extends number = T['length']> = FilterOut<
    { [K in keyof T]: K extends `${SliceDiapason<S, E, T['length']>}` ? T[K] : never },
    never
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Arr = [1, 2, 3, 4, 5];

type cases = [
    // basic
    Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
    Expect<Equal<Slice<Arr, 0, 0>, []>>,
    Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

    // optional args
    Expect<Equal<Slice<[]>, []>>,
    Expect<Equal<Slice<Arr>, Arr>>,
    Expect<Equal<Slice<Arr, 0>, Arr>>,
    Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

    // negative index
    Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
    Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

    // invalid
    Expect<Equal<Slice<Arr, 10>, []>>,
    Expect<Equal<Slice<Arr, 1, 0>, []>>,
    Expect<Equal<Slice<Arr, 10, 20>, []>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/216/answer
  > View solutions: https://tsch.js.org/216/solutions
  > More Challenges: https://tsch.js.org
*/
