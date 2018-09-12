import { $ } from './dom-helpers';
import bootstrap from './bootstrap';


const container = $('#RTE');


let editor;


export function init(config = {}) {

  editor = bootstrap(container, config);

}


export function content(html = false) {

  if(html) {

    editor.body.innerHTML = html;

  } else {

    return editor.body.innerHTML;

  }
}
