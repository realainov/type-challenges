/*
  517 - Multiply
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  **This challenge continues from [476 - Sum](https://tsch.js.org/476), it is recommended that you finish that one first, and modify your code based on it to start this challenge.**

  Implement a type `Multiply<A, B>` that multiplies two non-negative integers and returns their product as a string. Numbers can be specified as string, number, or bigint.

  For example,

  ```ts
  type T0 = Multiply<2, 3> // '6'
  type T1 = Multiply<3, '5'> // '15'
  type T2 = Multiply<'4', 10> // '40'
  type T3 = Multiply<0, 16> // '0'
  type T4 = Multiply<'13', '21'> // '273'
  type T5 = Multiply<'43423', 321543n> // '13962361689'
  ```

  > View on GitHub: https://tsch.js.org/517
*/

/* _____________ Your Code Here _____________ */

import type { Split } from './2822-split';
import type { Addition, StepSum } from './476-sum';
import type { Join } from './5310-join';
import type { Range, NumberLike } from './2257-minus-one';
import type { Length } from './18-length-of-tuple';

type Multiplication<
    D1 extends NumberLike,
    D2 extends NumberLike,
    T extends any[] = [],
    S extends any[] = []
> = `${Length<S>}` extends `${D2}` ? Length<T> : Multiplication<D1, D2, [...T, ...Range<D1>], [...S, 0]>;

type _StepMultiplication<S extends any[], D extends NumberLike, T extends any[] = [], R = '0'> = S extends [
    ...infer SR,
    infer SL
]
    ? Addition<[Multiplication<SL & NumberLike, D>, R]> extends [infer D1, infer D2]
        ? _StepMultiplication<SR, D, [D2, ...T], D1>
        : Addition<[Multiplication<SL & NumberLike, D>, R]> extends [infer D2]
        ? _StepMultiplication<SR, D, [D2, ...T]>
        : never
    : R extends '0'
    ? T
    : [R, ...T];

type StepMultiplication<S1 extends any[], S2 extends any[], T extends any[] = [], U extends any[] = []> = S2 extends [
    ...infer S2R,
    infer S2L
]
    ? StepMultiplication<S1, S2R, StepSum<[..._StepMultiplication<S1, S2L & NumberLike>, ...U], T>, [...U, 0]>
    : T;

type Multiply<T extends NumberLike, U extends NumberLike> = '0' extends `${T | U}`
    ? '0'
    : Join<StepMultiplication<Split<T>, Split<U>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Multiply<2, 3>, '6'>>,
    Expect<Equal<Multiply<3, '5'>, '15'>>,
    Expect<Equal<Multiply<'4', 10>, '40'>>,
    Expect<Equal<Multiply<0, 16>, '0'>>,
    Expect<Equal<Multiply<'13', '21'>, '273'>>,
    Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
    Expect<Equal<Multiply<9999, 1>, '9999'>>,
    Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
    Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
    Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
    Expect<Equal<Multiply<9, 99>, '891'>>,
    Expect<Equal<Multiply<315, '100'>, '31500'>>,
    Expect<Equal<Multiply<11n, 13n>, '143'>>,
    Expect<Equal<Multiply<728, 0>, '0'>>,
    Expect<Equal<Multiply<'0', 213>, '0'>>,
    Expect<Equal<Multiply<0, '0'>, '0'>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/517/answer
  > View solutions: https://tsch.js.org/517/solutions
  > More Challenges: https://tsch.js.org
*/
