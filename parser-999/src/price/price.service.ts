import {Injectable} from '@nestjs/common';
import axios from "axios";
import parseItemsFromHtml from "./utils/parseItemsFromHtml";

@Injectable()
export class PriceService {
    async searchPrice(article) {
        const result = await axios.get(
            decodeURI(article),
        );
        return parseItemsFromHtml(result.data);
    }
}
