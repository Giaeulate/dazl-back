import { Controller, Put, Headers, Query, Param } from '@nestjs/common';
import { MessageDesactive } from '../../../../Contexts/Dazl/message/application/Desactive/MessageDesactive';

type ParamsPut = {
  id: string;
};

type QueriesPut = {
  user_activation_id: string;
};

@Controller('v1/messages')
export class PutMessageDesactiveController {
  constructor(private readonly desactive: MessageDesactive) {}

  @Put(':id/desactive')
  async run(
    @Headers('Authorization') token: string,
    @Query() queries: QueriesPut,
    @Param() params: ParamsPut,
  ) {
    console.log('PutMessageDesactiveController', queries);
    console.log('PutMessageDesactiveController', params);
    await this.desactive.run({
      messageId: params.id,
      userActivationId: queries.user_activation_id,
    });
    return {
      status: true,
      statusCode: 200,
      message: 'Message desactive',
      error: null,
    };
  }
}
