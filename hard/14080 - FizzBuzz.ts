/*
  14080 - FizzBuzz
  -------
  by Lee Crosby (@Cygnut) #hard #array #math #infer

  ### Question

  The FizzBuzz problem is a classic test given in coding interviews. The task is simple:

  Print integers 1 to N, except:

  - Print "Fizz" if an integer is divisible by 3;
  - Print "Buzz" if an integer is divisible by 5;
  - Print "FizzBuzz" if an integer is divisible by both 3 and 5.

  For example, for N = 20, the output should be:
  `1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz`

  In the challenge below, we will want to generate this as an array of string literals.

  For large values of N, you will need to ensure that any types generated do so efficiently (e.g. by
  correctly using the tail-call optimisation for recursion).

  > View on GitHub: https://tsch.js.org/14080
*/

/* _____________ Your Code Here _____________ */

import type { NumberRange } from '@medium/8640 - Number Range';
import type { Length } from '@easy/18 - Length of Tuple';

type _Fizz<T extends number> = Sum<T> extends 0 | 3 | 6 | 9 ? 'Fizz' : '';

type _Buzz<T extends number> = `${T}` extends `${string}${0 | 5}` ? 'Buzz' : '';

type _FizzBuzz<T extends number, U = `${_Fizz<T>}${_Buzz<T>}`> = U extends '' ? `${T}` : U;

type Range<T extends string | number, U extends any[] = []> = `${Length<U>}` extends `${T}`
    ? U
    : Range<T, [...U, Length<[...U, 0]>]>;

type Sum<T extends string | number, U extends any[] = []> = `${T}` extends `${infer F}${infer R}`
    ? Sum<R, [...U, ...Range<F>]>
    : Length<U> extends NumberRange<0, 9>
    ? Length<U>
    : Sum<Length<U>>;

type FizzBuzz<T extends number, U extends number[] = Range<T>> = {
    [K in keyof U]: _FizzBuzz<U[K]>;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<FizzBuzz<1>, ['1']>>,
    Expect<Equal<FizzBuzz<5>, ['1', '2', 'Fizz', '4', 'Buzz']>>,
    Expect<
        Equal<
            FizzBuzz<20>,
            [
                '1',
                '2',
                'Fizz',
                '4',
                'Buzz',
                'Fizz',
                '7',
                '8',
                'Fizz',
                'Buzz',
                '11',
                'Fizz',
                '13',
                '14',
                'FizzBuzz',
                '16',
                '17',
                'Fizz',
                '19',
                'Buzz'
            ]
        >
    >,
    Expect<
        Equal<
            FizzBuzz<100>,
            [
                '1',
                '2',
                'Fizz',
                '4',
                'Buzz',
                'Fizz',
                '7',
                '8',
                'Fizz',
                'Buzz',
                '11',
                'Fizz',
                '13',
                '14',
                'FizzBuzz',
                '16',
                '17',
                'Fizz',
                '19',
                'Buzz',
                'Fizz',
                '22',
                '23',
                'Fizz',
                'Buzz',
                '26',
                'Fizz',
                '28',
                '29',
                'FizzBuzz',
                '31',
                '32',
                'Fizz',
                '34',
                'Buzz',
                'Fizz',
                '37',
                '38',
                'Fizz',
                'Buzz',
                '41',
                'Fizz',
                '43',
                '44',
                'FizzBuzz',
                '46',
                '47',
                'Fizz',
                '49',
                'Buzz',
                'Fizz',
                '52',
                '53',
                'Fizz',
                'Buzz',
                '56',
                'Fizz',
                '58',
                '59',
                'FizzBuzz',
                '61',
                '62',
                'Fizz',
                '64',
                'Buzz',
                'Fizz',
                '67',
                '68',
                'Fizz',
                'Buzz',
                '71',
                'Fizz',
                '73',
                '74',
                'FizzBuzz',
                '76',
                '77',
                'Fizz',
                '79',
                'Buzz',
                'Fizz',
                '82',
                '83',
                'Fizz',
                'Buzz',
                '86',
                'Fizz',
                '88',
                '89',
                'FizzBuzz',
                '91',
                '92',
                'Fizz',
                '94',
                'Buzz',
                'Fizz',
                '97',
                '98',
                'Fizz',
                'Buzz'
            ]
        >
    >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14080/answer
  > View solutions: https://tsch.js.org/14080/solutions
  > More Challenges: https://tsch.js.org
*/
