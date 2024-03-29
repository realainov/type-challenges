/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #extreme #template-literal #math

  ### Question

  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.

  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**

  > View on GitHub: https://tsch.js.org/274
*/

/* _____________ Your Code Here _____________ */

import type { Range, NumberLike } from '@medium/2257 - MinusOne';
import type { Split } from '@hard/2822 - Split';
import type { Absolute } from '@medium/529 - Absolute';
import type { Length } from '@easy/18 - Length of Tuple';

enum Comparison {
    Greater,
    Equal,
    Lower,
}

type IsNegative<T extends NumberLike> = `${T}` extends `-${number}` ? true : false;

type Greater<T extends NumberLike, U extends NumberLike> = Equal<T, U> extends true
    ? Comparison.Equal
    : Range<T> extends [...Range<U>, ...infer R]
    ? R extends []
        ? Comparison.Lower
        : Comparison.Greater
    : Comparison.Lower;

type StepComparison<T extends string[], U extends string[]> = {
    [K in keyof T]: Greater<T[K], U[K & keyof U]>;
};

type StepComparisonResult<T extends Comparison[]> = T extends [infer F, ...infer R]
    ? F extends Comparison.Greater
        ? Comparison.Greater
        : F extends Comparison.Lower
        ? Comparison.Lower
        : R extends Comparison[]
        ? StepComparisonResult<R>
        : never
    : Comparison.Equal;

type PositiveComparison<
    T extends NumberLike,
    U extends NumberLike,
    TS extends string[] = Split<T>,
    US extends string[] = Split<U>
> = Greater<Length<TS>, Length<US>> extends Comparison.Greater | Comparison.Lower
    ? Greater<Length<TS>, Length<US>>
    : StepComparisonResult<StepComparison<TS, US>>;

type Comparator<T extends NumberLike, U extends NumberLike> = [true, false] extends [IsNegative<T>, IsNegative<U>]
    ? Comparison.Lower
    : [false, true] extends [IsNegative<T>, IsNegative<U>]
    ? Comparison.Greater
    : [false, false] extends [IsNegative<T>, IsNegative<U>]
    ? PositiveComparison<T, U>
    : PositiveComparison<Absolute<U>, Absolute<T>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
    Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
    Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
    Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
    Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
    Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
    Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
    Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
    Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
    Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
    Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
    Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
    Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
    Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

    Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
    Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
    Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
    Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
    Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
    Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

    // Extra tests if you like to challenge yourself!
    Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
    Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
    Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
    Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
    Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
    Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/274/answer
  > View solutions: https://tsch.js.org/274/solutions
  > More Challenges: https://tsch.js.org
*/
