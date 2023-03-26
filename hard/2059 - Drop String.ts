/*
  2059 - Drop String
  -------
  by CaptainOfPhB (@CaptainOfPhB) #hard #template-literal #infer

  ### Question

  Drop the specified chars from a string.

  For example:

  ```ts
  type Butterfly = DropString<'foobar!', 'fb'> // 'ooar!'
  ```

  > View on GitHub: https://tsch.js.org/2059
*/

/* _____________ Your Code Here _____________ */

import type { Split } from './2822 - Split';
import type { Join } from '@medium/5310 - Join';

type Filter<T extends any[], U, S extends any[] = []> = T extends [infer F, ...infer R]
    ? Filter<R, U, F extends U ? S : [...S, F]>
    : S;

type DropString<T extends string, U extends string, S extends any[] = Split<U>> = Join<Filter<Split<T>, S[number]>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
    Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
    Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
    Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
    Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
    Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
    Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
    Expect<Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>>,
    Expect<Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
    Expect<Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2059/answer
  > View solutions: https://tsch.js.org/2059/solutions
  > More Challenges: https://tsch.js.org
*/
