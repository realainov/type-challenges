/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #medium #template-literal

  ### Question

  Compute the length of a string literal, which behaves like `String#length`.

  > View on GitHub: https://tsch.js.org/298
*/

/* _____________ Your Code Here _____________ */

import type { Split } from '@hard/2822 - Split';
import type { Length } from '@easy/18 - Length of Tuple';

type LengthOfString<S extends string> = Length<Split<S>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<LengthOfString<''>, 0>>,
    Expect<Equal<LengthOfString<'kumiko'>, 6>>,
    Expect<Equal<LengthOfString<'reina'>, 5>>,
    Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/298/answer
  > View solutions: https://tsch.js.org/298/solutions
  > More Challenges: https://tsch.js.org
*/
