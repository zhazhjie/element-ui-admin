/**
 * @author: zzj
 * @date: 2020-01-22 09:49:07
 * @version: 1.0
 */
import "./intersectionObserver";

export const intersectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let el = entry.target;
      let src = el.dataset.src;
      if (src) el.src = src;
      intersectionObserver.unobserve(el);
    }
  });
});
