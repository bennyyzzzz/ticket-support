export function remove({request, response, database}){
    const {id} = request.params

    const deleted = database.delete("tickets", id)

    if(!deleted){
        return response.writeHead(404).end()
    }

    return response.end()
}
