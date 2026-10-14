export function updateStatus({request, response, database}){
    const {id} = request.params
    const {solution} = request.body

    const updated = database.update("tickets", id, {
        status: "closed",
        solution,
        updated_at: new Date(),
    })

    if(!updated){
        return response.writeHead(404).end()
    }

    return response.end()
}
