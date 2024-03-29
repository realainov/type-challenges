/*
  2822 - Split
  -------
  by Andrea Simone Costa (@jfet97) #hard #string #split #array #tuple

  ### Question

  The well known `split()` method splits a string into an array of substrings by looking for a separator, and returns the new array. The goal of this challenge is to split a string, by using a separator, but in the type system!

  For example:

  ```ts
  type result = Split<'Hi! How are you?', ' '>  // should be ['Hi!', 'How', 'are', 'you?']
  ```

  > View on GitHub: https://tsch.js.org/2822
*/

/* _____________ Your Code Here _____________ */

export type StringLike = string | number | bigint | boolean | null | undefined;

export type Split<T extends StringLike, U extends StringLike = ''> = string extends T
    ? string[]
    : T extends any
    ? `${T}` extends `${infer A}${U}${infer B}`
        ? [A, ...Split<B, U>]
        : Equal<T, U> extends true
        ? []
        : [T]
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
    Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
    Expect<
        Equal<
            Split<'Hi! How are you?', ''>,
            ['H', 'i', '!', ' ', 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']
        >
    >,
    Expect<Equal<Split<'', ''>, []>>,
    Expect<Equal<Split<'', 'z'>, ['']>>,
    Expect<Equal<Split<string, 'whatever'>, string[]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2822/answer
  > View solutions: https://tsch.js.org/2822/solutions
  > More Challenges: https://tsch.js.org
*/
