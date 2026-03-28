export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-services-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-services-img-col');
        }
      }
    });
  });

  // Classify elements in the services grid (right column)
  const rightCol = block.querySelector(':scope > div > div:nth-child(2)');
  if (!rightCol) return;

  // Check for background image — first child with a picture before any heading
  const firstChild = rightCol.firstElementChild;
  if (firstChild) {
    const bgPic = firstChild.querySelector('picture');
    const isBeforeHeading = firstChild.tagName.toLowerCase() !== 'h2';
    if (bgPic && isBeforeHeading && !firstChild.textContent.trim().replace(/\s/g, '')) {
      const bgImg = bgPic.querySelector('img');
      if (bgImg) {
        rightCol.style.backgroundImage = `url(${bgImg.src})`;
        rightCol.classList.add('services-bg-image');
        firstChild.remove();
      }
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
