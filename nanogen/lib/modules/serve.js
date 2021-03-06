const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const server = require('../utils/server');
const log = require('../utils/logger');
const build = require('./build');
const {spawn} = require('child_process')
const { parseOptions } = require('../utils/parser');

/**
 * Serve the site in watch mode
 */
const serve = (options, flags) => {
  log.info(`Starting local server at http://localhost:${flags.port}`);

  const { srcPath, outputPath } = parseOptions(options);

  build(options);
  server.serve({ path: outputPath, port: flags.port });

  chokidar.watch(srcPath, { ignoreInitial: true }).on(
    'all',
    debounce(() => {
      // build(options);
      spawn('npm', ['run', 'build'], {
        stdio: 'pipe',
        shell: true,
      })
      log.info('Waiting for changes...');
    }, 500)
  );
};

module.exports = serve;
