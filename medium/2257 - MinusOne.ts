/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

import type { Length } from '@easy/18 - Length of Tuple';

export type NumberLike = number | string | bigint;

export type Range<T extends NumberLike, U extends any[] = [], S = Length<U>> = 0 extends 1
    ? never
    : `${Length<U>}` extends `${T}`
    ? U
    : Range<T, [...U, S], S>;

type MinusOne<T extends number> = Range<T> extends [any, ...infer R] ? Length<R> : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<MinusOne<1>, 0>>,
    Expect<Equal<MinusOne<55>, 54>>,
    Expect<Equal<MinusOne<3>, 2>>,
    Expect<Equal<MinusOne<100>, 99>>,
    Expect<Equal<MinusOne<1101>, 1100>>,
    Expect<Equal<MinusOne<0>, -1>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
