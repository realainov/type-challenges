/*
  741 - Sort
  -------
  by Sg (@suica) #extreme #infer #array

  ### Question

  In this challenge, you are required to sort natural number arrays in either ascend order or descent order.

  Ascend order examples:
  ```ts
  Sort<[]> // []
  Sort<[1]> // [1]
  Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]> //  [2, 4, 5, 6, 6, 6, 7, 8, 9]
  ```

  The `Sort` type should also accept a boolean type. When it is `true`, the sorted result should be in descent order. Some examples:

  ```ts
  Sort<[3, 2, 1], true> // [3, 2, 1]
  Sort<[3, 2, 0, 1, 0, 0, 0], true> // [3, 2, 1, 0, 0, 0, 0]
  ```

  Extra challenges:
  1. Support natural numbers with 15+ digits.
  2. Support float numbers.

  > View on GitHub: https://tsch.js.org/741
*/

/* _____________ Your Code Here _____________ */

import { Reverse } from './3192-reverse';
import { UnionToTuple } from './730-union-to-tuple';

export type Range<T extends number, U, S extends any[] = []> = 0 extends 1
    ? never
    : S['length'] extends T
    ? S
    : Range<T, U, [...S, U]>;

type Count<T extends any[], U extends Record<number, any[]> = {}> = T extends [infer F, ...infer R]
    ? F extends keyof U
        ? U[F] extends any[]
            ? Count<R, Omit<U, F> & Record<F, [...U[F], 0]>>
            : never
        : Count<R, U & Record<F & number, [0]>>
    : MergeInsertions<U>;

type Fill<T extends any[], U extends Record<number, any[]>, S extends any[] = []> = T extends [infer F, ...infer R]
    ? F extends keyof U
        ? U[F] extends any[]
            ? Fill<R, U, [...S, ...Range<U[F]['length'], F>]>
            : never
        : never
    : S;

type _Sort<T extends number[], U extends boolean = false> = U extends false
    ? Reverse<UnionToTuple<T[number]>>
    : UnionToTuple<T[number]>;

type Sort<T extends number[], U extends boolean = false, S extends any[] = Fill<_Sort<T>, Count<T>>> = U extends true
    ? Reverse<S>
    : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect, MergeInsertions } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Sort<[]>, []>>,
    Expect<Equal<Sort<[1]>, [1]>>,
    Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
    Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
    Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
    Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
    Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
    Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
    Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
    Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
    Expect<Equal<Sort<[], true>, []>>,
    Expect<Equal<Sort<[1], true>, [1]>>,
    Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
    Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
    Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
    Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
    Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
    Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
    Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/741/answer
  > View solutions: https://tsch.js.org/741/solutions
  > More Challenges: https://tsch.js.org
*/
