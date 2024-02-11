import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { PostsService } from './posts.service';

@Injectable()
export class PostsCron {
  private readonly logger = new Logger(PostsCron.name);

  constructor(private readonly postsService: PostsService) {}

  @Cron('*/15 * * * *')
  handleCron() {
    console.log('test');
    this.logger.debug('Creating new post', process.env.QUOTE_KEY);

    axios
      .get(`https://api.api-ninjas.com/v1/quotes`, {
        headers: {
          'X-Api-Key': process.env.QUOTE_KEY,
        },
      })
      .then(({ data }) => {
        if (data.length === 0) throw new Error('No quote received');
        data = data[0];

        this.postsService.create({
          title: data.category + ' - ' + data.author,
          body: data.quote,
          createdBy: 3,
        });

        // Add batch log
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('Request failed:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      });
  }
}
