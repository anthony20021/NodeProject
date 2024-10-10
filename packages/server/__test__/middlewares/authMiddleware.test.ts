import { authMiddleware } from '../../src/middlewares/authMiddleware';
import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../../src/utils';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe("Test pour la vérification de la fonction authMiddleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      cookies: {}
    };
    mockResponse = {
      locals: {},
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it("Doit retourner une erreur s'il n'y a pas de token", () => {
    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(APIResponse).toHaveBeenCalledWith(mockResponse, null, "Vous n'êtes pas authentifié", 401);
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("doit appelr la fonction ext() si on a un token valide", () => {
    const mockToken = 'valid-token';
    const mockDecodedToken = { userId: '123' };
    mockRequest.cookies = { accessToken: mockToken };
    (jwt.verify as jest.Mock).mockReturnValue(mockDecodedToken);

    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET);
    expect(mockResponse.locals!.user).toEqual(mockDecodedToken);
    expect(nextFunction).toHaveBeenCalled();
  });

  it("doit retourner une erreur si le token n'est pas valide", () => {
    const mockToken = 'invalid-token';
    mockRequest.cookies = { accessToken: mockToken };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Token invalid');
    });

    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET);
    expect(APIResponse).toHaveBeenCalledWith(mockResponse, null, "Vous n'êtes pas authentifié", 401);
    expect(nextFunction).not.toHaveBeenCalled();
  });
});