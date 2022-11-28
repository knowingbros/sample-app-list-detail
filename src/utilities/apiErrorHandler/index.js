const apiRequestErrorHandler = e => {
  console.log(e);
  console.log("Response: ", e.response);
  try {
    if (!e.response) {
      return "Network Error";
    } else if (e.response.data && typeof e.response.data != "string") {
      const erd = e.response.data;

      console.log(erd)
      console.log("erd")



      if (erd.detail) {
        return erd.detail;
      }
      if (erd.non_field_errors) {
        return erd.non_field_errors[0];
      }

      // Handle serializer field validation errors
      if (erd[0]) {
        return erd[0];
      }
      // Handle field errors
      const key = Object.keys(erd)[0];
      const errorMessage = erd[key][0];
      const errorField = String(key);
      return (
        errorField.charAt(0).toUpperCase() +
        errorField.substring(1) +
        ":  " +
        errorMessage
      );
    } else {
      // There is no response data
      if (e.response.status === 500) {
        return `
          Sorry we are having trouble retrieving that right now.
          Please try again later.
        `;
      }

      return `${e.response.status}: ${e.response.statusText}`;
    }
  } catch (error) {
    console.log(error);
    return "Something went wrong, please contact the site administration.";
  }
};

export default apiRequestErrorHandler;
