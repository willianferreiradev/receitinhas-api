import httpClient from "./api";

export default {
    async index(ingredients) {
        const params = ingredients.join(",");
        return await httpClient.get(`recipes?i=${params}`);
    },
};
