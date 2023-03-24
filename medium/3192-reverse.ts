/*
  3192 - Reverse
  -------
  by jiangshan (@jiangshanmeta) #medium #tuple
  
  ### Question
  
  Implement the type version of ```Array.reverse```
  
  For example:
  
  ```typescript
  type a = Reverse<['a', 'b']> // ['b', 'a']
  type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
  ```
  
  > View on GitHub: https://tsch.js.org/3192
*/

/* _____________ Your Code Here _____________ */

export type Reverse<T extends any[], U extends any[] = []> = T extends [infer F, ...infer R]
    ? Reverse<R, [F, ...U]>
    : U;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Reverse<[]>, []>>,
    Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
    Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>
];

type errors = [
    // @ts-expect-error
    Reverse<'string'>,
    // @ts-expect-error
    Reverse<{ key: 'value' }>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3192/answer
  > View solutions: https://tsch.js.org/3192/solutions
  > More Challenges: https://tsch.js.org
*/
