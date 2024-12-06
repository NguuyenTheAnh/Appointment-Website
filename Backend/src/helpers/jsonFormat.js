const resData = (data, errorCount, message) => {
    const result = {
        data: data,
        errorCount: errorCount,
        message: message
    };
    return result;
}

export default resData;