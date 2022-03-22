class ResponseModel {
	isSuccess = false;
	message = 'Lỗi server';
	resultCode = 500;
	subErrors = [];
}

export const getResponse = (responseBody, isError = false) => {
	let response = new ResponseModel();
	console.log('getResponse', JSON.stringify(responseBody));

	if (!isError) {
		response.isSuccess = true;
		response.resultCode = 0;
		response.message = 'Gọi api thành công';
		response.subErrors = [];
		response.data = responseBody;
	} else {
		// trường hợp sau dấu || là handle error không phải của momo
		response.isSuccess = responseBody?.response?.data?.resultCode === 0;
		response.resultCode = responseBody?.response?.data?.resultCode || 500;
		response.message =
			responseBody?.response?.data?.message || responseBody.message;
		response.subErrors = responseBody?.response?.data?.subErrors || [];
	}

	return response;
};
