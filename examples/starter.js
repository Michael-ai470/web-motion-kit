// examples/starter.js: the page module for starter.html. Copy this pattern into any project.
import { createMotion } from '../core/core.js';
import { startSmoothScroll } from '../core/smooth-scroll.js';
import { overlayNav, preloaderLifted } from '../core/chrome.js';
import { heroIntro } from '../recipes/hero-intro.js';
import { textReveal, batchReveal, wordLight, rollNumbers } from '../recipes/text.js';
import { highlight } from '../recipes/frost.js';
import { ticker } from '../recipes/ticker.js';
import { imageOpen } from '../recipes/image-open.js';
import { magnetic } from '../recipes/magnetic.js';
import { clocks } from '../recipes/clocks.js';

startSmoothScroll({ anchors: { offset: -72 } }); // = the fixed navbar's height

const $ = (sel) => document.querySelector(sel);

// The hero first: its scope holds gated text, and creating it opens the gate.
const hero = $('.hero');
overlayNav(hero);
createMotion(hero, (env) => heroIntro(hero, env, { ready: preloaderLifted() }));

// Everything else on the page. One scope can run several recipes; each finds its own hooks.
const main = $('main');
createMotion(main, (env) => {
  textReveal(main, env);
  batchReveal(main);
  wordLight(main, env);
  rollNumbers(main, env);
  highlight(main);
  imageOpen(main);
});

const band = $('[data-marquee]');
createMotion(band, (env) => ticker(band, env, 40));

const contact = $('#contact');
clocks(contact); // not motion: runs for everyone
createMotion(contact, (env) => magnetic(contact, env, 0.25), { when: 'hover' });
