import { Response } from 'express';
import { getUserEmail } from '../controller';
import { getByDomain } from '../model';
import { validateDomain, getEmailType, generateUserEmail } from '../utils';
import { IGetUserEmailReq } from '../types';

jest.mock('../model');
jest.mock('../utils');

describe('getUserEmail', () => {
  let mockRequest: Partial<IGetUserEmailReq>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };
    mockRequest = {
      query: { firstName: 'John', lastName: 'Doe', domain: 'google.com' },
    };
  });

  it('should return 400 if required parameters are missing or invalid', async () => {
    mockRequest.query = { firstName: 'John', lastName: 'Doe', domain: 'google' };
    (validateDomain as jest.Mock).mockReturnValue(false);

    await getUserEmail(mockRequest as IGetUserEmailReq, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'Missing or Invalid query parameters: firstName, lastName and/or domain.',
    });
  });

  it('should return existing email if colleague found', async () => {
    (validateDomain as jest.Mock).mockReturnValue(true);
    (getByDomain as jest.Mock).mockResolvedValue({ name: 'Jake Miller', email: 'jmiller@example.com' });
    (getEmailType as jest.Mock).mockReturnValue('INITIAL');
    (generateUserEmail as jest.Mock).mockReturnValue('jdoe@example.com');

    await getUserEmail(mockRequest as IGetUserEmailReq, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'User email generated',
      data: {
        fullName: 'John Doe',
        email: ['jdoe@example.com'],
        isNew: false,
      },
    });
  });

  it.only('should return potential emails if no colleague found', async () => {
    (validateDomain as jest.Mock).mockReturnValue(true);
    (getByDomain as jest.Mock).mockResolvedValue(null);
    (generateUserEmail as jest.Mock)
      .mockReturnValueOnce('jdoe@example.com')
      .mockReturnValueOnce('johndoe@example.com');

    await getUserEmail(mockRequest as IGetUserEmailReq, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'Potential emails generated',
      data: {
        fullName: 'John Doe',
        email: ['jdoe@example.com', 'johndoe@example.com'],
        isNew: true,
      },
    });
  });

  it('should handle errors and return 500 status', async () => {
    mockRequest.query = { firstName: 'John', lastName: 'Doe', domain: 'example.com' };
    (validateDomain as jest.Mock).mockReturnValue(true);
    (getByDomain as jest.Mock).mockRejectedValue(new Error('Database error'));

    await getUserEmail(mockRequest as IGetUserEmailReq, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'Oops, something went wrong',
    });
  });
});