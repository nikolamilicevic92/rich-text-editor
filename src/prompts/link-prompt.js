import { make } from '../dom-helpers';

class LinkPrompt
{
  constructor(command)
  {
    this.command = command;
    this.prompt = make('div.rte-prompt.hidden');
    this.url = make('input');
    this.text = make('input');
    this.target = make('input');
    this.init();
  }

  init()
  {
    this.url
      .css({marginBottom: '5px'})
      .attr('type', 'text')
      .attr('class', 'form-control')
      .attr('placeholder', 'URL...');
    this.text
      .attr('type', 'text')
      .attr('class', 'form-control')
      .attr('placeholder', 'Text...')
    this.target
      .attr('type', 'checkbox')
    this.appendChildren();
  }

  appendChildren()
  {
    this.prompt
      .append([
        this.url,
        this.text,
        this.target,
        make('label', 'Open in new tab'),
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
                this.command.link(
                  this.url.value(), this.text.value(), this.target.dom()
                );
                this.prompt.hide();
                this.reset();
              })
          ])
      ]);
  }

  reset()
  {
    this.target.dom().checked = false;
    this.url.dom().value = '';
    this.text.dom().value = '';
  }

}

export default LinkPrompt;