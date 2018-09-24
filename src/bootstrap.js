import EditorOptions from './editor-options';
import EditorCommand from './editor-command';
import { make, $ } from './dom-helpers';


export default function( container ) {
  
  const iframe = make('iframe').appendTo( container );

  const config = {
    target : container.attr('data-target') ? $(`#${container.attr('data-target')}`).dom() : null,
    delay  : container.attr('data-delay')  ? parseFloat(container.attr('data-delay')) : 300,
    import : container.attr('data-import') ? container.attr('data-import').split(',') : [],
    css    : container.attr('data-css'),
    onContentChange: () => { } 
  }

  const command = new EditorCommand( config, iframe );
  const editorOptions = new EditorOptions( command );

  container.prepend([ 
    editorOptions.options, 
    ...editorOptions.prompts
  ]);

  return command.editor;
}