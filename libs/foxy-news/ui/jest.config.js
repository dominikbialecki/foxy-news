module.exports = {
  name: 'foxy-news-ui',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/foxy-news/ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};