// Types for the result object with discriminated union
type Success<T> = [T, null];

type Failure<E> = [null, E];

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
async function to<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return [data as T, null];
  } catch (error) {
    return [null, error as E];
  }
}

export { to as default, to as to };
