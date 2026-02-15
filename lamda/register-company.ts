import { LambdaEvent, LambdaResponse } from './types/lambda';
import { parseCompanyInput } from './parse-company-input';
import { RegisterCompanyUseCase } from '../src/company/application/register-company/register-company.use-case';
import { RegisterCompanyRepository } from '../src/company/domain/ports/register-company-repository';

export const handler = async (event: LambdaEvent): Promise<LambdaResponse> => {
  if (!event.body) {
    return response(400, { message: 'Request body is required' });
  }

  try {
    const company = parseCompanyInput(JSON.parse(event.body));

    // implementar el correspondiente repository dentro de la lambda
    const repository: RegisterCompanyRepository = {
      findByName: () => Promise.resolve(null),
      save: () => Promise.resolve(),
    };

    const registerCompanyUseCase = new RegisterCompanyUseCase(repository);
    await registerCompanyUseCase.execute(company);
  } catch (error) {
    return response(400, {
      message: `Register company error: ${error instanceof Error ? error.message : String(error)}`,
    });
  }

  return response(201, { success: true });
};

function response(statusCode: number, body: unknown): LambdaResponse {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  };
}
