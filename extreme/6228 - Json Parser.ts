/*
  6228 - JSON Parser
  -------
  by Hydration (@hydrati) #extreme #template-literal #json

  ### Question

  You're required to implement a type-level partly parser to parse JSON string into a object literal type.

  Requirements:
   - `Numbers` and `Unicode escape (\uxxxx)` in JSON can be ignored. You needn't to parse them.

  > View on GitHub: https://tsch.js.org/6228
*/

/* _____________ Your Code Here _____________ */

import type { Trim } from '@medium/108 - Trim';
import type { ReplaceAll } from '@medium/119 - ReplaceAll';
import type { Pop } from '@medium/16 - Pop';
import type { First } from '@medium/1978 - Percentage Parser';
import type { ObjectFromEntries } from '@hard/2949 - ObjectFromEntries';

type ValueMap = { null: null; undefined: undefined; true: true; false: false };

type BraceMap = { '{': '}'; '[': ']' };

type Interpolations = [['\\r', '\r'], ['\\n', '\n'], ['\\b', '\b'], ['\\f', '\f']];

type ReplaceInterpolation<T extends string, U extends Partial<Interpolations> = Interpolations> = U extends [
    ...infer R extends Partial<Interpolations>,
    [infer S extends string, infer E extends string]
]
    ? ReplaceInterpolation<ReplaceAll<T, S, E>, R>
    : T;

type FindValue<T extends string, U extends string = Trim<T>> = U extends `${keyof ValueMap}${infer R}`
    ? [U extends `${infer F}${R}` ? F : never, R]
    : U extends `"${infer F}"${infer R}`
    ? [`"${F}"`, R]
    : FindObject<U>;

type FindObject<
    T extends string,
    B extends string = First<T>,
    U extends string = '',
    S extends 0[] = []
> = B extends keyof BraceMap
    ? [U, S] extends ['', []] | [string, [any, ...any[]]]
        ? T extends `${infer F}${infer R}`
            ? FindObject<R, B, `${U}${F}`, F extends B ? [...S, 0] : F extends BraceMap[B] ? Pop<S> : S>
            : [never]
        : [U, T]
    : [never];

type ParseObjectValues<T extends string, U extends [any, any] = never> = FindValue<T> extends [
    infer K extends `"${string}"`,
    `: ${infer R}`
]
    ? FindValue<R> extends [infer V extends string, `,${infer L}`]
        ? ParseObjectValues<L, U | [Parse<K>, Parse<V>]>
        : FindValue<R> extends [infer V extends string, '']
        ? ObjectFromEntries<U | [Parse<K>, Parse<V>]>
        : never
    : never;

type ParseObject<T extends string> = Trim<T> extends `{${infer M}}`
    ? M extends ''
        ? {}
        : ParseObjectValues<Trim<M>>
    : never;

type ParseArrayValues<T extends string, U extends any[] = []> = FindValue<T> extends [
    infer V extends string,
    `, ${infer R}`
]
    ? ParseArrayValues<R, [...U, Parse<V>]>
    : FindValue<T> extends [infer V extends string, '']
    ? [...U, Parse<V>]
    : never;

type ParseArray<T extends string> = Trim<T> extends `[${infer M}]`
    ? M extends ''
        ? []
        : ParseArrayValues<Trim<M>>
    : never;

type Parse<T extends string, U extends string = Trim<T>> = U extends keyof ValueMap
    ? ValueMap[U]
    : U extends `[${string}]`
    ? ParseArray<U>
    : U extends `{${string}}`
    ? ParseObject<U>
    : U extends `"${infer M}"`
    ? ReplaceInterpolation<M>
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<
        Equal<
            Parse<`
      {
        "a": "b", 
        "b": false, 
        "c": [true, false, "hello", {
          "a": "b", 
          "b": false
        }], 
        "nil": null
      }
    `>,
            {
                nil: null;
                c: [
                    true,
                    false,
                    'hello',
                    {
                        a: 'b';
                        b: false;
                    }
                ];
                b: false;
                a: 'b';
            }
        >
    >,
    Expect<Equal<Parse<'{}'>, {}>>,

    Expect<Equal<Parse<'[]'>, []>>,

    Expect<Equal<Parse<'[1]'>, never>>,

    Expect<Equal<Parse<'true'>, true>>,

    Expect<Equal<Parse<'["Hello", true, false, null]'>, ['Hello', true, false, null]>>,

    Expect<
        Equal<
            Parse<`
      {
        "hello\\r\\n\\b\\f": "world"
      }`>,
            {
                'hello\r\n\b\f': 'world';
            }
        >
    >,

    Expect<Equal<Parse<'{ 1: "world" }'>, never>>,

    Expect<
        Equal<
            Parse<`{ "hello
  
  world": 123 }`>,
            never
        >
    >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6228/answer
  > View solutions: https://tsch.js.org/6228/solutions
  > More Challenges: https://tsch.js.org
*/
