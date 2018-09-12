import { make } from './dom-helpers';
import ImagePrompt from './prompts/image-prompt';
import LinkPrompt from './prompts/link-prompt';
import VideoPrompt from './prompts/video-prompt';

const fonts = [
  'Times New Roman', 'Arial', 'Helvetica', 'Times', 'Courier New',
  'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman',
  'Comic Sans MS','Trebuchet MS', 'Arial Black', 'Impact'
];

const fontSizes = ['1', '2', '3', '4', '5', '6', '7'];

const headings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

const fontNodes = fonts.map(
  font => make('option', font).attr('value', font)
);

const fontSizeNodes = fontSizes.map(
  size => make('option', 'Font size ' + size).attr('value', size)
);

const headingNodes = headings.map(
  heading => make('option', 'Heading ' + heading.substr(1)).attr('value', heading)
);


class EditorOptions
{
  constructor(command)
  {
    this.prompts = [
      new LinkPrompt(command).prompt,
      new ImagePrompt(command).prompt,
      new VideoPrompt(command).prompt
    ];
    this.command = command;
    this.options = make('div.rte-e-o');
    this.init();
  }

  init()
  {
    this.options.append([
      ...this.makeFormatOptions(),
      ...this.makeFontOptions(),
      make('select.form-control.inline')
        .on('change', self => this.command.heading(self.value()))
        .on('focus', self => self.dom().selectedIndex = -1)
        .append(headingNodes),
      ...this.makeTextAlignmentOptions(),
      ...this.makeColorOptions(),
      ...this.makeListOptions(),
      ...this.makePromptOptions()
    ]); 
  }

  makeTextAlignmentOptions()
  {
    return [
      make('span.rte-align-btn.rte-align-center')
        .html('<span></span><span></span><span></span><span></span><span></span>')
        .on('click', () => this.command.alignCenter()),
      make('span.rte-align-btn.rte-align-right')
        .html('<span></span><span></span><span></span><span></span><span></span>')
        .on('click', () => this.command.alignRight()),
      make('span.rte-align-btn.rte-align-left')
        .html('<span></span><span></span><span></span><span></span><span></span>')
        .on('click', () => this.command.alignLeft()),
      make('span.rte-align-btn.rte-align-justify')
        .html('<span></span><span></span><span></span><span></span><span></span>')
        .on('click', () => this.command.justify())
    ];
  }

  makeColorOptions()
  {
    return [
      make('input')
        .attr('type', 'color')
        .value('#ffffff')
        .on('change', self => this.command.backgroundColor(self.value())),
      make('input')
        .attr('type', 'color')
        .on('change', self => this.command.color(self.value()))
    ];
  }

  makePromptOptions()
  {
    return [
      make('span.rte-link')
        .html('<span></span>')
        .on('click', () => this.prompts[0].show()),
      make('span.rte-image')
        .html('<span></span>')
        .on('click', () => this.prompts[1].show()),
      make('span.rte-video')
        .html('<span></span>')
        .on('click', () => this.prompts[2].show())
    ];
  }

  makeListOptions()
  {
    return [
      make('span.rte-list.rte-o-list')
        .html('<span></span><span></span><span></span>')
        .on('click', () => this.command.orderedList()),
      make('span.rte-list.rte-u-list')
        .html('<span></span><span></span><span></span>')
        .on('click', () => this.command.unorderedList())
    ];
  }

  makeFormatOptions()
  {
    return [
      make('span', 'B')
        .on('click', () => this.command.bold()),
      make('span', 'I')
        .on('click', () => this.command.italic()),
      make('span', 'S')
        .on('click', () => this.command.strikeThrough()),
      make('span', 'U')
        .on('click', () => this.command.underline()),
      make('span', '__')
        .on('click', () => this.command.horizontalRule()),
      make('span').html('x<sup>2</sup>')
        .on('click', () => this.command.superscript()),
      make('span').html('x<sub>2</sub>')
        .on('click', () => this.command.subscript())
    ];
  }

  makeFontOptions()
  {
    return [
      make('select.form-control.inline')
        .on('change', self => this.command.font(self.value()))
        .on('focus', self => self.dom().selectedIndex = -1)
        .append(fontNodes),
      make('select.form-control.inline')
        .on('change', self => this.command.fontSize(self.value()))
        .on('focus', self => self.dom().selectedIndex = -1)
        .append(fontSizeNodes)
    ];
  }
}

export default EditorOptions;

