
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MetricsOrdersByCompany
 * 
 */
export type MetricsOrdersByCompany = $Result.DefaultSelection<Prisma.$MetricsOrdersByCompanyPayload>
/**
 * Model ComputeRun
 * 
 */
export type ComputeRun = $Result.DefaultSelection<Prisma.$ComputeRunPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MetricsOrdersByCompanies
 * const metricsOrdersByCompanies = await prisma.metricsOrdersByCompany.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more MetricsOrdersByCompanies
   * const metricsOrdersByCompanies = await prisma.metricsOrdersByCompany.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.metricsOrdersByCompany`: Exposes CRUD operations for the **MetricsOrdersByCompany** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MetricsOrdersByCompanies
    * const metricsOrdersByCompanies = await prisma.metricsOrdersByCompany.findMany()
    * ```
    */
  get metricsOrdersByCompany(): Prisma.MetricsOrdersByCompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.computeRun`: Exposes CRUD operations for the **ComputeRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComputeRuns
    * const computeRuns = await prisma.computeRun.findMany()
    * ```
    */
  get computeRun(): Prisma.ComputeRunDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MetricsOrdersByCompany: 'MetricsOrdersByCompany',
    ComputeRun: 'ComputeRun'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "metricsOrdersByCompany" | "computeRun"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MetricsOrdersByCompany: {
        payload: Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>
        fields: Prisma.MetricsOrdersByCompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MetricsOrdersByCompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricsOrdersByCompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MetricsOrdersByCompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricsOrdersByCompanyPayload>
          }
          findFirst: {
            args: Prisma.MetricsOrdersByCompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricsOrdersByCompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MetricsOrdersByCompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricsOrdersByCompanyPayload>
          }
          findMany: {
            args: Prisma.MetricsOrdersByCompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricsOrdersByCompanyPayload>[]
          }
          create: {
            args: Prisma.MetricsOrdersByCompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricsOrdersByCompanyPayload>
          }
          createMany: {
            args: Prisma.MetricsOrdersByCompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MetricsOrdersByCompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricsOrdersByCompanyPayload>[]
          }
          delete: {
            args: Prisma.MetricsOrdersByCompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricsOrdersByCompanyPayload>
          }
          update: {
            args: Prisma.MetricsOrdersByCompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricsOrdersByCompanyPayload>
          }
          deleteMany: {
            args: Prisma.MetricsOrdersByCompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MetricsOrdersByCompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MetricsOrdersByCompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricsOrdersByCompanyPayload>[]
          }
          upsert: {
            args: Prisma.MetricsOrdersByCompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricsOrdersByCompanyPayload>
          }
          aggregate: {
            args: Prisma.MetricsOrdersByCompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMetricsOrdersByCompany>
          }
          groupBy: {
            args: Prisma.MetricsOrdersByCompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<MetricsOrdersByCompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.MetricsOrdersByCompanyCountArgs<ExtArgs>
            result: $Utils.Optional<MetricsOrdersByCompanyCountAggregateOutputType> | number
          }
        }
      }
      ComputeRun: {
        payload: Prisma.$ComputeRunPayload<ExtArgs>
        fields: Prisma.ComputeRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComputeRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputeRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComputeRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputeRunPayload>
          }
          findFirst: {
            args: Prisma.ComputeRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputeRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComputeRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputeRunPayload>
          }
          findMany: {
            args: Prisma.ComputeRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputeRunPayload>[]
          }
          create: {
            args: Prisma.ComputeRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputeRunPayload>
          }
          createMany: {
            args: Prisma.ComputeRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComputeRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputeRunPayload>[]
          }
          delete: {
            args: Prisma.ComputeRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputeRunPayload>
          }
          update: {
            args: Prisma.ComputeRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputeRunPayload>
          }
          deleteMany: {
            args: Prisma.ComputeRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComputeRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComputeRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputeRunPayload>[]
          }
          upsert: {
            args: Prisma.ComputeRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputeRunPayload>
          }
          aggregate: {
            args: Prisma.ComputeRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComputeRun>
          }
          groupBy: {
            args: Prisma.ComputeRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComputeRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComputeRunCountArgs<ExtArgs>
            result: $Utils.Optional<ComputeRunCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    metricsOrdersByCompany?: MetricsOrdersByCompanyOmit
    computeRun?: ComputeRunOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model MetricsOrdersByCompany
   */

  export type AggregateMetricsOrdersByCompany = {
    _count: MetricsOrdersByCompanyCountAggregateOutputType | null
    _avg: MetricsOrdersByCompanyAvgAggregateOutputType | null
    _sum: MetricsOrdersByCompanySumAggregateOutputType | null
    _min: MetricsOrdersByCompanyMinAggregateOutputType | null
    _max: MetricsOrdersByCompanyMaxAggregateOutputType | null
  }

  export type MetricsOrdersByCompanyAvgAggregateOutputType = {
    orderCount: number | null
  }

  export type MetricsOrdersByCompanySumAggregateOutputType = {
    orderCount: number | null
  }

  export type MetricsOrdersByCompanyMinAggregateOutputType = {
    id: string | null
    computedAt: Date | null
    companyId: string | null
    companyName: string | null
    date: Date | null
    orderCount: number | null
  }

  export type MetricsOrdersByCompanyMaxAggregateOutputType = {
    id: string | null
    computedAt: Date | null
    companyId: string | null
    companyName: string | null
    date: Date | null
    orderCount: number | null
  }

  export type MetricsOrdersByCompanyCountAggregateOutputType = {
    id: number
    computedAt: number
    companyId: number
    companyName: number
    date: number
    orderCount: number
    _all: number
  }


  export type MetricsOrdersByCompanyAvgAggregateInputType = {
    orderCount?: true
  }

  export type MetricsOrdersByCompanySumAggregateInputType = {
    orderCount?: true
  }

  export type MetricsOrdersByCompanyMinAggregateInputType = {
    id?: true
    computedAt?: true
    companyId?: true
    companyName?: true
    date?: true
    orderCount?: true
  }

  export type MetricsOrdersByCompanyMaxAggregateInputType = {
    id?: true
    computedAt?: true
    companyId?: true
    companyName?: true
    date?: true
    orderCount?: true
  }

  export type MetricsOrdersByCompanyCountAggregateInputType = {
    id?: true
    computedAt?: true
    companyId?: true
    companyName?: true
    date?: true
    orderCount?: true
    _all?: true
  }

  export type MetricsOrdersByCompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetricsOrdersByCompany to aggregate.
     */
    where?: MetricsOrdersByCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricsOrdersByCompanies to fetch.
     */
    orderBy?: MetricsOrdersByCompanyOrderByWithRelationInput | MetricsOrdersByCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MetricsOrdersByCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricsOrdersByCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricsOrdersByCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MetricsOrdersByCompanies
    **/
    _count?: true | MetricsOrdersByCompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MetricsOrdersByCompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MetricsOrdersByCompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MetricsOrdersByCompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MetricsOrdersByCompanyMaxAggregateInputType
  }

  export type GetMetricsOrdersByCompanyAggregateType<T extends MetricsOrdersByCompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateMetricsOrdersByCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMetricsOrdersByCompany[P]>
      : GetScalarType<T[P], AggregateMetricsOrdersByCompany[P]>
  }




  export type MetricsOrdersByCompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetricsOrdersByCompanyWhereInput
    orderBy?: MetricsOrdersByCompanyOrderByWithAggregationInput | MetricsOrdersByCompanyOrderByWithAggregationInput[]
    by: MetricsOrdersByCompanyScalarFieldEnum[] | MetricsOrdersByCompanyScalarFieldEnum
    having?: MetricsOrdersByCompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MetricsOrdersByCompanyCountAggregateInputType | true
    _avg?: MetricsOrdersByCompanyAvgAggregateInputType
    _sum?: MetricsOrdersByCompanySumAggregateInputType
    _min?: MetricsOrdersByCompanyMinAggregateInputType
    _max?: MetricsOrdersByCompanyMaxAggregateInputType
  }

  export type MetricsOrdersByCompanyGroupByOutputType = {
    id: string
    computedAt: Date
    companyId: string
    companyName: string | null
    date: Date
    orderCount: number
    _count: MetricsOrdersByCompanyCountAggregateOutputType | null
    _avg: MetricsOrdersByCompanyAvgAggregateOutputType | null
    _sum: MetricsOrdersByCompanySumAggregateOutputType | null
    _min: MetricsOrdersByCompanyMinAggregateOutputType | null
    _max: MetricsOrdersByCompanyMaxAggregateOutputType | null
  }

  type GetMetricsOrdersByCompanyGroupByPayload<T extends MetricsOrdersByCompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MetricsOrdersByCompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MetricsOrdersByCompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MetricsOrdersByCompanyGroupByOutputType[P]>
            : GetScalarType<T[P], MetricsOrdersByCompanyGroupByOutputType[P]>
        }
      >
    >


  export type MetricsOrdersByCompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    computedAt?: boolean
    companyId?: boolean
    companyName?: boolean
    date?: boolean
    orderCount?: boolean
  }, ExtArgs["result"]["metricsOrdersByCompany"]>

  export type MetricsOrdersByCompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    computedAt?: boolean
    companyId?: boolean
    companyName?: boolean
    date?: boolean
    orderCount?: boolean
  }, ExtArgs["result"]["metricsOrdersByCompany"]>

  export type MetricsOrdersByCompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    computedAt?: boolean
    companyId?: boolean
    companyName?: boolean
    date?: boolean
    orderCount?: boolean
  }, ExtArgs["result"]["metricsOrdersByCompany"]>

  export type MetricsOrdersByCompanySelectScalar = {
    id?: boolean
    computedAt?: boolean
    companyId?: boolean
    companyName?: boolean
    date?: boolean
    orderCount?: boolean
  }

  export type MetricsOrdersByCompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "computedAt" | "companyId" | "companyName" | "date" | "orderCount", ExtArgs["result"]["metricsOrdersByCompany"]>

  export type $MetricsOrdersByCompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MetricsOrdersByCompany"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      computedAt: Date
      /**
       * Company identifier (matches primary DB Company.id)
       */
      companyId: string
      /**
       * Company name at time of computation
       */
      companyName: string | null
      /**
       * The date this metric represents (daily grain)
       */
      date: Date
      /**
       * Orders submitted on this date
       */
      orderCount: number
    }, ExtArgs["result"]["metricsOrdersByCompany"]>
    composites: {}
  }

  type MetricsOrdersByCompanyGetPayload<S extends boolean | null | undefined | MetricsOrdersByCompanyDefaultArgs> = $Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload, S>

  type MetricsOrdersByCompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MetricsOrdersByCompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MetricsOrdersByCompanyCountAggregateInputType | true
    }

  export interface MetricsOrdersByCompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MetricsOrdersByCompany'], meta: { name: 'MetricsOrdersByCompany' } }
    /**
     * Find zero or one MetricsOrdersByCompany that matches the filter.
     * @param {MetricsOrdersByCompanyFindUniqueArgs} args - Arguments to find a MetricsOrdersByCompany
     * @example
     * // Get one MetricsOrdersByCompany
     * const metricsOrdersByCompany = await prisma.metricsOrdersByCompany.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MetricsOrdersByCompanyFindUniqueArgs>(args: SelectSubset<T, MetricsOrdersByCompanyFindUniqueArgs<ExtArgs>>): Prisma__MetricsOrdersByCompanyClient<$Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MetricsOrdersByCompany that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MetricsOrdersByCompanyFindUniqueOrThrowArgs} args - Arguments to find a MetricsOrdersByCompany
     * @example
     * // Get one MetricsOrdersByCompany
     * const metricsOrdersByCompany = await prisma.metricsOrdersByCompany.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MetricsOrdersByCompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, MetricsOrdersByCompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MetricsOrdersByCompanyClient<$Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetricsOrdersByCompany that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricsOrdersByCompanyFindFirstArgs} args - Arguments to find a MetricsOrdersByCompany
     * @example
     * // Get one MetricsOrdersByCompany
     * const metricsOrdersByCompany = await prisma.metricsOrdersByCompany.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MetricsOrdersByCompanyFindFirstArgs>(args?: SelectSubset<T, MetricsOrdersByCompanyFindFirstArgs<ExtArgs>>): Prisma__MetricsOrdersByCompanyClient<$Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetricsOrdersByCompany that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricsOrdersByCompanyFindFirstOrThrowArgs} args - Arguments to find a MetricsOrdersByCompany
     * @example
     * // Get one MetricsOrdersByCompany
     * const metricsOrdersByCompany = await prisma.metricsOrdersByCompany.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MetricsOrdersByCompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, MetricsOrdersByCompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__MetricsOrdersByCompanyClient<$Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MetricsOrdersByCompanies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricsOrdersByCompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MetricsOrdersByCompanies
     * const metricsOrdersByCompanies = await prisma.metricsOrdersByCompany.findMany()
     * 
     * // Get first 10 MetricsOrdersByCompanies
     * const metricsOrdersByCompanies = await prisma.metricsOrdersByCompany.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const metricsOrdersByCompanyWithIdOnly = await prisma.metricsOrdersByCompany.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MetricsOrdersByCompanyFindManyArgs>(args?: SelectSubset<T, MetricsOrdersByCompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MetricsOrdersByCompany.
     * @param {MetricsOrdersByCompanyCreateArgs} args - Arguments to create a MetricsOrdersByCompany.
     * @example
     * // Create one MetricsOrdersByCompany
     * const MetricsOrdersByCompany = await prisma.metricsOrdersByCompany.create({
     *   data: {
     *     // ... data to create a MetricsOrdersByCompany
     *   }
     * })
     * 
     */
    create<T extends MetricsOrdersByCompanyCreateArgs>(args: SelectSubset<T, MetricsOrdersByCompanyCreateArgs<ExtArgs>>): Prisma__MetricsOrdersByCompanyClient<$Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MetricsOrdersByCompanies.
     * @param {MetricsOrdersByCompanyCreateManyArgs} args - Arguments to create many MetricsOrdersByCompanies.
     * @example
     * // Create many MetricsOrdersByCompanies
     * const metricsOrdersByCompany = await prisma.metricsOrdersByCompany.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MetricsOrdersByCompanyCreateManyArgs>(args?: SelectSubset<T, MetricsOrdersByCompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MetricsOrdersByCompanies and returns the data saved in the database.
     * @param {MetricsOrdersByCompanyCreateManyAndReturnArgs} args - Arguments to create many MetricsOrdersByCompanies.
     * @example
     * // Create many MetricsOrdersByCompanies
     * const metricsOrdersByCompany = await prisma.metricsOrdersByCompany.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MetricsOrdersByCompanies and only return the `id`
     * const metricsOrdersByCompanyWithIdOnly = await prisma.metricsOrdersByCompany.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MetricsOrdersByCompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, MetricsOrdersByCompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MetricsOrdersByCompany.
     * @param {MetricsOrdersByCompanyDeleteArgs} args - Arguments to delete one MetricsOrdersByCompany.
     * @example
     * // Delete one MetricsOrdersByCompany
     * const MetricsOrdersByCompany = await prisma.metricsOrdersByCompany.delete({
     *   where: {
     *     // ... filter to delete one MetricsOrdersByCompany
     *   }
     * })
     * 
     */
    delete<T extends MetricsOrdersByCompanyDeleteArgs>(args: SelectSubset<T, MetricsOrdersByCompanyDeleteArgs<ExtArgs>>): Prisma__MetricsOrdersByCompanyClient<$Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MetricsOrdersByCompany.
     * @param {MetricsOrdersByCompanyUpdateArgs} args - Arguments to update one MetricsOrdersByCompany.
     * @example
     * // Update one MetricsOrdersByCompany
     * const metricsOrdersByCompany = await prisma.metricsOrdersByCompany.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MetricsOrdersByCompanyUpdateArgs>(args: SelectSubset<T, MetricsOrdersByCompanyUpdateArgs<ExtArgs>>): Prisma__MetricsOrdersByCompanyClient<$Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MetricsOrdersByCompanies.
     * @param {MetricsOrdersByCompanyDeleteManyArgs} args - Arguments to filter MetricsOrdersByCompanies to delete.
     * @example
     * // Delete a few MetricsOrdersByCompanies
     * const { count } = await prisma.metricsOrdersByCompany.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MetricsOrdersByCompanyDeleteManyArgs>(args?: SelectSubset<T, MetricsOrdersByCompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetricsOrdersByCompanies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricsOrdersByCompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MetricsOrdersByCompanies
     * const metricsOrdersByCompany = await prisma.metricsOrdersByCompany.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MetricsOrdersByCompanyUpdateManyArgs>(args: SelectSubset<T, MetricsOrdersByCompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetricsOrdersByCompanies and returns the data updated in the database.
     * @param {MetricsOrdersByCompanyUpdateManyAndReturnArgs} args - Arguments to update many MetricsOrdersByCompanies.
     * @example
     * // Update many MetricsOrdersByCompanies
     * const metricsOrdersByCompany = await prisma.metricsOrdersByCompany.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MetricsOrdersByCompanies and only return the `id`
     * const metricsOrdersByCompanyWithIdOnly = await prisma.metricsOrdersByCompany.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MetricsOrdersByCompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, MetricsOrdersByCompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MetricsOrdersByCompany.
     * @param {MetricsOrdersByCompanyUpsertArgs} args - Arguments to update or create a MetricsOrdersByCompany.
     * @example
     * // Update or create a MetricsOrdersByCompany
     * const metricsOrdersByCompany = await prisma.metricsOrdersByCompany.upsert({
     *   create: {
     *     // ... data to create a MetricsOrdersByCompany
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MetricsOrdersByCompany we want to update
     *   }
     * })
     */
    upsert<T extends MetricsOrdersByCompanyUpsertArgs>(args: SelectSubset<T, MetricsOrdersByCompanyUpsertArgs<ExtArgs>>): Prisma__MetricsOrdersByCompanyClient<$Result.GetResult<Prisma.$MetricsOrdersByCompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MetricsOrdersByCompanies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricsOrdersByCompanyCountArgs} args - Arguments to filter MetricsOrdersByCompanies to count.
     * @example
     * // Count the number of MetricsOrdersByCompanies
     * const count = await prisma.metricsOrdersByCompany.count({
     *   where: {
     *     // ... the filter for the MetricsOrdersByCompanies we want to count
     *   }
     * })
    **/
    count<T extends MetricsOrdersByCompanyCountArgs>(
      args?: Subset<T, MetricsOrdersByCompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MetricsOrdersByCompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MetricsOrdersByCompany.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricsOrdersByCompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MetricsOrdersByCompanyAggregateArgs>(args: Subset<T, MetricsOrdersByCompanyAggregateArgs>): Prisma.PrismaPromise<GetMetricsOrdersByCompanyAggregateType<T>>

    /**
     * Group by MetricsOrdersByCompany.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricsOrdersByCompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MetricsOrdersByCompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MetricsOrdersByCompanyGroupByArgs['orderBy'] }
        : { orderBy?: MetricsOrdersByCompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MetricsOrdersByCompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetricsOrdersByCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MetricsOrdersByCompany model
   */
  readonly fields: MetricsOrdersByCompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MetricsOrdersByCompany.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MetricsOrdersByCompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MetricsOrdersByCompany model
   */
  interface MetricsOrdersByCompanyFieldRefs {
    readonly id: FieldRef<"MetricsOrdersByCompany", 'String'>
    readonly computedAt: FieldRef<"MetricsOrdersByCompany", 'DateTime'>
    readonly companyId: FieldRef<"MetricsOrdersByCompany", 'String'>
    readonly companyName: FieldRef<"MetricsOrdersByCompany", 'String'>
    readonly date: FieldRef<"MetricsOrdersByCompany", 'DateTime'>
    readonly orderCount: FieldRef<"MetricsOrdersByCompany", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MetricsOrdersByCompany findUnique
   */
  export type MetricsOrdersByCompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
    /**
     * Filter, which MetricsOrdersByCompany to fetch.
     */
    where: MetricsOrdersByCompanyWhereUniqueInput
  }

  /**
   * MetricsOrdersByCompany findUniqueOrThrow
   */
  export type MetricsOrdersByCompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
    /**
     * Filter, which MetricsOrdersByCompany to fetch.
     */
    where: MetricsOrdersByCompanyWhereUniqueInput
  }

  /**
   * MetricsOrdersByCompany findFirst
   */
  export type MetricsOrdersByCompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
    /**
     * Filter, which MetricsOrdersByCompany to fetch.
     */
    where?: MetricsOrdersByCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricsOrdersByCompanies to fetch.
     */
    orderBy?: MetricsOrdersByCompanyOrderByWithRelationInput | MetricsOrdersByCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetricsOrdersByCompanies.
     */
    cursor?: MetricsOrdersByCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricsOrdersByCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricsOrdersByCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetricsOrdersByCompanies.
     */
    distinct?: MetricsOrdersByCompanyScalarFieldEnum | MetricsOrdersByCompanyScalarFieldEnum[]
  }

  /**
   * MetricsOrdersByCompany findFirstOrThrow
   */
  export type MetricsOrdersByCompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
    /**
     * Filter, which MetricsOrdersByCompany to fetch.
     */
    where?: MetricsOrdersByCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricsOrdersByCompanies to fetch.
     */
    orderBy?: MetricsOrdersByCompanyOrderByWithRelationInput | MetricsOrdersByCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetricsOrdersByCompanies.
     */
    cursor?: MetricsOrdersByCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricsOrdersByCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricsOrdersByCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetricsOrdersByCompanies.
     */
    distinct?: MetricsOrdersByCompanyScalarFieldEnum | MetricsOrdersByCompanyScalarFieldEnum[]
  }

  /**
   * MetricsOrdersByCompany findMany
   */
  export type MetricsOrdersByCompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
    /**
     * Filter, which MetricsOrdersByCompanies to fetch.
     */
    where?: MetricsOrdersByCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricsOrdersByCompanies to fetch.
     */
    orderBy?: MetricsOrdersByCompanyOrderByWithRelationInput | MetricsOrdersByCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MetricsOrdersByCompanies.
     */
    cursor?: MetricsOrdersByCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricsOrdersByCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricsOrdersByCompanies.
     */
    skip?: number
    distinct?: MetricsOrdersByCompanyScalarFieldEnum | MetricsOrdersByCompanyScalarFieldEnum[]
  }

  /**
   * MetricsOrdersByCompany create
   */
  export type MetricsOrdersByCompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
    /**
     * The data needed to create a MetricsOrdersByCompany.
     */
    data: XOR<MetricsOrdersByCompanyCreateInput, MetricsOrdersByCompanyUncheckedCreateInput>
  }

  /**
   * MetricsOrdersByCompany createMany
   */
  export type MetricsOrdersByCompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MetricsOrdersByCompanies.
     */
    data: MetricsOrdersByCompanyCreateManyInput | MetricsOrdersByCompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetricsOrdersByCompany createManyAndReturn
   */
  export type MetricsOrdersByCompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
    /**
     * The data used to create many MetricsOrdersByCompanies.
     */
    data: MetricsOrdersByCompanyCreateManyInput | MetricsOrdersByCompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetricsOrdersByCompany update
   */
  export type MetricsOrdersByCompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
    /**
     * The data needed to update a MetricsOrdersByCompany.
     */
    data: XOR<MetricsOrdersByCompanyUpdateInput, MetricsOrdersByCompanyUncheckedUpdateInput>
    /**
     * Choose, which MetricsOrdersByCompany to update.
     */
    where: MetricsOrdersByCompanyWhereUniqueInput
  }

  /**
   * MetricsOrdersByCompany updateMany
   */
  export type MetricsOrdersByCompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MetricsOrdersByCompanies.
     */
    data: XOR<MetricsOrdersByCompanyUpdateManyMutationInput, MetricsOrdersByCompanyUncheckedUpdateManyInput>
    /**
     * Filter which MetricsOrdersByCompanies to update
     */
    where?: MetricsOrdersByCompanyWhereInput
    /**
     * Limit how many MetricsOrdersByCompanies to update.
     */
    limit?: number
  }

  /**
   * MetricsOrdersByCompany updateManyAndReturn
   */
  export type MetricsOrdersByCompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
    /**
     * The data used to update MetricsOrdersByCompanies.
     */
    data: XOR<MetricsOrdersByCompanyUpdateManyMutationInput, MetricsOrdersByCompanyUncheckedUpdateManyInput>
    /**
     * Filter which MetricsOrdersByCompanies to update
     */
    where?: MetricsOrdersByCompanyWhereInput
    /**
     * Limit how many MetricsOrdersByCompanies to update.
     */
    limit?: number
  }

  /**
   * MetricsOrdersByCompany upsert
   */
  export type MetricsOrdersByCompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
    /**
     * The filter to search for the MetricsOrdersByCompany to update in case it exists.
     */
    where: MetricsOrdersByCompanyWhereUniqueInput
    /**
     * In case the MetricsOrdersByCompany found by the `where` argument doesn't exist, create a new MetricsOrdersByCompany with this data.
     */
    create: XOR<MetricsOrdersByCompanyCreateInput, MetricsOrdersByCompanyUncheckedCreateInput>
    /**
     * In case the MetricsOrdersByCompany was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MetricsOrdersByCompanyUpdateInput, MetricsOrdersByCompanyUncheckedUpdateInput>
  }

  /**
   * MetricsOrdersByCompany delete
   */
  export type MetricsOrdersByCompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
    /**
     * Filter which MetricsOrdersByCompany to delete.
     */
    where: MetricsOrdersByCompanyWhereUniqueInput
  }

  /**
   * MetricsOrdersByCompany deleteMany
   */
  export type MetricsOrdersByCompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetricsOrdersByCompanies to delete
     */
    where?: MetricsOrdersByCompanyWhereInput
    /**
     * Limit how many MetricsOrdersByCompanies to delete.
     */
    limit?: number
  }

  /**
   * MetricsOrdersByCompany without action
   */
  export type MetricsOrdersByCompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricsOrdersByCompany
     */
    select?: MetricsOrdersByCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricsOrdersByCompany
     */
    omit?: MetricsOrdersByCompanyOmit<ExtArgs> | null
  }


  /**
   * Model ComputeRun
   */

  export type AggregateComputeRun = {
    _count: ComputeRunCountAggregateOutputType | null
    _avg: ComputeRunAvgAggregateOutputType | null
    _sum: ComputeRunSumAggregateOutputType | null
    _min: ComputeRunMinAggregateOutputType | null
    _max: ComputeRunMaxAggregateOutputType | null
  }

  export type ComputeRunAvgAggregateOutputType = {
    recordsProcessed: number | null
  }

  export type ComputeRunSumAggregateOutputType = {
    recordsProcessed: number | null
  }

  export type ComputeRunMinAggregateOutputType = {
    id: string | null
    metricType: string | null
    startedAt: Date | null
    completedAt: Date | null
    status: string | null
    recordsProcessed: number | null
    error: string | null
  }

  export type ComputeRunMaxAggregateOutputType = {
    id: string | null
    metricType: string | null
    startedAt: Date | null
    completedAt: Date | null
    status: string | null
    recordsProcessed: number | null
    error: string | null
  }

  export type ComputeRunCountAggregateOutputType = {
    id: number
    metricType: number
    startedAt: number
    completedAt: number
    status: number
    recordsProcessed: number
    error: number
    _all: number
  }


  export type ComputeRunAvgAggregateInputType = {
    recordsProcessed?: true
  }

  export type ComputeRunSumAggregateInputType = {
    recordsProcessed?: true
  }

  export type ComputeRunMinAggregateInputType = {
    id?: true
    metricType?: true
    startedAt?: true
    completedAt?: true
    status?: true
    recordsProcessed?: true
    error?: true
  }

  export type ComputeRunMaxAggregateInputType = {
    id?: true
    metricType?: true
    startedAt?: true
    completedAt?: true
    status?: true
    recordsProcessed?: true
    error?: true
  }

  export type ComputeRunCountAggregateInputType = {
    id?: true
    metricType?: true
    startedAt?: true
    completedAt?: true
    status?: true
    recordsProcessed?: true
    error?: true
    _all?: true
  }

  export type ComputeRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComputeRun to aggregate.
     */
    where?: ComputeRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComputeRuns to fetch.
     */
    orderBy?: ComputeRunOrderByWithRelationInput | ComputeRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComputeRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComputeRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComputeRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComputeRuns
    **/
    _count?: true | ComputeRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComputeRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComputeRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComputeRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComputeRunMaxAggregateInputType
  }

  export type GetComputeRunAggregateType<T extends ComputeRunAggregateArgs> = {
        [P in keyof T & keyof AggregateComputeRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComputeRun[P]>
      : GetScalarType<T[P], AggregateComputeRun[P]>
  }




  export type ComputeRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComputeRunWhereInput
    orderBy?: ComputeRunOrderByWithAggregationInput | ComputeRunOrderByWithAggregationInput[]
    by: ComputeRunScalarFieldEnum[] | ComputeRunScalarFieldEnum
    having?: ComputeRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComputeRunCountAggregateInputType | true
    _avg?: ComputeRunAvgAggregateInputType
    _sum?: ComputeRunSumAggregateInputType
    _min?: ComputeRunMinAggregateInputType
    _max?: ComputeRunMaxAggregateInputType
  }

  export type ComputeRunGroupByOutputType = {
    id: string
    metricType: string
    startedAt: Date
    completedAt: Date | null
    status: string
    recordsProcessed: number | null
    error: string | null
    _count: ComputeRunCountAggregateOutputType | null
    _avg: ComputeRunAvgAggregateOutputType | null
    _sum: ComputeRunSumAggregateOutputType | null
    _min: ComputeRunMinAggregateOutputType | null
    _max: ComputeRunMaxAggregateOutputType | null
  }

  type GetComputeRunGroupByPayload<T extends ComputeRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComputeRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComputeRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComputeRunGroupByOutputType[P]>
            : GetScalarType<T[P], ComputeRunGroupByOutputType[P]>
        }
      >
    >


  export type ComputeRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metricType?: boolean
    startedAt?: boolean
    completedAt?: boolean
    status?: boolean
    recordsProcessed?: boolean
    error?: boolean
  }, ExtArgs["result"]["computeRun"]>

  export type ComputeRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metricType?: boolean
    startedAt?: boolean
    completedAt?: boolean
    status?: boolean
    recordsProcessed?: boolean
    error?: boolean
  }, ExtArgs["result"]["computeRun"]>

  export type ComputeRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metricType?: boolean
    startedAt?: boolean
    completedAt?: boolean
    status?: boolean
    recordsProcessed?: boolean
    error?: boolean
  }, ExtArgs["result"]["computeRun"]>

  export type ComputeRunSelectScalar = {
    id?: boolean
    metricType?: boolean
    startedAt?: boolean
    completedAt?: boolean
    status?: boolean
    recordsProcessed?: boolean
    error?: boolean
  }

  export type ComputeRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "metricType" | "startedAt" | "completedAt" | "status" | "recordsProcessed" | "error", ExtArgs["result"]["computeRun"]>

  export type $ComputeRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComputeRun"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      /**
       * Type of metric being computed (e.g., 'orders_by_company')
       */
      metricType: string
      /**
       * When the compute job started
       */
      startedAt: Date
      /**
       * When the compute job completed (null if still running or failed)
       */
      completedAt: Date | null
      /**
       * Status: 'running', 'completed', 'failed'
       */
      status: string
      /**
       * Number of records processed
       */
      recordsProcessed: number | null
      /**
       * Error message if status is 'failed'
       */
      error: string | null
    }, ExtArgs["result"]["computeRun"]>
    composites: {}
  }

  type ComputeRunGetPayload<S extends boolean | null | undefined | ComputeRunDefaultArgs> = $Result.GetResult<Prisma.$ComputeRunPayload, S>

  type ComputeRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComputeRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComputeRunCountAggregateInputType | true
    }

  export interface ComputeRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComputeRun'], meta: { name: 'ComputeRun' } }
    /**
     * Find zero or one ComputeRun that matches the filter.
     * @param {ComputeRunFindUniqueArgs} args - Arguments to find a ComputeRun
     * @example
     * // Get one ComputeRun
     * const computeRun = await prisma.computeRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComputeRunFindUniqueArgs>(args: SelectSubset<T, ComputeRunFindUniqueArgs<ExtArgs>>): Prisma__ComputeRunClient<$Result.GetResult<Prisma.$ComputeRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ComputeRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComputeRunFindUniqueOrThrowArgs} args - Arguments to find a ComputeRun
     * @example
     * // Get one ComputeRun
     * const computeRun = await prisma.computeRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComputeRunFindUniqueOrThrowArgs>(args: SelectSubset<T, ComputeRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComputeRunClient<$Result.GetResult<Prisma.$ComputeRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComputeRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputeRunFindFirstArgs} args - Arguments to find a ComputeRun
     * @example
     * // Get one ComputeRun
     * const computeRun = await prisma.computeRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComputeRunFindFirstArgs>(args?: SelectSubset<T, ComputeRunFindFirstArgs<ExtArgs>>): Prisma__ComputeRunClient<$Result.GetResult<Prisma.$ComputeRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComputeRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputeRunFindFirstOrThrowArgs} args - Arguments to find a ComputeRun
     * @example
     * // Get one ComputeRun
     * const computeRun = await prisma.computeRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComputeRunFindFirstOrThrowArgs>(args?: SelectSubset<T, ComputeRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComputeRunClient<$Result.GetResult<Prisma.$ComputeRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ComputeRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputeRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComputeRuns
     * const computeRuns = await prisma.computeRun.findMany()
     * 
     * // Get first 10 ComputeRuns
     * const computeRuns = await prisma.computeRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const computeRunWithIdOnly = await prisma.computeRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComputeRunFindManyArgs>(args?: SelectSubset<T, ComputeRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComputeRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ComputeRun.
     * @param {ComputeRunCreateArgs} args - Arguments to create a ComputeRun.
     * @example
     * // Create one ComputeRun
     * const ComputeRun = await prisma.computeRun.create({
     *   data: {
     *     // ... data to create a ComputeRun
     *   }
     * })
     * 
     */
    create<T extends ComputeRunCreateArgs>(args: SelectSubset<T, ComputeRunCreateArgs<ExtArgs>>): Prisma__ComputeRunClient<$Result.GetResult<Prisma.$ComputeRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ComputeRuns.
     * @param {ComputeRunCreateManyArgs} args - Arguments to create many ComputeRuns.
     * @example
     * // Create many ComputeRuns
     * const computeRun = await prisma.computeRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComputeRunCreateManyArgs>(args?: SelectSubset<T, ComputeRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComputeRuns and returns the data saved in the database.
     * @param {ComputeRunCreateManyAndReturnArgs} args - Arguments to create many ComputeRuns.
     * @example
     * // Create many ComputeRuns
     * const computeRun = await prisma.computeRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComputeRuns and only return the `id`
     * const computeRunWithIdOnly = await prisma.computeRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComputeRunCreateManyAndReturnArgs>(args?: SelectSubset<T, ComputeRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComputeRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ComputeRun.
     * @param {ComputeRunDeleteArgs} args - Arguments to delete one ComputeRun.
     * @example
     * // Delete one ComputeRun
     * const ComputeRun = await prisma.computeRun.delete({
     *   where: {
     *     // ... filter to delete one ComputeRun
     *   }
     * })
     * 
     */
    delete<T extends ComputeRunDeleteArgs>(args: SelectSubset<T, ComputeRunDeleteArgs<ExtArgs>>): Prisma__ComputeRunClient<$Result.GetResult<Prisma.$ComputeRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ComputeRun.
     * @param {ComputeRunUpdateArgs} args - Arguments to update one ComputeRun.
     * @example
     * // Update one ComputeRun
     * const computeRun = await prisma.computeRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComputeRunUpdateArgs>(args: SelectSubset<T, ComputeRunUpdateArgs<ExtArgs>>): Prisma__ComputeRunClient<$Result.GetResult<Prisma.$ComputeRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ComputeRuns.
     * @param {ComputeRunDeleteManyArgs} args - Arguments to filter ComputeRuns to delete.
     * @example
     * // Delete a few ComputeRuns
     * const { count } = await prisma.computeRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComputeRunDeleteManyArgs>(args?: SelectSubset<T, ComputeRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComputeRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputeRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComputeRuns
     * const computeRun = await prisma.computeRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComputeRunUpdateManyArgs>(args: SelectSubset<T, ComputeRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComputeRuns and returns the data updated in the database.
     * @param {ComputeRunUpdateManyAndReturnArgs} args - Arguments to update many ComputeRuns.
     * @example
     * // Update many ComputeRuns
     * const computeRun = await prisma.computeRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ComputeRuns and only return the `id`
     * const computeRunWithIdOnly = await prisma.computeRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComputeRunUpdateManyAndReturnArgs>(args: SelectSubset<T, ComputeRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComputeRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ComputeRun.
     * @param {ComputeRunUpsertArgs} args - Arguments to update or create a ComputeRun.
     * @example
     * // Update or create a ComputeRun
     * const computeRun = await prisma.computeRun.upsert({
     *   create: {
     *     // ... data to create a ComputeRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComputeRun we want to update
     *   }
     * })
     */
    upsert<T extends ComputeRunUpsertArgs>(args: SelectSubset<T, ComputeRunUpsertArgs<ExtArgs>>): Prisma__ComputeRunClient<$Result.GetResult<Prisma.$ComputeRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ComputeRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputeRunCountArgs} args - Arguments to filter ComputeRuns to count.
     * @example
     * // Count the number of ComputeRuns
     * const count = await prisma.computeRun.count({
     *   where: {
     *     // ... the filter for the ComputeRuns we want to count
     *   }
     * })
    **/
    count<T extends ComputeRunCountArgs>(
      args?: Subset<T, ComputeRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComputeRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComputeRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputeRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComputeRunAggregateArgs>(args: Subset<T, ComputeRunAggregateArgs>): Prisma.PrismaPromise<GetComputeRunAggregateType<T>>

    /**
     * Group by ComputeRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputeRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComputeRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComputeRunGroupByArgs['orderBy'] }
        : { orderBy?: ComputeRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComputeRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComputeRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComputeRun model
   */
  readonly fields: ComputeRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComputeRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComputeRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ComputeRun model
   */
  interface ComputeRunFieldRefs {
    readonly id: FieldRef<"ComputeRun", 'String'>
    readonly metricType: FieldRef<"ComputeRun", 'String'>
    readonly startedAt: FieldRef<"ComputeRun", 'DateTime'>
    readonly completedAt: FieldRef<"ComputeRun", 'DateTime'>
    readonly status: FieldRef<"ComputeRun", 'String'>
    readonly recordsProcessed: FieldRef<"ComputeRun", 'Int'>
    readonly error: FieldRef<"ComputeRun", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ComputeRun findUnique
   */
  export type ComputeRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
    /**
     * Filter, which ComputeRun to fetch.
     */
    where: ComputeRunWhereUniqueInput
  }

  /**
   * ComputeRun findUniqueOrThrow
   */
  export type ComputeRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
    /**
     * Filter, which ComputeRun to fetch.
     */
    where: ComputeRunWhereUniqueInput
  }

  /**
   * ComputeRun findFirst
   */
  export type ComputeRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
    /**
     * Filter, which ComputeRun to fetch.
     */
    where?: ComputeRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComputeRuns to fetch.
     */
    orderBy?: ComputeRunOrderByWithRelationInput | ComputeRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComputeRuns.
     */
    cursor?: ComputeRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComputeRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComputeRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComputeRuns.
     */
    distinct?: ComputeRunScalarFieldEnum | ComputeRunScalarFieldEnum[]
  }

  /**
   * ComputeRun findFirstOrThrow
   */
  export type ComputeRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
    /**
     * Filter, which ComputeRun to fetch.
     */
    where?: ComputeRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComputeRuns to fetch.
     */
    orderBy?: ComputeRunOrderByWithRelationInput | ComputeRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComputeRuns.
     */
    cursor?: ComputeRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComputeRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComputeRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComputeRuns.
     */
    distinct?: ComputeRunScalarFieldEnum | ComputeRunScalarFieldEnum[]
  }

  /**
   * ComputeRun findMany
   */
  export type ComputeRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
    /**
     * Filter, which ComputeRuns to fetch.
     */
    where?: ComputeRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComputeRuns to fetch.
     */
    orderBy?: ComputeRunOrderByWithRelationInput | ComputeRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComputeRuns.
     */
    cursor?: ComputeRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComputeRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComputeRuns.
     */
    skip?: number
    distinct?: ComputeRunScalarFieldEnum | ComputeRunScalarFieldEnum[]
  }

  /**
   * ComputeRun create
   */
  export type ComputeRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
    /**
     * The data needed to create a ComputeRun.
     */
    data: XOR<ComputeRunCreateInput, ComputeRunUncheckedCreateInput>
  }

  /**
   * ComputeRun createMany
   */
  export type ComputeRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComputeRuns.
     */
    data: ComputeRunCreateManyInput | ComputeRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComputeRun createManyAndReturn
   */
  export type ComputeRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
    /**
     * The data used to create many ComputeRuns.
     */
    data: ComputeRunCreateManyInput | ComputeRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComputeRun update
   */
  export type ComputeRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
    /**
     * The data needed to update a ComputeRun.
     */
    data: XOR<ComputeRunUpdateInput, ComputeRunUncheckedUpdateInput>
    /**
     * Choose, which ComputeRun to update.
     */
    where: ComputeRunWhereUniqueInput
  }

  /**
   * ComputeRun updateMany
   */
  export type ComputeRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComputeRuns.
     */
    data: XOR<ComputeRunUpdateManyMutationInput, ComputeRunUncheckedUpdateManyInput>
    /**
     * Filter which ComputeRuns to update
     */
    where?: ComputeRunWhereInput
    /**
     * Limit how many ComputeRuns to update.
     */
    limit?: number
  }

  /**
   * ComputeRun updateManyAndReturn
   */
  export type ComputeRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
    /**
     * The data used to update ComputeRuns.
     */
    data: XOR<ComputeRunUpdateManyMutationInput, ComputeRunUncheckedUpdateManyInput>
    /**
     * Filter which ComputeRuns to update
     */
    where?: ComputeRunWhereInput
    /**
     * Limit how many ComputeRuns to update.
     */
    limit?: number
  }

  /**
   * ComputeRun upsert
   */
  export type ComputeRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
    /**
     * The filter to search for the ComputeRun to update in case it exists.
     */
    where: ComputeRunWhereUniqueInput
    /**
     * In case the ComputeRun found by the `where` argument doesn't exist, create a new ComputeRun with this data.
     */
    create: XOR<ComputeRunCreateInput, ComputeRunUncheckedCreateInput>
    /**
     * In case the ComputeRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComputeRunUpdateInput, ComputeRunUncheckedUpdateInput>
  }

  /**
   * ComputeRun delete
   */
  export type ComputeRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
    /**
     * Filter which ComputeRun to delete.
     */
    where: ComputeRunWhereUniqueInput
  }

  /**
   * ComputeRun deleteMany
   */
  export type ComputeRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComputeRuns to delete
     */
    where?: ComputeRunWhereInput
    /**
     * Limit how many ComputeRuns to delete.
     */
    limit?: number
  }

  /**
   * ComputeRun without action
   */
  export type ComputeRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputeRun
     */
    select?: ComputeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComputeRun
     */
    omit?: ComputeRunOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MetricsOrdersByCompanyScalarFieldEnum: {
    id: 'id',
    computedAt: 'computedAt',
    companyId: 'companyId',
    companyName: 'companyName',
    date: 'date',
    orderCount: 'orderCount'
  };

  export type MetricsOrdersByCompanyScalarFieldEnum = (typeof MetricsOrdersByCompanyScalarFieldEnum)[keyof typeof MetricsOrdersByCompanyScalarFieldEnum]


  export const ComputeRunScalarFieldEnum: {
    id: 'id',
    metricType: 'metricType',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    status: 'status',
    recordsProcessed: 'recordsProcessed',
    error: 'error'
  };

  export type ComputeRunScalarFieldEnum = (typeof ComputeRunScalarFieldEnum)[keyof typeof ComputeRunScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MetricsOrdersByCompanyWhereInput = {
    AND?: MetricsOrdersByCompanyWhereInput | MetricsOrdersByCompanyWhereInput[]
    OR?: MetricsOrdersByCompanyWhereInput[]
    NOT?: MetricsOrdersByCompanyWhereInput | MetricsOrdersByCompanyWhereInput[]
    id?: StringFilter<"MetricsOrdersByCompany"> | string
    computedAt?: DateTimeFilter<"MetricsOrdersByCompany"> | Date | string
    companyId?: StringFilter<"MetricsOrdersByCompany"> | string
    companyName?: StringNullableFilter<"MetricsOrdersByCompany"> | string | null
    date?: DateTimeFilter<"MetricsOrdersByCompany"> | Date | string
    orderCount?: IntFilter<"MetricsOrdersByCompany"> | number
  }

  export type MetricsOrdersByCompanyOrderByWithRelationInput = {
    id?: SortOrder
    computedAt?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrderInput | SortOrder
    date?: SortOrder
    orderCount?: SortOrder
  }

  export type MetricsOrdersByCompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    companyId_date?: MetricsOrdersByCompanyCompanyIdDateCompoundUniqueInput
    AND?: MetricsOrdersByCompanyWhereInput | MetricsOrdersByCompanyWhereInput[]
    OR?: MetricsOrdersByCompanyWhereInput[]
    NOT?: MetricsOrdersByCompanyWhereInput | MetricsOrdersByCompanyWhereInput[]
    computedAt?: DateTimeFilter<"MetricsOrdersByCompany"> | Date | string
    companyId?: StringFilter<"MetricsOrdersByCompany"> | string
    companyName?: StringNullableFilter<"MetricsOrdersByCompany"> | string | null
    date?: DateTimeFilter<"MetricsOrdersByCompany"> | Date | string
    orderCount?: IntFilter<"MetricsOrdersByCompany"> | number
  }, "id" | "companyId_date">

  export type MetricsOrdersByCompanyOrderByWithAggregationInput = {
    id?: SortOrder
    computedAt?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrderInput | SortOrder
    date?: SortOrder
    orderCount?: SortOrder
    _count?: MetricsOrdersByCompanyCountOrderByAggregateInput
    _avg?: MetricsOrdersByCompanyAvgOrderByAggregateInput
    _max?: MetricsOrdersByCompanyMaxOrderByAggregateInput
    _min?: MetricsOrdersByCompanyMinOrderByAggregateInput
    _sum?: MetricsOrdersByCompanySumOrderByAggregateInput
  }

  export type MetricsOrdersByCompanyScalarWhereWithAggregatesInput = {
    AND?: MetricsOrdersByCompanyScalarWhereWithAggregatesInput | MetricsOrdersByCompanyScalarWhereWithAggregatesInput[]
    OR?: MetricsOrdersByCompanyScalarWhereWithAggregatesInput[]
    NOT?: MetricsOrdersByCompanyScalarWhereWithAggregatesInput | MetricsOrdersByCompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MetricsOrdersByCompany"> | string
    computedAt?: DateTimeWithAggregatesFilter<"MetricsOrdersByCompany"> | Date | string
    companyId?: StringWithAggregatesFilter<"MetricsOrdersByCompany"> | string
    companyName?: StringNullableWithAggregatesFilter<"MetricsOrdersByCompany"> | string | null
    date?: DateTimeWithAggregatesFilter<"MetricsOrdersByCompany"> | Date | string
    orderCount?: IntWithAggregatesFilter<"MetricsOrdersByCompany"> | number
  }

  export type ComputeRunWhereInput = {
    AND?: ComputeRunWhereInput | ComputeRunWhereInput[]
    OR?: ComputeRunWhereInput[]
    NOT?: ComputeRunWhereInput | ComputeRunWhereInput[]
    id?: StringFilter<"ComputeRun"> | string
    metricType?: StringFilter<"ComputeRun"> | string
    startedAt?: DateTimeFilter<"ComputeRun"> | Date | string
    completedAt?: DateTimeNullableFilter<"ComputeRun"> | Date | string | null
    status?: StringFilter<"ComputeRun"> | string
    recordsProcessed?: IntNullableFilter<"ComputeRun"> | number | null
    error?: StringNullableFilter<"ComputeRun"> | string | null
  }

  export type ComputeRunOrderByWithRelationInput = {
    id?: SortOrder
    metricType?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    recordsProcessed?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
  }

  export type ComputeRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComputeRunWhereInput | ComputeRunWhereInput[]
    OR?: ComputeRunWhereInput[]
    NOT?: ComputeRunWhereInput | ComputeRunWhereInput[]
    metricType?: StringFilter<"ComputeRun"> | string
    startedAt?: DateTimeFilter<"ComputeRun"> | Date | string
    completedAt?: DateTimeNullableFilter<"ComputeRun"> | Date | string | null
    status?: StringFilter<"ComputeRun"> | string
    recordsProcessed?: IntNullableFilter<"ComputeRun"> | number | null
    error?: StringNullableFilter<"ComputeRun"> | string | null
  }, "id">

  export type ComputeRunOrderByWithAggregationInput = {
    id?: SortOrder
    metricType?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    recordsProcessed?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    _count?: ComputeRunCountOrderByAggregateInput
    _avg?: ComputeRunAvgOrderByAggregateInput
    _max?: ComputeRunMaxOrderByAggregateInput
    _min?: ComputeRunMinOrderByAggregateInput
    _sum?: ComputeRunSumOrderByAggregateInput
  }

  export type ComputeRunScalarWhereWithAggregatesInput = {
    AND?: ComputeRunScalarWhereWithAggregatesInput | ComputeRunScalarWhereWithAggregatesInput[]
    OR?: ComputeRunScalarWhereWithAggregatesInput[]
    NOT?: ComputeRunScalarWhereWithAggregatesInput | ComputeRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComputeRun"> | string
    metricType?: StringWithAggregatesFilter<"ComputeRun"> | string
    startedAt?: DateTimeWithAggregatesFilter<"ComputeRun"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"ComputeRun"> | Date | string | null
    status?: StringWithAggregatesFilter<"ComputeRun"> | string
    recordsProcessed?: IntNullableWithAggregatesFilter<"ComputeRun"> | number | null
    error?: StringNullableWithAggregatesFilter<"ComputeRun"> | string | null
  }

  export type MetricsOrdersByCompanyCreateInput = {
    id?: string
    computedAt?: Date | string
    companyId: string
    companyName?: string | null
    date: Date | string
    orderCount: number
  }

  export type MetricsOrdersByCompanyUncheckedCreateInput = {
    id?: string
    computedAt?: Date | string
    companyId: string
    companyName?: string | null
    date: Date | string
    orderCount: number
  }

  export type MetricsOrdersByCompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    computedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderCount?: IntFieldUpdateOperationsInput | number
  }

  export type MetricsOrdersByCompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    computedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderCount?: IntFieldUpdateOperationsInput | number
  }

  export type MetricsOrdersByCompanyCreateManyInput = {
    id?: string
    computedAt?: Date | string
    companyId: string
    companyName?: string | null
    date: Date | string
    orderCount: number
  }

  export type MetricsOrdersByCompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    computedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderCount?: IntFieldUpdateOperationsInput | number
  }

  export type MetricsOrdersByCompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    computedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    orderCount?: IntFieldUpdateOperationsInput | number
  }

  export type ComputeRunCreateInput = {
    id?: string
    metricType: string
    startedAt?: Date | string
    completedAt?: Date | string | null
    status?: string
    recordsProcessed?: number | null
    error?: string | null
  }

  export type ComputeRunUncheckedCreateInput = {
    id?: string
    metricType: string
    startedAt?: Date | string
    completedAt?: Date | string | null
    status?: string
    recordsProcessed?: number | null
    error?: string | null
  }

  export type ComputeRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    metricType?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    recordsProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComputeRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    metricType?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    recordsProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComputeRunCreateManyInput = {
    id?: string
    metricType: string
    startedAt?: Date | string
    completedAt?: Date | string | null
    status?: string
    recordsProcessed?: number | null
    error?: string | null
  }

  export type ComputeRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    metricType?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    recordsProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComputeRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    metricType?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    recordsProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MetricsOrdersByCompanyCompanyIdDateCompoundUniqueInput = {
    companyId: string
    date: Date | string
  }

  export type MetricsOrdersByCompanyCountOrderByAggregateInput = {
    id?: SortOrder
    computedAt?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    date?: SortOrder
    orderCount?: SortOrder
  }

  export type MetricsOrdersByCompanyAvgOrderByAggregateInput = {
    orderCount?: SortOrder
  }

  export type MetricsOrdersByCompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    computedAt?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    date?: SortOrder
    orderCount?: SortOrder
  }

  export type MetricsOrdersByCompanyMinOrderByAggregateInput = {
    id?: SortOrder
    computedAt?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    date?: SortOrder
    orderCount?: SortOrder
  }

  export type MetricsOrdersByCompanySumOrderByAggregateInput = {
    orderCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ComputeRunCountOrderByAggregateInput = {
    id?: SortOrder
    metricType?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    status?: SortOrder
    recordsProcessed?: SortOrder
    error?: SortOrder
  }

  export type ComputeRunAvgOrderByAggregateInput = {
    recordsProcessed?: SortOrder
  }

  export type ComputeRunMaxOrderByAggregateInput = {
    id?: SortOrder
    metricType?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    status?: SortOrder
    recordsProcessed?: SortOrder
    error?: SortOrder
  }

  export type ComputeRunMinOrderByAggregateInput = {
    id?: SortOrder
    metricType?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    status?: SortOrder
    recordsProcessed?: SortOrder
    error?: SortOrder
  }

  export type ComputeRunSumOrderByAggregateInput = {
    recordsProcessed?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}