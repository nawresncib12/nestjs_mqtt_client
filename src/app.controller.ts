import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}

  @Get('temperature')
  getTemperature() {
    return this.client.send('temperature_channel', '23 degrees');
  }

  @Get('device/:id')
  getDeviceById(@Param('id') id: string) {
    const device = { id: id, name: 'Air 600' };
    return this.client.send(`device/${id}`, device);
  }

  @Get('device')
  getDevice() {
    const device = { name: 'air 600', status: 'connected' };

    return this.client.send('device', device);
  }
}
