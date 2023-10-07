module.exports = {
  '*.{ts,js}': (filenames) =>
    ['npm', 'run', 'lint', filenames.join(' ')].join(' '),
}
