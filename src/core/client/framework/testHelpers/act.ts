import TestRenderer from "react-test-renderer";

export function act(
  callback: () => Promise<void> | void | undefined
): Promise<void> | void {
  return TestRenderer.act(callback as any) as any;
}

export async function actAndReturn<T>(callback: () => Promise<T>): Promise<T> {
  let result: T | null = null;
  await act(async () => {
    result = await callback();
  });
  return (result as unknown) as Promise<T>;
}
