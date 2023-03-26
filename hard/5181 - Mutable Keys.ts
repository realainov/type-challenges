/*
  5181 - Mutable Keys
  -------
  by Yugang Cao (@Talljack) #hard #utils
  
  ### Question
  
  Implement the advanced util type MutableKeys<T>, which picks all the mutable (not readonly) keys into a union.
  
  For example:
  
  ```ts
  type Keys = MutableKeys<{ readonly foo: string; bar: number }>;
  // expected to be “bar”
  ```
  
  > View on GitHub: https://tsch.js.org/5181
*/

/* _____________ Your Code Here _____________ */

type Mutable<T extends object> = { -readonly [K in keyof T]: T[K] };

type GetMutable<T extends object> = {
    [K in keyof T as Equal<Pick<T, K>, Mutable<Pick<T, K>>> extends true ? K : never]: T[K];
};

type MutableKeys<T extends object> = keyof GetMutable<T>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, 'a'>>,
    Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, 'a'>>,
    Expect<Equal<MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
    Expect<Equal<MutableKeys<{}>, never>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5181/answer
  > View solutions: https://tsch.js.org/5181/solutions
  > More Challenges: https://tsch.js.org
*/
