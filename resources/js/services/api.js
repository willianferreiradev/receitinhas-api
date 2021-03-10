const httpClient = axios.create({
    baseURL: "http://localhost:8000/api/",
});

httpClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const canThrowAnError =
            error.request.status === 0 || error.request.status === 500;

        if (canThrowAnError) {
            throw new Error(error.message);
        }

        return error;
    }
);

export default httpClient;
