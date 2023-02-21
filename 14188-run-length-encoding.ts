/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #hard

  ### Question

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > View on GitHub: https://tsch.js.org/14188
*/

/* _____________ Your Code Here _____________ */

import { Join } from './5310-join';

type EncodeSequence<T extends string[]> = `${T['length'] extends 1 ? '' : T['length']}${T[0]}`;

type DecodeSequence<T extends string | number, U, S extends any[] = []> = `${S['length']}` extends `${T}`
    ? Join<S>
    : DecodeSequence<T, U, [...S, U]>;

type Sequence<T extends string, U extends string[] = []> = T extends `${infer F}${infer R}`
    ? true extends Equal<F, U[0]> | Equal<undefined, U[0]>
        ? Sequence<R, [...U, F]>
        : U
    : U;

namespace RLE {
    export type Encode<T extends string, U extends string[] = Sequence<T>> = U['length'] extends 0
        ? ''
        : `${EncodeSequence<U>}${T extends `${Join<U>}${infer R}` ? Encode<R> : ''}`;

    export type Decode<T extends string, U extends string = ''> = T extends `${infer A}${infer B}${infer R}`
        ? A extends `${number}`
            ? Decode<R, `${U}${DecodeSequence<A, B>}`>
            : Decode<`${B}${R}`, `${U}${A}`>
        : `${U}${T}`;
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    // Raw string -> encoded string
    Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

    // Encoded string -> decoded string
    Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14188/answer
  > View solutions: https://tsch.js.org/14188/solutions
  > More Challenges: https://tsch.js.org
*/
