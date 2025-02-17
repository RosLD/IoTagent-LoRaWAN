/*
 * Copyright 2019 Atos Spain S.A
 *
 * This file is part of iotagent-lora
 *
 * iotagent-lora is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * iotagent-lora is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with iotagent-lora.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 */

/* eslint-disable no-unused-vars */

const request = require('request');
const async = require('async');
const should = require('chai').should();
const iotAgentConfig = require('../config-test.js');
const utils = require('../utils');
const iotagentLora = require('../../');
const iotAgentLib = require('iotagent-node-lib');
const mqtt = require('mqtt');

describe('Device provisioning API: Provision devices (TTN)', function () {
	let testMosquittoHost = 'localhost';
	let orionHost = iotAgentConfig.iota.contextBroker.host;
	let orionPort = iotAgentConfig.iota.contextBroker.port;
	let orionServer = orionHost + ':' + orionPort;
	const service = 'smartgondor';
	const subservice = '/gardens';

	readEnvVariables();

	function readEnvVariables() {
		if (process.env.TEST_MOSQUITTO_HOST) {
			testMosquittoHost = process.env.TEST_MOSQUITTO_HOST;
		}

		if (process.env.IOTA_CB_HOST) {
			orionHost = process.env.IOTA_CB_HOST;
		}

		if (process.env.IOTA_CB_PORT) {
			orionPort = process.env.IOTA_CB_PORT;
		}

		orionServer = orionHost + ':' + orionPort;
	}

	before(function (done) {
		async.series(
			[
				async.apply(utils.deleteEntityCB, iotAgentConfig.iota.contextBroker, service, subservice, 'LORA-N-003'),
				async.apply(utils.deleteEntityCB, iotAgentConfig.iota.contextBroker, service, subservice, 'LORA-N-001'),
				async.apply(iotagentLora.start, iotAgentConfig)
			],
			done
		);
	});

	after(function (done) {
		async.series(
			[
				iotAgentLib.clearAll,
				iotagentLora.stop,
				async.apply(utils.deleteEntityCB, iotAgentConfig.iota.contextBroker, service, subservice, 'LORA-N-003'),
				async.apply(utils.deleteEntityCB, iotAgentConfig.iota.contextBroker, service, subservice, 'LORA-N-001')
			],
			done
		);
	});

	describe('When a device provisioning request without internalAttributes arrives at the IoT Agent', function () {
		const options = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
			method: 'POST',
			json: utils.readExampleFile('./test/deviceProvisioning/provisionDeviceTTN_noInternalAttributes.json'),
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		it('should answer with error', function (done) {
			request(options, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 500);
				done();
			});
		});
	});

	describe('When a device provisioning request without lorawan property arrives at the IoT Agent', function () {
		const options = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
			method: 'POST',
			json: utils.readExampleFile('./test/deviceProvisioning/provisionDeviceTTN_noLorawan.json'),
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		it('should answer with error', function (done) {
			request(options, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 500);
				done();
			});
		});
	});

	describe('When a device provisioning request without application_server property arrives at the IoT Agent', function () {
		const options = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
			method: 'POST',
			json: utils.readExampleFile('./test/deviceProvisioning/provisionDeviceTTN_noApplicationServer.json'),
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		it('should answer with error', function (done) {
			request(options, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 500);
				done();
			});
		});
	});

	describe('When a device provisioning request without application_server host property arrives at the IoT Agent', function () {
		const options = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
			method: 'POST',
			json: utils.readExampleFile('./test/deviceProvisioning/provisionDeviceTTN_noApplicationServerHost.json'),
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		it('should answer with error', function (done) {
			request(options, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 500);
				done();
			});
		});
	});

	describe('When a device provisioning request without application_server provider property arrives at the IoT Agent', function () {
		const options = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
			method: 'POST',
			json: utils.readExampleFile(
				'./test/deviceProvisioning/provisionDeviceTTN_noApplicationServerProvider.json'
			),
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		it('should answer with error', function (done) {
			request(options, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 500);
				done();
			});
		});
	});

	describe('When a device provisioning request without mandatory properties arrives at the IoT Agent', function () {
		const options = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
			method: 'POST',
			json: utils.readExampleFile('./test/deviceProvisioning/provisionDeviceTTN_noMandatoryProperties.json'),
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		it('should answer with error', function (done) {
			request(options, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 500);
				done();
			});
		});
	});

	describe('When a device provisioning request with all the required data arrives to the IoT Agent', function () {
		const options = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
			method: 'POST',
			json: utils.readExampleFile('./test/deviceProvisioning/provisionDevice1TTN.json'),
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		if (testMosquittoHost) {
			options.json.devices[0].internal_attributes.lorawan.application_server.host = testMosquittoHost;
		}

		const optionsGetDevice = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
			method: 'GET',
			json: true,
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		const optionsCB = {
			url: 'http://' + orionServer + '/v2/entities/' + options.json.devices[0].entity_name,
			method: 'GET',
			json: true,
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		it('should add the device to the devices list', function (done) {
			request(options, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 201);
				setTimeout(function () {
					request(optionsGetDevice, function (error, response, body) {
						should.not.exist(error);
						response.should.have.property('statusCode', 200);
						body.should.have.property('count', 1);
						body.should.have.property('devices');
						body.devices.should.be.an('array');
						body.devices.should.have.length(1);
						body.devices[0].should.have.property('device_id', options.json.devices[0].device_id);
						body.devices[0].should.have.property('attributes');
						body.devices[0].attributes.should.be.an('array');
						body.devices[0].attributes.should.have.length(4);
						done();
					});
				}, 500);
			});
		});

		it('should register the entity in the CB', function (done) {
			request(optionsCB, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 200);
				body.should.have.property('id', options.json.devices[0].entity_name);
				done();
			});
		});

		it('Should process correctly active attributes', function (done) {
			const attributesExample = utils.readExampleFile('./test/activeAttributes/cayenneLpp.json');
			const client = mqtt.connect('mqtt://' + testMosquittoHost);
			client.on('connect', function () {
				client.publish(
					'v3/' +
						options.json.devices[0].internal_attributes.lorawan.application_id +
						'/devices/' +
						options.json.devices[0].device_id +
						'/up',
					JSON.stringify(attributesExample)
				);
				setTimeout(function () {
					request(optionsCB, function (error, response, body) {
						should.not.exist(error);
						response.should.have.property('statusCode', 200);
						body.should.have.property('id', options.json.devices[0].entity_name);
						body.should.have.property('temperature_1');
						body.temperature_1.should.have.property('type', 'Number');
						body.temperature_1.should.have.property('value', 27.2);
						client.end();
						done();
					});
				}, 500);
			});
		});
	});

	describe('When an existing device is updated', function () {
		const deviceId = 'lora_n_003';

		const options = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices/' + deviceId,
			method: 'PUT',
			json: utils.readExampleFile('./test/deviceProvisioning/updateDevice1TTN.json'),
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		if (testMosquittoHost) {
			options.json.internal_attributes.lorawan.application_server.host = testMosquittoHost;
		}

		const optionsGetDevice = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
			method: 'GET',
			json: true,
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		const optionsCB = {
			url: 'http://' + orionServer + '/v2/entities/' + options.json.entity_name,
			method: 'GET',
			json: true,
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		it('should update the device in the devices list', function (done) {
			request(options, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 204);
				setTimeout(function () {
					request(optionsGetDevice, function (error, response, body) {
						should.not.exist(error);
						response.should.have.property('statusCode', 200);
						body.should.have.property('count', 1);
						body.should.have.property('devices');
						body.devices.should.be.an('array');
						body.devices.should.have.length(1);
						body.devices[0].should.have.property('device_id', deviceId);
						body.devices[0].should.have.property('attributes');
						body.devices[0].attributes.should.be.an('array');
						body.devices[0].attributes.should.have.length(5);
						done();
					});
				}, 500);
			});
		});

		it('should re-register the entity in the CB', function (done) {
			request(optionsCB, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 200);
				body.should.have.property('id', options.json.entity_name);
				body.should.have.property('digital_in_3');
				done();
			});
		});

		it('Should process correctly active attributes', function (done) {
			const attributesExample = utils.readExampleFile('./test/activeAttributes/cayenneLpp.json');
			const client = mqtt.connect('mqtt://' + testMosquittoHost);
			client.on('connect', function () {
				client.publish(
					'v3/' + options.json.internal_attributes.lorawan.application_id + '/devices/' + deviceId + '/up',
					JSON.stringify(attributesExample)
				);
				setTimeout(function () {
					request(optionsCB, function (error, response, body) {
						should.not.exist(error);
						response.should.have.property('statusCode', 200);
						body.should.have.property('id', options.json.entity_name);
						body.should.have.property('digital_in_3');
						body.digital_in_3.should.have.property('type', 'Number');
						//body.digital_in_3.should.have.property('value', 100);
						client.end();
						done();
					});
				}, 1000);
			});
		});
	});

	describe('When a device provisioning request with all the required data arrives to the IoT Agent and the Application Server already exists', function () {
		const options = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
			method: 'POST',
			json: utils.readExampleFile('./test/deviceProvisioning/provisionDevice2TTN.json'),
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		if (testMosquittoHost) {
			options.json.devices[0].internal_attributes.lorawan.application_server.host = testMosquittoHost;
		}

		const optionsGetDevice = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
			method: 'GET',
			json: true,
			headers: {
				'fiware-service': 'smartgondor',
				'fiware-servicepath': '/gardens'
			}
		};

		const optionsCB = {
			url: 'http://' + orionServer + '/v2/entities/' + options.json.devices[0].entity_name,
			method: 'GET',
			json: true,
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			}
		};

		it('should add the device to the devices list', function (done) {
			request(options, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 201);
				setTimeout(function () {
					request(optionsGetDevice, function (error, response, body) {
						should.not.exist(error);
						response.should.have.property('statusCode', 200);
						body.should.have.property('count', 2);
						body.should.have.property('devices');
						body.devices.should.be.an('array');
						body.devices.should.have.length(2);
						body.devices[1].should.have.property('device_id', options.json.devices[0].device_id);
						done();
					});
				}, 500);
			});
		});

		it('should register the entity in the CB', function (done) {
			request(optionsCB, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 200);
				body.should.have.property('id', options.json.devices[0].entity_name);
				done();
			});
		});

		it('Should process correctly active attributes', function (done) {
			const attributesExample = utils.readExampleFile('./test/activeAttributes/cayenneLpp2.json');
			const client = mqtt.connect('mqtt://' + testMosquittoHost);
			client.on('connect', function () {
				client.publish(
					'v3/' +
						options.json.devices[0].internal_attributes.lorawan.application_id +
						'/devices/' +
						options.json.devices[0].device_id +
						'/up',
					JSON.stringify(attributesExample)
				);
				setTimeout(function () {
					request(optionsCB, function (error, response, body) {
						should.not.exist(error);
						response.should.have.property('statusCode', 200);
						body.should.have.property('id', options.json.devices[0].entity_name);
						body.should.have.property('temperature_1');
						body.temperature_1.should.have.property('type', 'Number');
						body.temperature_1.should.have.property('value', 21.2);
						client.end();
						done();
					});
				}, 500);
			});
		});
	});

	describe('Active attributes are reported but bad payload is received', function () {
		it('Should process correctly active attributes', function (done) {
			const attributesExample = utils.readExampleFile('./test/activeAttributes/cayenneLpp_bad_json.json', true);
			const client = mqtt.connect('mqtt://' + testMosquittoHost);
			client.on('connect', function () {
				client.publish('v3/ari_ioe_app_demo1/devices/lora_n_003/up', JSON.stringify(attributesExample));
				setTimeout(function () {
					client.end();
					done();
				}, 500);
			});
		});

		it('Should process correctly active attributes', function (done) {
			const attributesExample = utils.readExampleFile('./test/activeAttributes/cayenneLpp_bad_raw.json', true);
			const client = mqtt.connect('mqtt://' + testMosquittoHost);
			client.on('connect', function () {
				client.publish('v3/ari_ioe_app_demo1/devices/lora_n_003/up', JSON.stringify(attributesExample));
				setTimeout(function () {
					client.end();
					done();
				}, 500);
			});
		});
	});

	describe('After a restart', function () {
		it('Should keep on listening to active attributes from provisioned devices', function (done) {
			const optionsCB = {
				url: 'http://' + orionServer + '/v2/entities/LORA-N-003',
				method: 'GET',
				json: true,
				headers: {
					'fiware-service': service,
					'fiware-servicepath': subservice
				}
			};
			const attributesExample = utils.readExampleFile('./test/activeAttributes/cayenneLpp3.json');
			async.waterfall([iotagentLora.stop, async.apply(iotagentLora.start, iotAgentConfig)], function (err) {
				should.not.exist(err);
				const client = mqtt.connect('mqtt://' + testMosquittoHost);
				client.on('connect', function () {
					client.publish('v3/ari_ioe_app_demo1/devices/lora_n_003/up', JSON.stringify(attributesExample));
					setTimeout(function () {
						request(optionsCB, function (error, response, body) {
							should.not.exist(error);
							response.should.have.property('statusCode', 200);
							body.should.have.property('id', 'LORA-N-003');
							body.should.have.property('temperature_1');
							body.temperature_1.should.have.property('type', 'Number');
							body.temperature_1.should.have.property('value', 28);
							client.end();
							done();
						});
					}, 500);
				});
			});
		});
	});

	describe('When a device delete request arrives to the Agent', function () {
		const options = {
			url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices/lora_n_003',
			headers: {
				'fiware-service': service,
				'fiware-servicepath': subservice
			},
			method: 'DELETE'
		};

		it('should return a 204 OK and no errors', function (done) {
			request(options, function (error, response, body) {
				should.not.exist(error);
				response.should.have.property('statusCode', 204);
				done();
			});
		});

		it('should remove the device from the provisioned devices list', function (done) {
			request(options, function (error, response, body) {
				should.not.exist(error);
				const options = {
					url: 'http://localhost:' + iotAgentConfig.iota.server.port + '/iot/devices',
					headers: {
						'fiware-service': service,
						'fiware-servicepath': subservice
					},
					json: true,
					method: 'GET'
				};

				request(options, function (error, response, body) {
					should.not.exist(error);
					response.should.have.property('statusCode', 200);
					body.should.have.property('count', 1);
					body.should.have.property('devices');
					body.devices.should.have.length(1);
					done();
				});
			});
		});

		it('Should unsuscribe from the corresponding MQTT topic', function (done) {
			const optionsCB = {
				url: 'http://' + orionServer + '/v2/entities/LORA-N-003',
				method: 'GET',
				json: true,
				headers: {
					'fiware-service': service,
					'fiware-servicepath': subservice
				}
			};
			const attributesExample = utils.readExampleFile('./test/activeAttributes/cayenneLpp.json');
			const client = mqtt.connect('mqtt://' + testMosquittoHost);
			client.on('connect', function () {
				client.publish('v3/ari_ioe_app_demo1/devices/LORA-N-003/up', JSON.stringify(attributesExample));
				setTimeout(function () {
					request(optionsCB, function (error, response, body) {
						should.not.exist(error);
						response.should.have.property('statusCode', 200);
						body.should.have.property('id', 'LORA-N-003');
						body.should.have.property('temperature_1');
						body.temperature_1.should.be.an('object');
						body.temperature_1.should.have.property('type', 'Number');
						body.temperature_1.should.have.property('value', 28);
						client.end();
						done();
					});
				}, 500);
			});
		});
	});
});
