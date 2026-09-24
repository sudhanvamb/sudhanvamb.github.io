/*
===========================================================
EDITABLE CONTENT GUIDE
===========================================================
For normal text changes, edit the visible text directly in
index.html. Search for the section heading you want, e.g.:

  "Engineering in practice."
  "Thermal Transport"
  "Mechanical Engineer"
  "Applied Materials"

For larger changes, the HTML is intentionally kept readable.

Images:
  Put your image in /assets/
  Then replace an image src such as:
      assets/gaa-transistor.png
  with:
      assets/your-file-name.jpg

Resume:
  Replace /resume.pdf with your latest PDF using the same
  filename. The website's résumé button will automatically
  use the new file.

IMPORTANT:
  Applied Materials project visuals are intentionally NOT
  included because the work is internal/confidential.
===========================================================
*/

const menu=document.querySelector('.menu');const nav=document.querySelector('.nav');if(menu)menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
window.addEventListener('scroll',()=>{const h=document.documentElement;const p=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;document.querySelector('.progress').style.width=p+'%';});

/* =========================================================
   IMAGE LIGHTBOX
   Click any portfolio image to view it larger.
   Close with X, click outside, or press Escape.
   ========================================================= */
(function(){
  const images = Array.from(document.querySelectorAll('main img'));
  if (!images.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-content" role="dialog" aria-modal="true" aria-label="Enlarged image">
      <button class="lightbox-close" type="button" aria-label="Close enlarged image">×</button>
      <img class="lightbox-image" alt="" />
      <div class="lightbox-caption"></div>
    </div>`;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');

  function openLightbox(img){
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || '';
    const figure = img.closest('figure');
    const figcaption = figure ? figure.querySelector('figcaption') : null;
    caption.innerHTML = figcaption ? figcaption.innerHTML : (img.alt || '');
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  }

  function closeLightbox(){
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.classList.remove('lightbox-open');
    lightboxImage.removeAttribute('src');
  }

  images.forEach(img => {
    img.classList.add('zoomable-image');
    img.setAttribute('tabindex','0');
    img.setAttribute('role','button');
    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
})();

