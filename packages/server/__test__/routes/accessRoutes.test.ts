import request from "supertest";
import app from "../../src/server";

describe("API des accès", () => {
    it("Doit retourner la liste des accès", async () => {
        // Supertest pour simuler une requête HTTP (méthode GET) à une URL spécifique (ici /posts)
        const response = await request(app).get("/accesses");

        // Vérifie que le status code HTTP de la réponse est bien 200
        expect(response.status).toBe(200);

        // Vérifie que la réponse est bien un tableau
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("Doit retourner la liste des accès par countryId et par locationId", async () => {
        const response = await request(app).get("/accesses/1e754a1b-8093-4c70-9e71-498830d165aa/b5091c38-86b5-45fe-b7a4-8bbe6b2d0e7c");

        expect(response.status).toBe(200);

        expect(typeof response.body.data).toBe("object");
    })
});