import jwt from 'jsonwebtoken';
import { generateAccessToken, APIResponse } from '../../src/utils'; // Assurez-vous que le chemin d'importation est correct

jest.mock("jsonwebtoken");
jest.mock("../../src/utils");

describe("Test de la méthode generateAccessToken", () => {
  const mockUserId = 'user123';
  const mockRole = 'admin';
  const mockToken = 'mockedToken';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Doit générer un token valide", () => {
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const result = generateAccessToken(mockRole, mockUserId);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: mockUserId, role: mockRole },
      "Chaîned3cAr4ctèresbienbalèz3",
      { expiresIn: "30m" }
    );
    expect(result).toBe(mockToken);
  });
});