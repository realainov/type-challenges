/*
  19458 - SnakeCase
  -------
  by Gabriel Vergnaud (@gvergnaud) #hard #template-literal #string

  ### Question

  Create a `SnakeCase<T>` generic that turns a string formatted in **camelCase** into a string formatted in **snake_case**.

  A few examples:

  ```ts
  type res1 = SnakeCase<"hello">; // => "hello"
  type res2 = SnakeCase<"userName">; // => "user_name"
  type res3 = SnakeCase<"getElementById">; // => "get_element_by_id"
  ```

  > View on GitHub: https://tsch.js.org/19458
*/

/* _____________ Your Code Here _____________ */

import { Split } from './2822-split';

type SnakeCase<T extends string, U extends string = '', S extends any[] = Split<T>> = S extends [infer F, ...infer R]
    ? SnakeCase<T, `${U}${Equal<F, Uppercase<F & string>> extends true ? `_${Lowercase<F & string>}` : F & string}`, R>
    : U;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
    Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
    Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
    Expect<
        Equal<
            SnakeCase<'getElementById' | 'getElementByClassNames'>,
            'get_element_by_id' | 'get_element_by_class_names'
        >
    >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/19458/answer
  > View solutions: https://tsch.js.org/19458/solutions
  > More Challenges: https://tsch.js.org
*/
