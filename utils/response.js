export const APIResponse = (response, data, message, status = 200) => {
    response.status(status).json({data: data, message: message}); 
};