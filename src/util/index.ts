// scroll to bottom
export const scrollToBottom = (
  element: HTMLElement | null,
  options: ScrollOptions = { behavior: 'auto' },
): void => {
  element?.scrollTo({
    ...options,
    top: element.scrollHeight + 200,
  });
};
