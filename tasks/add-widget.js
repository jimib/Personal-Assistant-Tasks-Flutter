const _ = require('lodash');
const Promise = require('bluebird');

const TASK_NAME = 'Add Component';

const COMPONENT_STATELESS = 'componentStateless';
const COMPONENT_STATEFUL = 'componentStateful';
const COMPONENT_ANIMATED = 'componentAnimated';

const DIR_COMPONENTS = './lib/component';

task( TASK_NAME )
.then( (assistant, options = {}) => {

	return assistant.ask([
		{
			type: 'choose',
			name: 'type',
			options: {
				items: [
					{label : 'Stateless Widget', value: COMPONENT_STATELESS, enabled: true},
					{label : 'Stateful Widget', value: COMPONENT_STATEFUL, enabled: true},
					{label : 'Animated Widget', value: COMPONENT_ANIMATED, enabled: true}
				]
			}
		},
		{
			name : 'name',
			message : `Name`,
			default : options.name
		}
	])
	.then( ( result ) => {
		const {name,type} = result;
		const id = _.lowerCase( name ).replace(/[\s]+/g,'_');
		
		//console.log( id, name );
		const options = {
			id,
			name
		}

		switch( type ){
			case COMPONENT_STATELESS:
				return CreateComponent( `${DIR_COMPONENTS}/${id}.dart`, '../templates/component_stateless.dart', ['BUILD'] );
			break;
			case COMPONENT_STATEFUL:
				return CreateComponent( `${DIR_COMPONENTS}/${id}.dart`, '../templates/component_stateful.dart', ['INIT_STATE', 'BUILD'] );
			break;
			case COMPONENT_ANIMATED:
				return CreateComponent( `${DIR_COMPONENTS}/${id}.dart`, '../templates/component_animated.dart', ['INIT_STATE', 'BUILD'] );
			break;
		}

		//helper function
		function CreateComponent( pathTarget, pathTemplate, blocks  ){
			return Promise.mapSeries( [
				() => assistant.template( pathTarget, pathTemplate, options ),
				/*() => {
					return Promise.mapSeries( blocks, block => {
						return assistant.editCodeBlock( pathTarget, block, {language:'dart'} )
					} )
				}*/
			], handler => handler() );
		}
	})
} );

