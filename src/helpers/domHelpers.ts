export function scrollToEndInChat(refId: string, inverse: boolean) {
  const scrollable = document.getElementById(refId);

  if (scrollable) {
    setTimeout(() => {
      scrollable.scrollTo({ top: inverse ? 0 : scrollable.scrollHeight, behavior: 'smooth' });
    }, 100);
  }
}
