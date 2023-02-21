/*
  2949 - ObjectFromEntries
  -------
  by jiangshan (@jiangshanmeta) #hard #object
  
  ### Question
  
  Implement the type version of ```Object.fromEntries```
  
  For example:
  
  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  
  type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];
  
  type result = ObjectFromEntries<ModelEntries> // expected to be Model
  ```
  
  > View on GitHub: https://tsch.js.org/2949
*/

/* _____________ Your Code Here _____________ */

type UnionToIntersection<T> = (T extends any ? (arg: T) => any : never) extends (arg: infer U) => any ? U : never;

type ObjectFromEntries<T extends [string, any]> = MergeInsertions<
    UnionToIntersection<T extends any ? Record<T[0], T[1]> : never>
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect, MergeInsertions } from '@type-challenges/utils';

interface Model {
    name: string;
    age: number;
    locations: string[] | null;
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

type cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2949/answer
  > View solutions: https://tsch.js.org/2949/solutions
  > More Challenges: https://tsch.js.org
*/
