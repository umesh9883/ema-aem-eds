export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // Detect columns-services variant inside dark-navy section
  const section = block.closest('.section');
  if (section && section.classList.contains('dark-navy')) {
    block.classList.add('columns-services');

    // Classify elements in the services grid (right column)
    const rightCol = block.querySelector(':scope > div > div:nth-child(2)');
    if (!rightCol) return;

    // Check for background image — first child with an image before any heading
    const firstChild = rightCol.firstElementChild;
    if (firstChild && firstChild.tagName.toLowerCase() !== 'h2') {
      const bgImg = firstChild.querySelector('img');
      if (bgImg) {
        rightCol.style.backgroundImage = `url(${bgImg.src})`;
        rightCol.classList.add('services-bg-image');
        firstChild.remove();
      }
    }

    let colIndex = 0;
    let lastWasHeading = false;
    [...rightCol.children].forEach((el) => {
      const tag = el.tagName.toLowerCase();
      const hasImg = el.querySelector('img') || el.querySelector('picture');

      if (tag === 'h2') {
        el.classList.add('services-heading');
        colIndex = 0;
        lastWasHeading = true;
      } else if (hasImg) {
        el.classList.add('services-icon');
        el.dataset.col = String((colIndex % 3) + 1);
        lastWasHeading = false;
      } else if (lastWasHeading) {
        // Description text right after heading — spans full width
        el.classList.add('services-description');
        lastWasHeading = false;
      } else {
        el.classList.add('services-label');
        el.dataset.col = String((colIndex % 3) + 1);
        colIndex += 1;
        lastWasHeading = false;
      }
    });
  }
}
