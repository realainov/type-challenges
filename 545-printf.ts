/*
  545 - printf
  -------
  by null (@Bestmain-YS) #hard #template-literal
  
  ### Question
  
  Implement `Format<T extends string>` generic.
  
  For example,
  
  ```ts
  type FormatCase1 = Format<"%sabc"> // FormatCase1 : string => string
  type FormatCase2 = Format<"%s%dabc"> // FormatCase2 : string => number => string
  type FormatCase3 = Format<"sdabc"> // FormatCase3 :  string
  type FormatCase4 = Format<"sd%abc"> // FormatCase4 :  string
  ```
  
  > View on GitHub: https://tsch.js.org/545
*/

/* _____________ Your Code Here _____________ */

type ControlsMap = {
    s: string;
    d: number;
};

type Control<T, U extends string[]> = T extends keyof ControlsMap ? [...U, ControlsMap[T]] : U;

type ParsePrintFormat<
    T extends string,
    U extends string[] = [],
    E extends boolean = true
> = T extends `${infer F}${infer R}`
    ? F extends '%'
        ? ParsePrintFormat<R, U, E extends true ? false : true>
        : ParsePrintFormat<R, E extends true ? U : Control<F, U>>
    : U;

type Format<T extends string, U extends any[] = ParsePrintFormat<T>, S = string> = U extends [...infer R, infer L]
    ? Format<T, R, (arg: L) => S>
    : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Format<'abc'>, string>>,
    Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
    Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
    Expect<Equal<Format<'a%%dbc'>, string>>,
    Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
    Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/545/answer
    > View solutions: https://tsch.js.org/545/solutions
    > More Challenges: https://tsch.js.org
  */
