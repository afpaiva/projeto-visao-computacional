export const triggerClickAtPosition = (x, y) => {
  const element = document.elementFromPoint(x, y);

  if (element) {
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    });

    element.dispatchEvent(clickEvent);
  }
}
