import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SearchModule} from './search/search.module';
import {PriceModule} from './price/price.module';

@Module({
    imports: [SearchModule, PriceModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
