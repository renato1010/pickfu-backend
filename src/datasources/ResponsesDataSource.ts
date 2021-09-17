import { Collection } from 'mongodb'
import { DataSource } from 'apollo-datasource'
import { ResponseDocument } from 'lib'

class ResponseDataSource extends DataSource {
  constructor(private responses: Collection<ResponseDocument>) {
    super()
  }
  async createResponse(response: string): Promise<string> {
    const createdAt = new Date().toISOString()
    const result = await this.responses.insertOne({ response, createdAt })
    return result.insertedId.toString()
  }
  getAllResponses() {
    return this.responses
      .find<ResponseDocument>({}, { projection: { _id: 0, response: 1, createdAt: 1 } })
      .limit(100)
      .toArray()
  }
}

export { ResponseDataSource }
