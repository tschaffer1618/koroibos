class Olympian {
  constructor(row) {
    this.name = row.Name,
    this.sex = row.Sex === 'NA' ? null : row.Sex,
    this.age = row.Age === 'NA' ? null : row.Age,
    this.height = row.Height === 'NA' ? null : row.Height,
    this.weight = row.Weight === 'NA' ? null : row.Weight,
    this.team = row.Team === 'NA' ? null : row.Team,
    this.sport = row.Sport === 'NA' ? null : row.Sport
  }
}

module.exports = Olympian;