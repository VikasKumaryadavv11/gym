export const ambientFloat = {
  slow: { x: [0, 24, -12, 0], y: [0, -18, 16, 0], scale: [1, 1.05, .98, 1], opacity: [.72, .9, .76, .72] },
  medium: { x: [0, -20, 15, 0], y: [0, 20, -12, 0], scale: [1, .97, 1.04, 1], opacity: [.56, .72, .6, .56] },
  hero: { x: [0, 30, -18, 0], y: [0, -14, 20, 0], scale: [1, 1.08, .99, 1], opacity: [.5, .72, .55, .5] },
};

export const ambientTransition = {
  slow: { duration: 28, repeat: Infinity, ease: 'easeInOut' },
  medium: { duration: 36, repeat: Infinity, ease: 'easeInOut' },
  hero: { duration: 24, repeat: Infinity, ease: 'easeInOut' },
};
