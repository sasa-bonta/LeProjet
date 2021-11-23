import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
// import axios from 'axios';
//
// jest.mock('axios', () => {
//   axios.get: jest.fn();
// });

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // it('should return list of products', async () => {
  //   const searchService = new SearchService();
  //   axios.get.mockReturnValue({
  //
  //   });
  //   expect(searchService.searchItemsEverywhere('iphone')).toEqual([]);
  // });
});
