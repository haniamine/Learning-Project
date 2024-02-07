import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {

    @Get()
    testEndpoint(): string {
        return 'NestJS backend is up and running!';
    }
}