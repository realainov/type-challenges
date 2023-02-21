/*
  13580 - Replace Union
  -------
  by Konstantin Barabanov (@crutch12) #hard

  ### Question

  Given an `union of types` and `array of type pairs` to replace (`[[string, number], [Date, null]]`), return a new union replaced with the `type pairs`.

  > View on GitHub: https://tsch.js.org/13580
*/

/* _____________ Your Code Here _____________ */

type UnionReplace<T, U extends [any, any][]> = U extends [infer F, ...infer R]
    ? F extends [any, any]
        ? R extends [any, any][]
            ? UnionReplace<Exclude<T, F[0]> | F[1], R>
            : never
        : never
    : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    // string -> null
    Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

    // Date -> string; Function -> undefined
    Expect<
        Equal<
            UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>,
            undefined | string | object
        >
    >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/13580/answer
  > View solutions: https://tsch.js.org/13580/solutions
  > More Challenges: https://tsch.js.org
*/
