import { make, $ } from './dom-helpers';


class EditorCommand
{

  constructor(config, iframe)
  {
    this.config = config;
    this.iframe = iframe.dom();
    this.editor = (this.iframe.contentWindow || this.iframe.contentDocument);
    if(this.editor.document) this.editor = this.editor.document;
    this.editor.designMode = 'on';
    this.body = this.editor.body;
    this.transferTimeout = null;
    this.init();
  }

  init()
  {
    if(this.config.target) {
      this.body.innerHTML = this.config.target.value;
    }
    if(this.config.css) {
      this.appendStylesheet([this.config.css], false);
    }
    this.appendStylesheet(this.config.import);

    this.body.onkeyup = ev => {
      if(ev.keyCode == 27) {
        this.breakFromElement();
      } else {
        this.onContentChanged();
      }
    }
    
    $('body').on('keyup', (self, ev) => {
      if(ev.keyCode == 27) {
        this.breakFromElement();
      }
    });
  }

  breakFromElement() {
    this.body.appendChild(make('div', '...').dom());
  }

  onContentChanged() {
    clearTimeout(this.transferTimeout);
    this.transferTimeout = setTimeout(() => {
      const content = this.body.innerHTML;
      if(this.config.target) {
        this.config.target.value = content;
      }
      this.config.onContentChange(content);
    }, this.config.delay);
  }

  appendStylesheet(hrefs, toEditor = true) {
    const parent = toEditor ? this.editor.head : $('head');
    hrefs.forEach(href => {
      make('link')
        .attr('rel', 'stylesheet')
        .attr('type', 'text/css')
        .attr('href', href)
        .appendTo(parent)
    })
  }
  
  selection() {
    return this.editor.getSelection().toString();
  }

  // Takes up much more space
  // exec('styleWithCSS', false, true);
  
  backgroundColor(value) {
    this.exec('backColor', false, value);
  }
  
  color(value) {
    this.exec('foreColor', false, value);
  }
  
  bold() {
    this.exec('bold');
  }
  
  italic() {
    this.exec('italic');
  }
  
  superscript() {
    this.exec('superscript');
  }
  
  underline() {
    this.exec('underline');
  }
  
  strikeThrough() {
    this.exec('strikeThrough');
  }
  
  subscript() {
    this.exec('subscript');
  }
  
  alignCenter() {
    this.exec('justifyCenter');
  }
  
  alignLeft() {
    this.exec('justifyLeft');
  }
  
  alignRight() {
    this.exec('justifyRight');
  }
  
  justify() {
    this.exec('justifyFull');
  }
  
  font(value) {
    this.exec('fontName', false, value);
  }
  
  fontSize(value) {
    this.exec('fontSize', false, value);
  }
  
  horizontalRule() {
    this.exec('insertHorizontalRule');
  }
  
  heading(value) {
    const text = this.selection();
    this.html(`<${value}>${text != '' ? text : 'Heading'}</${value}>`);
  }
  
  orderedList() {
    this.exec('insertOrderedList');
  }
  
  unorderedList() {
    this.exec('insertUnorderedList');
  }
  
  link(url, text, target) {
    target = target.checked ? "target='_blank'" : ''; 
    this.html(`<a href='${url} ${target}>${text}</a>`);
  }
  
  image(src, alt, className, id, floatLeft, floatRight) 
  {
    let style = '';
  
    if(floatLeft.checked) {
      style = "style='float:left;'";
    } else if(floatRight.checked) {
      style = "style='float:right;'";
    }
  
    if(className != '') {
      className = `class='${className}'`; 
    }
    if(id != '') {
      id = `id='${id}'`;
    } 
  
    width  = width  != '' ? `width='${width}'`   : '';
    height = height != '' ? `height='${height}'` : '';
  
    this.html(`
      <img ${className} ${id} ${style} ${width} ${height} 
        src='${src}' alt='${alt}'
      >
    `);
  }
  
  _video(src, className, id, width, height, floatLeft, floatRight, autoplay, controls, loop) {
  
    let style = '';
  
    if(floatLeft.checked) style = "style='float:left;'";
    else if(floatRight.checked) style = "style='float:right;'";
  
    if(className != '') className = `class='${className}'`; 
    if(id != '') id = `id='${id}'`; 
  
    width = width != '' ? `width='${width}'` : '';
    height = height != '' ? `height='${height}'` : '';
  
    controls = controls.checked ? 'controls' : '';
    autoplay = autoplay.checked ? 'autoplay' : '';
    loop = loop.checked ? 'loop' : '';
  
    this.html(`
      <video ${className} ${id} ${width} ${height} ${style}
        src='${src}' ${controls} ${autoplay} ${loop}>
        Your browser does not support video tag
      </video>
    `);
  }
  
  html(data) {
    this.exec('insertHTML', false, data);
  }
  
  exec(...args) {
    this.editor.execCommand(...args);
    this.onContentChanged();
  }
}

export default EditorCommand;