import { DOMCollection } from './dom-collection';


function DOMSelector(selector) {
  return document.querySelectorAll(selector);
}

function nodeMaker(tag, text) {
  const args = tag.split('.');
  let id = false;
  if(args[0].includes('#')) {
    args[0] = args[0].split('#');
    id = args[0][1];
    tag = args[0][0];
  } else {
    tag = args[0];
  }
  const node = document.createElement(tag);
  node.innerText = text;
  if(id) {
    node.setAttribute('id', id);
  }
  for(let i = 1; i < args.length; i++) {
    node.classList.add(args[i]);
  }
  return node;
}

export const make = function(tag, text = '') {
  return new DOMCollection([ nodeMaker(tag, text) ]);
} 

export const $ = function(selector)
{
  return new DOMCollection(DOMSelector(selector));
}