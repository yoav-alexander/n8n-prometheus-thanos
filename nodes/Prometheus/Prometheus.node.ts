import { INodeType, INodeTypeDescription, NodeConnectionType, 	 } from 'n8n-workflow';

export class Prometheus implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'PrometheusAPI',
		name: 'prometheus',
		icon: 'file:Prometheus.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Query data from Prometheus.',
		defaults: {
			name: 'Prometheus Query',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'GET',
			url: '/api/v1/query',
		},

		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Prometheus',
						value: 'prometheus',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
						name: 'Thanos',
						value: 'thanos',
					}
				],
				default: 'thanos',
			},

			{
				displayName: 'URL',
				description: 'Prometheus / Thanos base URL',
				required: true,
				name: 'url',
				type: 'string',
				default:'',
				displayOptions: {
					show: {
						resource: [
							'prometheus',
							'thanos',
						],
					},
				},
				routing: {
					request: {
						baseURL: '={{ $value }}',
					},
				},
			},

			{
				displayName: 'Query',
				description: 'PromQL query',
				required: true,
				name: 'promQLquery',
				type: 'string',
				default:'',
				displayOptions: {
					show: {
						resource: [
							'prometheus',
							'thanos',
						],
					},
				},
				routing: {
					request: {
						qs: {
							query: '={{ $value }}',
						},
					},
				},
			},
		]

	};
}
