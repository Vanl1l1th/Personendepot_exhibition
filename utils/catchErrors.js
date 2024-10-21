function catchErrors(error, displayError){
  let errorMsg;
  if(error.response){
    errorMsg = error.response.data;
    console.error("error res",errorMsg);

    if(error.response.data.error){
      errorMsg = error.response.data.error.message;
    }
  }else if (error.request){
    errorMsg = error.request;
    console.error("error req", errorMsg);
  }else{
    errorMsg = error.message;
    console.error("error msg",errorMsg);
  }
  displayError(errorMsg)
}

export default catchErrors;
