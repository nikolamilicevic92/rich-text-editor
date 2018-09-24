import { $ } from './dom-helpers';
import bootstrap from './bootstrap';


const container = $('#RTE');

const editor = bootstrap(container)


export function content(html = false) {

  if(html) {

    editor.body.innerHTML = html;

  } else {

    return editor.body.innerHTML;

  }
}
