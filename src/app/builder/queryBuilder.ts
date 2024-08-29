import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  constructor(
    public queryModel: Query<T[], T>,
    public query: Record<string, unknown>,
  ) {
    this.queryModel = queryModel
    this.query = query
  }

  search(searchField: string[]) {
    const searchTerm = this.query.searchTerm

    if (searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchField.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }
  }

  filter() {
    const excludedItems = ['searchTerm', 'email', 'sort', 'limit', 'page']
    const queryObj = { ...this.query }

    excludedItems.forEach((element) => delete queryObj[element])
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>)

    return this
  }

  sort() {
    const sort = this.query.sort || '-createdAt'
    this.queryModel = this.queryModel.sort(sort as string)

    return this
  }

  paginate() {
    const page = Number(this.query.page) || 1
    const limit = Number(this.query.limit) || 1
    const skip = (page - 1) * limit || 0

    this.queryModel = this.queryModel.skip(skip).limit(limit)
    return this
  }

  fieldSearch() {
    const field = this.query.field || '-__v'
    this.queryModel = this.queryModel.select(field as string)
    return this
  }
}

export default QueryBuilder
