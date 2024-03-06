const errorMessageFormat = ( errorArray ) => {
    let errorMessage = []
    errorArray.forEach((element, index) => {
        if(index !== errorArray.length - 1 ){
            // Enter for all errors except last
            errorMessage.push(element.msg)
        }
        else if( errorArray.length !== 1 ){
            // Enter when it is a last error
            errorMessage.push(` & ${element.msg}`)

        }
        else{
            // Enter when there is only one error
            errorMessage.push(element.msg)
        }
    });
    return errorMessage.join(' ')
}

module.exports = errorMessageFormat