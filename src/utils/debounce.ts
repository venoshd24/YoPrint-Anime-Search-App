/**
 * debounce
 * Returns a debounced version of the given function that delays invocation until
 * `wait` milliseconds have elapsed since the last call.
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 */
export function debounce<F extends (...args: any[]) => void>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}