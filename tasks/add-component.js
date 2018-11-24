const _ = require('lodash');
const Promise = require('bluebird');

const TASK_NAME = 'Add Component/Container';

const COMPONENT_STATELESS = 'componentStateless';
const COMPONENT_STATEFUL = 'componentStateless';
const COMPONENT_ANIMATED = 'componentStateless';

const DIR_COMPONENTS = './lib/component';

task( TASK_NAME )
.then( (assistant, options = {}) => {

	return assistant.ask([
		{
			name : 'name',
			message : `Name`,
			default : options.name
		},
		{
			type: 'multiselect',
			name: 'type',
			options: {
				items: [
					{label : 'Stateless Widget', value: COMPONENT_STATELESS, enabled: true},
					{label : 'Stateful Widget', value: COMPONENT_STATEFUL, enabled: true},
					{label : 'Animated Widget', value: COMPONENT_ANIMATED, enabled: true}
				]
			}
		}
	])
	.then( ( result ) => {
		const {name,type} = result;
		const id = _.capitalize( name );
		console.log( id, name );
		const options = {
			id,
			name
		}
		switch( type ){
			case COMPONENT_STATELESS:
				return CreateComponent( `${DIR_COMPONENTS}/${name}.dart`, '../templates/ComponentStateless.js', ['BUILD'], options );
			break;
			case COMPONENT_STATEFUL:
				return CreateComponent( `${DIR_COMPONENTS}/${name}.dart`, '../templates/ComponentStateless.js', ['INIT_STATE', 'BUILD'], options );
			break;
			case COMPONENT_ANIMATED:
				return CreateComponent( `${DIR_COMPONENTS}/${name}.dart`, '../templates/ComponentStateless.js', ['INIT_STATE', 'BUILD'], options );
			break;
		}
	})
} );

function CreateComponent( pathTarget, pathTemplate, blocks, options  ){
	return Promise.mapSeries( [
		() => assistant.template( pathTarget, pathTemplate, options ),
		() => {
			Promise.mapSeries( blocks, block => {
				assistant.editCodeBlock( pathTarget, block, {language:'dart'} )
			} )
		}
	]), handler => handler() );
}