const EDITABLE_FIELDS = ["equipment", "description", "user_name", "status"]

export function patch({request, response, database}){
    const {id} = request.params
    const body = request.body ?? {}

    const data = Object.fromEntries(
        Object.entries(body).filter(([key, value]) => {
            return EDITABLE_FIELDS.includes(key) && value !== undefined
        })
    )

    if(Object.keys(data).length === 0){
        return response.writeHead(400).end(JSON.stringify({
            message: `Send at least one of: ${EDITABLE_FIELDS.join(", ")}`
        }))
    }

    const updated = database.update("tickets", id, {
        ...data,
        updated_at: new Date(),
    })

    if(!updated){
        return response.writeHead(404).end()
    }

    return response.end()
}
