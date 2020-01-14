class OlympianEvent {
  constructor(row, olympian, event) {
    this.olympian_id = olympian.id,
    this.event_id = event.id,
    this.medal = row.Medal === 'NA' ? null : row.Medal
  }
}

module.exports = OlympianEvent;