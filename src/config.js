const config = {
  protocol: 'http',
  host: 'localhost',
  port: '3000',
  getApi: function () {
    // eslint-disable-next-line
    let url = `${this.protocol}://${this.host}`
    if (this.port) {
      url = `${url}:${this.port}`
    }
    return ''
  }
}

export default config
