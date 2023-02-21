/*
  57 - Get Required
  -------
  by Zheeeng (@zheeeng) #hard #utils #infer
  
  ### Question
  
  Implement the advanced util type `GetRequired<T>`, which remains all the required fields
  
  For example
  
  ```ts
  type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
  ```
  
  > View on GitHub: https://tsch.js.org/57
*/

/* _____________ Your Code Here _____________ */

export type GetRequired<T extends object> = {
    [K in keyof T as Equal<Pick<T, K>, Required<Pick<T, K>>> extends true ? K : never]: T[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
    Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/57/answer
    > View solutions: https://tsch.js.org/57/solutions
    > More Challenges: https://tsch.js.org
  */
