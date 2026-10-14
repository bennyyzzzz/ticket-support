export function update({request, response, database}){
    const {id} = request.params
    const {equipment, description} = request.body

    const updated = database.update("tickets", id, {
        equipment,
        description,
        updated_at: new Date(),
    })

    if(!updated){
        return response.writeHead(404).end()
    }

    return response.end()
}
