import { make } from '../dom-helpers';


class ImagePrompt
{
  constructor(editor)
  {
    this.editor = editor;
    this.prompt = make('div.rte-prompt.hidden');
    this.src = make('input');
    this.alt = make('input');
    this.width = make('input');
    this.height = make('input');
    this.class = make('input');
    this.id = make('input');
    this.floatLeft = make('input');
    this.floatRight = make('input');
    this.init();
  }

  init()
  {
    this.src
      .attr('type', 'text')
      .attr('class', 'form-control')
      .attr('placeholder', 'Source...')
    this.alt
      .attr('type', 'text')
      .attr('class', 'form-control')
      .attr('placeholder', 'Alt...')
    this.width
      .css({width: '90px', marginRight: '5px'})
      .attr('type', 'text')
      .attr('class', 'form-control inline')
      .attr('placeholder', 'Width...')
    this.height
      .css({width: '90px'})
      .attr('type', 'text')
      .attr('class', 'form-control inline')
      .attr('placeholder', 'Height...')
    this.class
      .attr('type', 'text')
      .attr('class', 'form-control')
      .attr('placeholder', 'Class...')
    this.id
      .attr('type', 'text')
      .attr('class', 'form-control')
      .attr('placeholder', 'Id...')
    this.floatLeft
      .attr('type', 'radio')
      .attr('name', 'imageFloat')
    this.floatRight
      .attr('type', 'radio')
      .attr('name', 'imageFloat')
    this.appendChildren();
  }

  appendChildren()
  {
    this.prompt
      .append([
        this.src,
        this.alt,
        this.width,
        this.height,
        this.class,
        this.id,
        make('label', 'Float left'),
        this.floatLeft,
        make('label', 'Float right'),
        this.floatRight,
        make('div.clearfix')
          .append([
            make('button', 'Cancel')
              .attr('type', 'button')
              .attr('class', 'btn dark')
              .on('click', () => this.prompt.hide()),
            make('button', 'Insert')
              .attr('type', 'button')
              .attr('class', 'btn dark')
              .on('click', () => {
                this.editor.image(
                  this.src.value(), this.alt.value(), this.width.value(),
                  this.height.value(), this.class.value(), 
                  this.id.value(), this.floatLeft.dom(), this.floatRight.dom()
                );
                this.prompt.hide();
                this.reset();
              })
          ])
      ]);
  }

  reset()
  {
    this.src.dom().value = '';
    this.alt.dom().value = '';
    this.width.dom().value = '';
    this.height.dom().value = '';
    this.class.dom().value = '';
    this.id.dom().value = '';
    this.floatLeft.dom().checked = false;
    this.floatRight.dom().checked = false;
  }
  
}

export default ImagePrompt;