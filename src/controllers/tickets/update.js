export function update({request, response, database}){
    return response.end(JSON.stringify(request.params))
}