/*
  476 - Sum
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

  For example,

  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```

  > View on GitHub: https://tsch.js.org/476
*/

/* _____________ Your Code Here _____________ */

import type { Length } from '@easy/18-length-of-tuple';
import type { NumberLike, Range } from '@medium/2257-minus-one';
import type { Split } from '@hard/2822-split';
import type { Join } from '@medium/5310-join';

export type Addition<T extends any[], U extends any[] = []> = T extends [infer F, ...infer R]
    ? Addition<R, [...U, ...Range<F & NumberLike>]>
    : Split<Length<U>>;

type _StepSum<S extends any[], T extends any[], R> = Length<S> extends 0
    ? R extends '0'
        ? T
        : [R, ...T]
    : [...StepSum<S, [R]>, ...T];

export type StepSum<S1 extends any[], S2 extends any[], T extends any[] = [], R = '0'> = S1 extends [
    ...infer S1R,
    infer S1L
]
    ? S2 extends [...infer S2R, infer S2L]
        ? Addition<[S1L, S2L, R]> extends [infer D1, infer D2]
            ? StepSum<S1R, S2R, [D2, ...T], D1>
            : Addition<[S1L, S2L, R]> extends [infer D2]
            ? StepSum<S1R, S2R, [D2, ...T]>
            : never
        : _StepSum<S1, T, R>
    : _StepSum<S2, T, R>;

type Sum<D1 extends NumberLike, D2 extends NumberLike> = Join<StepSum<Split<D1>, Split<D2>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Sum<2, 3>, '5'>>,
    Expect<Equal<Sum<'13', '21'>, '34'>>,
    Expect<Equal<Sum<'328', 7>, '335'>>,
    Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
    Expect<Equal<Sum<9999, 1>, '10000'>>,
    Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
    Expect<Equal<Sum<728, 0>, '728'>>,
    Expect<Equal<Sum<'0', 213>, '213'>>,
    Expect<Equal<Sum<0, '0'>, '0'>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/476/answer
  > View solutions: https://tsch.js.org/476/solutions
  > More Challenges: https://tsch.js.org
*/
